import React from 'react';
import { css } from 'emotion';
import autobind from 'autobind-decorator';
import { omit } from 'lodash';

import Input, { InputGroup } from '../../Input';
import Button from '../../Button';
import { getCurrentLocale } from '~/utils';
import { createTranslateAlt } from '~/utils/translation';


const ta = createTranslateAlt('document.how_we_work');

const styles = {
  howWeWork: css`
  `,
  actions: css`
    margin-top: var(--margin);
  `,
};


class HowWeWork extends React.Component<{
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
    const locale = getCurrentLocale();
    const t = (k: string, alt?: string) => ta(locale, k, alt);
    return (
      <div className={styles.howWeWork}>
        <InputGroup>
          <Input label="Title 1" name="kickoffTitle" value={t('kickoff_title', contents.kickoffTitle)} onChange={this._handleChange} topLabel />
          <Input label="Description 1" name="kickoffDescription" value={t('kickoff_description', contents.kickoffDescription)} onChange={this._handleChange} topLabel area />
          <Input label="Title 2" name="followupTitle" value={t('followup_title', contents.followupTitle)} onChange={this._handleChange} topLabel />
          <Input label="Description 2" name="followupDescription" value={t('followup_description', contents.followupDescription)} onChange={this._handleChange} topLabel area />
          <Input label="Title 3" name="correctionStudioTitle" value={t('correction_studio_title', contents.correctionStudioTitle)} onChange={this._handleChange} topLabel />
          <Input label="Description 3" name="correctionStudioDescription" value={t('correction_studio_description', contents.correctionStudioDescription)} onChange={this._handleChange} topLabel area />
          <Input label="Title 4" name="launchTitle" value={t('launch_title', contents.launchTitle)} onChange={this._handleChange} topLabel />
          <Input label="Description 4" name="launchDescription" value={t('launch_description', contents.launchDescription)} onChange={this._handleChange} topLabel area />
        </InputGroup>
        <div className={styles.actions}>
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
  _handleClickUpdate() {
    const { document, sectionId, onClickUpdate } = this.props;
    const { contents } = this.state;
    document.sections = document.sections.map((documentSection: any) =>
      documentSection.id === sectionId ? { ...documentSection, contents } : documentSection);
    onClickUpdate(document);
  }
}


export default HowWeWork;
