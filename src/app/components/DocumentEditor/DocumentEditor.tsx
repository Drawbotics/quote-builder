import React, { Fragment } from 'react';
import { css, cx } from 'emotion';
import { BlobProvider } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import autobind from 'autobind-decorator';
import { isEmpty, get, findLastIndex } from 'lodash';
// import queryString from 'query-string';

import DocumentGenerator from './DocumentGenerator';
import ZoomControls from './ZoomControls';
import Divisor from './Divisor';
import NavigationPanel from './NavigationPanel';
import SectionsPanel from './SectionsPanel';
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
    transform: translateX(calc(100% - 40px));
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
  `,
  document: css`
    position: relative;
    width: auto;
  `,
  controls: css`
    position: fixed;
    bottom: var(--margin);
    right: var(--margin);
    z-index: 11;
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
}> {
  pages = {}
  viewer: any = undefined

  state = {
    zoom: 1.0,
    pages: 0,
    editingPage: -1,
    navigationOpen: true,
    editingOpen: true,
    groupedPages: {},
    activePage: 1,
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickPage);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickPage);
    this.viewer.removeEventListener('scroll', this._handleScrollPage);
  }

  render() {
    const { zoom, pages, editingPage, navigationOpen, activePage, groupedPages, editingOpen } = this.state;
    const { document } = this.props;
    if (isEmpty(document)) return <Spinner label="Loading PDF..." />;
    // console.log('editing', groupedPages[editingPage + 1]);
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
          {/* TODO here toggle between editing/adding sections */}
          <SectionsPanel
            open={editingOpen}
            currentSections={document.sections.map((section: any) => section.type)}
            onClickToggle={() => this.setState({ editingOpen: ! editingOpen })} />
        </div>
        <div className={styles.controls}>
          <ZoomControls zoom={zoom} onClickZoom={(v: number) => this.setState({ zoom: v })} />
        </div>
        <div className={styles.viewer} ref={(viewer: HTMLDivElement) => { this.viewer = viewer; this._addScrollListener(viewer) }}>
          <BlobProvider document={DocumentGenerator({ document, onPageRender: this._onDocumentPageRender })}>
            {({ blob }: { blob: any }) => (
              <div className={styles.document}>
                {blob ?
                  <Document file={blob} onLoadSuccess={this._onDocumentLoadSuccess} loading={<Spinner label="Loading PDF..." />}>
                    {Array(pages).fill(0).map((value, index) => (
                      <Fragment key={index}>
                        {index !== 0 ? <Divisor onClickPlus={() => console.log('a')} /> : null}
                        <div className={cx(styles.page, { [styles.selected]: editingPage === index })} ref={(page: HTMLDivElement) => this.pages[`page${index+1}`] = page}>
                          <Page pageNumber={index + 1} scale={zoom} />
                          <div className={styles.deletePage} data-element="delete">
                            <RoundButton onClick={() => console.log('d')} size={30}>-</RoundButton>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </Document>
                : <Spinner label="Loading PDF..." />}
              </div>
            )}
          </BlobProvider>
        </div>
      </div>
    );
  }

  @autobind
  _handleClickPage(e: MouseEvent) {
    if (get(e.target, 'nodeName') === 'CANVAS') {
      const boundingBoxes = Object.values(this.pages).map((page: HTMLElement) => page.getBoundingClientRect());
      if (boundingBoxes.length > 0) {
        const xDelimiter = { left: boundingBoxes[0].left, right: boundingBoxes[0].left + boundingBoxes[0].width };
        if (e.clientX > xDelimiter.left && e.clientX < xDelimiter.right) {
          const yDelimiters = boundingBoxes.map((box) => ({ top: box.top, bottom: box.top + box.height }));
          let page = 0;
          for (let delimiter of yDelimiters) {
            if (e.clientY > delimiter.top && e.clientY < delimiter.bottom) {
              this.setState({ editingPage: page });
              break;
            }
            page++;
          }
        }
        else {
          this.setState({ editingPage: undefined });
        }
      }
    }
    else {
      this.setState({ editingPage: undefined });
    }
  }

  @autobind
  _onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    this.setState({ pages: numPages });
  }

  @autobind
  _onDocumentPageRender(section: string, pageNumber: number) {
    const { groupedPages } = this.state;
    this.setState({ groupedPages: { ...groupedPages, [pageNumber]: section } });
  }

  @autobind
  _handleClickSectionNavigation(section: string) {
    const { groupedPages } = this.state;
    const firstPage = Object.keys(groupedPages).find((pageNumber) => groupedPages[pageNumber] === section);
    if (! firstPage) return;
    const page = this.pages[`page${firstPage}`];
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
    if (this.viewer.scrollTop === (this.viewer.scrollHeight - this.viewer.offsetHeight)) {
      this.setState({ activePage: Object.keys(this.pages).length });
    }
    else {
      this.setState({ activePage: activePageIndex + 1 });
    }
  }
}


export default DocumentEditor;
