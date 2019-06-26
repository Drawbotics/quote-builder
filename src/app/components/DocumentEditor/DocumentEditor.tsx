import React, { Fragment } from 'react';
import { css, cx } from 'emotion';
import { BlobProvider } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import autobind from 'autobind-decorator';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import findLastIndex from 'lodash/findLastIndex';
import { v4 } from 'uuid';
import queryString from 'query-string';

import DocumentGenerator from './DocumentGenerator';
import ZoomControls from './ZoomControls';
import Divisor from './Divisor';
import NavigationPanel from './NavigationPanel';
import SectionsPanel from './SectionsPanel';
import EditingPanel from './EditingPanel';
import RoundButton from '../RoundButton';
import Spinner from '../Spinner';


const styles = {
  documentEditor: css`
    position: relative;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
    height: 100%;
  `,
  navigationBar: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 10;
    transform: translateX(calc(-100% + 40px));
    display: flex;
    transition: transform var(--transition-duration-short) ease-in-out;
  `,
  editingBar: css`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 10;
    transform: translateX(100%);
    display: flex;
    transition: transform var(--transition-duration-short) ease-in-out;
  `,
  barOpen: css`
    transform: translateX(0);
  `,
  viewer: css`
    overflow: scroll;
    overflow-x: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding) 0;
  `,
  document: css`
    position: relative;
    width: auto;
  `,
  controls: css`
    position: fixed;
    bottom: var(--margin);
    right: calc(var(--margin) * 3);
    z-index: 9;
  `,
  page: css`
    position: relative;
    margin: var(--margin) 0;
    box-shadow: var(--box-shadow);
    transition: all var(--transition-duration-short) ease-in-out;

    &::before {
      content: ' ';
      position: absolute;
      left: -30px;
      width: 30px;
      top: 0;
      height: 100%;
    }

    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: var(--primary);
      pointer-events: none;
      opacity: 0;
      transition: all var(--transition-duration-short) ease-in-out;
    }

    &:hover {
      & [data-element="delete"] {
        opacity: 1;
        pointer-events: auto;
      }
    }
  `,
  selected: css`
    box-shadow: var(--box-shadow), 0px 0px 0px 4px var(--primary);

    &::after {
      opacity: 0.2;
    }
  `,
  deletePage: css`
    position: absolute;
    left: calc(var(--margin) * -2);
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-duration-short) ease-in-out;
  `,
}


class DocumentEditor extends React.Component<{
  document: any,
  onChange: () => void,
  location: any,
  history: any,
}> {
  pages = {}
  viewer: any = undefined
  groupedPages = {}

  state = {
    zoom: 1.0,
    pages: 0,
    editingPage: undefined,
    navigationOpen: true,
    editingOpen: false,
    activePage: 1,
    insertSectionAt: -1,
    reload: 0,
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickPage);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickPage);
    this.viewer.removeEventListener('scroll', this._handleScrollPage);
  }

  render() {
    const { zoom, pages, editingPage, navigationOpen, activePage, editingOpen, reload, insertSectionAt } = this.state;
    const groupedPages = this.groupedPages;
    const { document } = this.props;
    if (isEmpty(document)) return <Spinner label="Loading PDF..." />;
    const renderedDocument = DocumentGenerator({ document, onPageRender: this._onDocumentPageRender });
    return (
      <div className={styles.documentEditor}>
        <div className={cx(styles.navigationBar, { [styles.barOpen]: navigationOpen })}>
          <NavigationPanel
            activeSection={groupedPages[activePage]}
            onClickSection={this._handleClickSectionNavigation}
            sections={document.sections}
            onClickToggle={() => this.setState({ navigationOpen: ! navigationOpen })}
            open={navigationOpen} />
        </div>
        <div className={cx(styles.editingBar, { [styles.barOpen]: editingOpen })}>
          {insertSectionAt !== -1 &&
            <SectionsPanel
              onClickAddSection={this._handleAddSection}
              currentSections={document.sections.map((section: any) => section.type)}
              onClickToggle={() => this.setState({ editingOpen: ! editingOpen })} />
          }
          {editingPage !== undefined &&
            <EditingPanel
              onChange={this._handleModifyDocument}
              document={document}
              editingSection={groupedPages[editingPage + 1]}
              onClickToggle={() => this.setState({ editingOpen: ! editingOpen })} />
          }
        </div>
        <div className={styles.controls}>
          <ZoomControls zoom={zoom} onClickZoom={(v: number) => this.setState({ zoom: v })} />
        </div>
        <div className={styles.viewer} ref={(viewer: HTMLDivElement) => { this.viewer = viewer; this._addScrollListener(viewer) }}>
          <BlobProvider key={reload} document={renderedDocument}>
            {({ blob }: { blob: any }) => (
              <div className={styles.document}>
                {blob ? (() => {
                  this.pages = {};
                  return (
                    <Document file={blob} onLoadSuccess={this._onDocumentLoadSuccess} loading={<Spinner label="Loading PDF..." />}>
                      {Array(pages).fill(0).map((value, index) => (
                        <Fragment key={index}>
                          <Divisor onClickPlus={() => this._openAddSection(index)} />
                          <div className={cx(styles.page, { [styles.selected]: editingPage === index })} ref={(page: HTMLDivElement) => page ? this.pages[`page${index+1}`] = page : null}>
                            <Page pageNumber={index + 1} scale={zoom} onLoadSuccess={index + 1 === pages ? this._handleScrollToPage : null} />
                            <div className={styles.deletePage} data-element="delete">
                              <RoundButton onClick={() => this._handleRemoveSection(index + 1)} size={30}>-</RoundButton>
                            </div>
                          </div>
                        </Fragment>
                      ))}
                      <Divisor onClickPlus={() => this._openAddSection(pages)} />
                    </Document>
                  );
                })() : <Spinner label="Loading PDF..." />}
              </div>
            )}
          </BlobProvider>
        </div>
      </div>
    );
  }

  @autobind
  _handleClickPage(e: any) {
    const { history } = this.props;
    const clickedPanels = !! e.path.find((element: HTMLElement) => element.id === 'editing-panel' || element.id === 'navigation-panel' || element.id === 'title-bar');
    if (get(e.target, 'nodeName') === 'CANVAS') {
      const boundingBoxes = Object.values(this.pages).map((page: HTMLElement) => page.getBoundingClientRect());
      if (boundingBoxes.length > 0) {
        const xDelimiter = { left: boundingBoxes[0].left, right: boundingBoxes[0].left + boundingBoxes[0].width };
        if (e.clientX > xDelimiter.left && e.clientX < xDelimiter.right) {
          const yDelimiters = boundingBoxes.map((box) => ({ top: box.top, bottom: box.top + box.height }));
          let page = 0;
          for (let delimiter of yDelimiters) {
            if (e.clientY > delimiter.top && e.clientY < delimiter.bottom) {
              const search = queryString.stringify({ page: page + 1 });
              history.replace({ search });
              this.setState({ editingPage: page, editingOpen: true, insertSectionAt: -1 });
              break;
            }
            page++;
          }
        }
        else {
          history.replace({ search: '' });
          this.setState({ editingPage: undefined });
        }
      }
    }
    else if (! clickedPanels) {
      this.setState({ editingPage: undefined });
    }
  }

  @autobind
  _onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    this.setState({ pages: numPages, reload: 0 });
  }

  @autobind
  _handleScrollToPage() {
    const { location } = this.props;
    const search = queryString.parse(location.search);
    if (search.page) {
      this._scrollToPage(search.page as string);
    }
  }

  @autobind
  _onDocumentPageRender(section: { type: string, id: string }, pageNumber: number) {
    this.groupedPages = { ...this.groupedPages, [pageNumber]: section };
  }

  @autobind
  _handleClickSectionNavigation(id: string) {
    const groupedPages = this.groupedPages;
    const firstPage = Object.keys(groupedPages).find((pageNumber) => groupedPages[pageNumber].id === id);
    if (! firstPage) return;
    this._scrollToPage(firstPage);
  }

  @autobind
  _scrollToPage(pageIndex: string) {
    const page = this.pages[`page${pageIndex}`];
    this.viewer.scrollTop = 0;
    const viewerTop = this.viewer.getBoundingClientRect().top + 20;
    const scrollTop = page.getBoundingClientRect().top - viewerTop;
    this.viewer.scrollTop = scrollTop;
  }

  @autobind
  _addScrollListener(viewer: HTMLDivElement) {
    if (viewer) {
      viewer.addEventListener('scroll', this._handleScrollPage);
    }
  }

  @autobind
  _handleScrollPage() {
    // TODO add some throttle if performance looks poor
    const { top } = this.viewer.getBoundingClientRect();
    const activePageIndex = findLastIndex(Object.values(this.pages), (page: HTMLDivElement) => page.getBoundingClientRect().top <= top + 20);
    let activePage;
    if (this.viewer.scrollTop === (this.viewer.scrollHeight - this.viewer.offsetHeight)) {
      activePage = Object.keys(this.pages).length;
    }
    else {
      activePage = activePageIndex === -1 ? 1 : activePageIndex + 1;
    }
    this.setState({ activePage });
  }

  @autobind
  _openAddSection(index: number) {
    const { history } = this.props
    this.setState({
      editingOpen: true,
      insertSectionAt: index,
    });
    history.replace({ search: '' });
  }

  @autobind
  _handleRemoveSection(index: number) {
    const groupedPages = this.groupedPages;
    const { document, onChange, history } = this.props;
    const toRemove = groupedPages[index];
    const sections = document.sections.filter((s: any) => s.id !== toRemove.id);
    document.sections = sections;
    this.pages = {};
    onChange();
    this.setState({ reload: 1, pages: 0 });
    history.replace({ search: '' });
  }

  @autobind
  _handleAddSection(section: string) {
    const groupedPages = this.groupedPages;
    const { insertSectionAt } = this.state;
    const { document, onChange, history } = this.props;
    const insertAfter = groupedPages[insertSectionAt === 0 ? 1 : insertSectionAt];
    const newSection = { type: section, id: v4() };
    const sections = document.sections.reduce((memo: any, section: any) =>
      section.id === insertAfter.id ? (insertSectionAt === 0 ? [ newSection, section ] : [ ...memo, section, newSection ]) : [ ...memo, section ], []);
    document.sections = sections;
    this.pages = {};
    onChange();
    this.setState({ reload: 1, editingOpen: false, pages: 0 });
    history.replace({ search: '' });
  }

  @autobind
  _handleModifyDocument(newDocument: any) {
    const { onChange } = this.props;
    onChange();
    this.setState({ reload: 1 });
  }
}


export default DocumentEditor;
