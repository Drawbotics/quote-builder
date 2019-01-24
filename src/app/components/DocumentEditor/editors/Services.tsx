import React from 'react';
import autobind from 'autobind-decorator';
import { omit } from 'lodash';
import { css } from 'emotion';

import { getCurrentLocale } from '~/utils';
import { tablesToServiceList } from '~/utils/services';
import Button from '../../Button';
import Input from '../../Input';
import ImagePicker from '../../ImagePicker';
import { generateServiceSections, ServiceType } from '../utils';
// import { translateAlt as ta } from '~/utils/translation';


const styles = {
  update: css`
    margin-top: var(--margin);
  `,
  service: css`
    margin-bottom: var(--margin);
    padding-bottom: var(--margin);
    border-bottom: 2px solid var(--line-color);
  `,
  title: css`
    margin-bottom: var(--margin);
  `,
  description: css`
    margin-bottom: var(--margin);

    & textarea {
      min-height: 120px !important;
    }
  `,
};


class Services extends React.Component<{
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
    const { document } = this.props;
    const { data: { tables } } = document;
    const locale = getCurrentLocale();
    const allServices = tablesToServiceList(tables);
    const servicesWithContent = generateServiceSections(allServices, contents, locale);
    console.log(servicesWithContent);
    return (
      <div>
        {servicesWithContent.map((service: ServiceType, i: number) => (
          <div className={styles.service} key={i}>
            <div className={styles.title}>{service.name}</div>
            <div className={styles.description}>
              <Input label="Description" name="description" value={service.description || ''} onChange={this._handleChange} topLabel area />
            </div>
            <ImagePicker image={service.image || ''} onFileSelect={(file: string) => null} />
          </div>
        ))}
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
  _handleClickUpdate() {
    const { document, sectionId, onClickUpdate } = this.props;
    const { contents } = this.state;
    document.sections = document.sections.map((documentSection: any) =>
      documentSection.id === sectionId ? { ...documentSection, contents } : documentSection);
    onClickUpdate(document);
  }
}


export default Services;
