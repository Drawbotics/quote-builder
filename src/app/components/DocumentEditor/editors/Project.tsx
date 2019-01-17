import React from 'react';
import autobind from 'autobind-decorator';
import { omit } from 'lodash';
import { css, cx } from 'emotion';

import Input, { InputGroup } from '../../Input';
import Button from '../../Button';
import { getCurrentLocale } from '~/utils';
import { createTranslateAlt } from '~/utils/translation';


interface SubsectionType {
  title: string
  description: string
}


const ta = createTranslateAlt('document.project');

const styles = {
  update: css`
    margin-top: var(--margin);
  `,
  subsection: css`
    margin-top: var(--margin);
  `,
  action: css`
    margin-top: var(--margin);
    font-size: 0.8rem;
    color: var(--primary);

    &:hover {
      cursor: pointer;
    }
  `,
  remove: css`
    margin-top: 5px;
  `,
};


class Project extends React.Component<{
  document: any,
  onClickUpdate: (document: any) => void,
  sectionId: string,
}> {
  state = {} as any

  componentDidMount() {
    const { document, sectionId } = this.props;
    const section = document.sections.find((s: any) => s.id === sectionId);
    this.setState({ contents: section.contents || {} });
  }

  render() {
    const { contents } = this.state;
    if (! contents) return null;
    const { subsections } = contents;
    const locale = getCurrentLocale();
    const t = (k: string, alt?: string) => ta(locale, k, alt);
    return (
      <div>
        <InputGroup>
          <Input label="Title 1" name="introductionTitle" value={t('introduction_title', contents.introductionTitle)} onChange={this._handleChange} topLabel />
          <Input label="Description 1" name="introductionDescription" value={t('introduction_description', contents.introductionDescription)} onChange={this._handleChange} topLabel area />
          <Input label="Title 2" name="informationTitle" value={t('information_title', contents.informationTitle)} onChange={this._handleChange} topLabel />
        </InputGroup>
        {subsections ?
          subsections.map((subsection: SubsectionType, i: number) => (
            <div className={styles.subsection} key={i}>
              <InputGroup>
                <Input label={`Subsection title ${i + 1}`} value={subsection.title || ''} onChange={(v: string) => this._handleChangeSubsection('title', v, i)} topLabel />
                <Input label={`Subsection description ${i + 1}`} value={subsection.description || ''} onChange={(v: string) => this._handleChangeSubsection('description', v, i)} topLabel area />
              </InputGroup>
              <div className={cx(styles.action, styles.remove)} onClick={() => this._removeSubsection(i)}>
                Remove
              </div>
            </div>
          ))
        : null}
        <div className={styles.action} onClick={this._addSubsection}>
          Add subsection
        </div>
        <div className={styles.update}>
          <Button onClick={this._handleClickUpdate}>Update</Button>
        </div>
      </div>
    );
  }

  @autobind
  _handleChange(value: string, key: string) {
    const contents = value === '' ? omit(this.state.contents, key) : { ...this.state.contents, [key]: value };
    this.setState({ contents });
  }

  @autobind
  _handleChangeSubsection(key: string, value: string, index: number) {
    const { contents } = this.state;
    const { subsections } = contents;
    const currentSubsection = subsections[index];
    const newSubsections = [ ...subsections.slice(0, index), { ...currentSubsection, [key]: value }, ...subsections.slice(index + 1, subsections.length) ];
    this.setState({ contents: { ...contents, subsections: newSubsections } });
  }

  @autobind
  _addSubsection() {
    const { contents } = this.state;
    this.setState({ contents: { ...contents, subsections: [ ...(contents.subsections || []), {} ] } });
  }

  @autobind
  _removeSubsection(index: number) {
    const { contents } = this.state;
    this.setState({ contents: { ...contents, subsections: contents.subsections.filter((s: SubsectionType, i: number) => i !== index) }});
  }

  @autobind
  _handleClickUpdate() {
    const { document, sectionId, onClickUpdate } = this.props;
    const { contents } = this.state;
    document.sections = document.sections.map((documentSection: any) =>
      documentSection.id === sectionId ? { ...documentSection, contents } : documentSection);
    onClickUpdate(document);
  }
}


export default Project;
