import React from 'react';
import { css } from 'emotion';
import autobind from 'autobind-decorator';
import get from 'lodash/get';
import omit from 'lodash/omit';

import Tabs from '../../Tabs';
import Input, { InputGroup } from '../../Input';
import ImagePicker from '../../ImagePicker';
import Button from '../../Button';
import { setCurrentLocale } from '~/utils';


const styles = {
  cover: css`
  `,
  language: css`
    display: inline-flex;
    margin-bottom: var(--margin);
    margin-top: var(--margin);
  `,
  resetImage: css`
    color: var(--primary);
    font-size: 0.8rem;
    text-decoration: underline;
    margin-top: calc(var(--margin) / 2);

    &:hover {
      cursor: pointer;
    }
  `,
};


class Cover extends React.Component<{
  document: any,
  onClickUpdate: (document: any) => void,
}> {
  state = {} as any

  render() {
    const { document: { data } } = this.props;
    const { project, language } = data;
    return (
      <div className={styles.cover}>
        <InputGroup>
          <Input name="projectName" label="Project name" value={get(this.state, 'projectName', project.projectName)} onChange={this._handleChange} topLabel />
          <Input name="contactName" label="Contact name" value={get(this.state, 'contactName', project.contactName)} onChange={this._handleChange} topLabel />
          <Input name="companyName" label="Company name" value={get(this.state, 'companyName', project.companyName)} onChange={this._handleChange} topLabel />
        </InputGroup>
        <ImagePicker
          image={this.state.clientLogo !== undefined ? this.state.clientLogo : project.clientLogo}
          onFileSelect={(file: string) => this.setState({ clientLogo: file })} />
        <div className={styles.resetImage} onClick={() => this._handleChange(null, 'clientLogo')}>Reset image</div>
        <div className={styles.language}>
          <Tabs
            value={this.state.language || language}
            tabs={[{
              label: 'En',
              value: 'EN',
            }, {
              label: 'Fr',
              value: 'FR',
            }, {
              label: 'Nl',
              value: 'NL',
            }]}
            onChange={(v) => this.setState({ language: v })} /></div>
        <Button onClick={this._handleClickUpdate}>Update</Button>
      </div>
    );
  }

  @autobind
  _handleChange(value: string | null, key: string) {
    this.setState({ [key]: value });
  }

  @autobind
  _handleClickUpdate() {
    const { document, onClickUpdate } = this.props;
    document.data.project = { ...document.data.project, ...omit(this.state, 'language') };
    if (this.state.language) {
      document.data.language = this.state.language;
      setCurrentLocale(this.state.language);
    }
    onClickUpdate(document);
  }
}


export default Cover;
