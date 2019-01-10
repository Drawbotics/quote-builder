import React from 'react';
import { css } from 'emotion';
import autobind from 'autobind-decorator';
import { get } from 'lodash';

import Input, { InputGroup } from '../../Input';
import ImagePicker from '../../ImagePicker';
import Button from '../../Button';


const styles = {
  cover: css`
  `,
  actions: css`
    margin-top: var(--margin);
  `,
};


class Cover extends React.Component<{
  document: any,
  onClickUpdate: (document: any) => void,
}> {
  state = {} as any

  render() {
    const { document: { data } } = this.props;
    const { project } = data;
    return (
      <div className={styles.cover}>
        <InputGroup>
          <Input name="projectName" label="Project name" value={get(this.state, 'projectName', project.projectName)} onChange={this._handleChange} topLabel />
          <Input name="contactName" label="Contact name" value={get(this.state, 'contactName', project.contactName)} onChange={this._handleChange} topLabel />
          <Input name="companyName" label="Company name" value={get(this.state, 'companyName', project.companyName)} onChange={this._handleChange} topLabel />
        </InputGroup>
        <ImagePicker image={this.state.clientLogo || project.clientLogo} onFileSelect={(file: string) => this.setState({ clientLogo: file })} />
        <div className={styles.actions}>
          <Button onClick={this._handleClickUpdate}>Update</Button>
        </div>
      </div>
    );
  }

  @autobind
  _handleChange(value: string, key: string) {
    this.setState({ [key]: value });
  }

  @autobind
  _handleClickUpdate() {
    const { document, onClickUpdate } = this.props;
    document.data.project = { ...document.data.project, ...this.state };
    onClickUpdate(document);
  }
}


export default Cover;
