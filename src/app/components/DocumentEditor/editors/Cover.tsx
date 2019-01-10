import React from 'react';
import { css } from 'emotion';

import Input, { InputGroup } from '../../Input';
import ImagePicker from '../../ImagePicker';


const styles = {
  cover: css`
  `,
};


class Cover extends React.Component<{
  document: any,
}> {
  render() {
    const { document: { data } } = this.props;
    const { project } = data;
    console.log(project);
    return (
      <div className={styles.cover}>
        <InputGroup>
          <Input name="projectName" label="Project name" value={project.projectName} topLabel />
          <Input name="contactName" label="Contact name" value={project.contactName} topLabel />
          <Input name="companyName" label="Company name" value={project.companyName} topLabel />
        </InputGroup>
        <ImagePicker image={project.clientLogo} onFileSelect={x=>x} />
      </div>
    );
  }
}


export default Cover;
