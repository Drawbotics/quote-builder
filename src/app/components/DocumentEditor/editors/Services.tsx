import React from 'react';
import autobind from 'autobind-decorator';
import { get, omit } from 'lodash';
import { css } from 'emotion';

import { getCurrentLocale } from '~/utils';
import { tablesToServiceList } from '~/utils/services';
import Button from '../../Button';
import Input, { InputGroup } from '../../Input';
import ImagePicker from '../../ImagePicker';
import { generateServiceSections, ServiceType as _ServiceType, RevoType } from '../utils';


interface ServiceType extends _ServiceType, RevoType {
}


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
    color: var(--text-primary);
    margin-bottom: var(--margin);
  `,
  descriptions: css`
    margin-bottom: var(--margin);

    & textarea {
      min-height: 120px !important;
    }
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


class Services extends React.Component<{
  document: any,
  onClickUpdate: (document: any) => void,
  sectionId: string,
}> {
  state = {} as any

  componentDidMount() {
    const { document, sectionId } = this.props;
    const section = document.sections.find((s: any) => s.id === sectionId);
    this.setState({ products: get(section.contents, 'products', {}) });
  }

  render() {
    const { products } = this.state;
    if (! products) return null;
    const { document } = this.props;
    const { data: { tables } } = document;
    const locale = getCurrentLocale();
    const allServices = tablesToServiceList(tables);
    const servicesWithContent = generateServiceSections(allServices, products, locale);
    return (
      <div>
        {servicesWithContent.map((service: ServiceType, i: number) => (
          <div className={styles.service} key={i}>
            <div className={styles.title}>{service.name}</div>
            <div className={styles.descriptions}>
              <InputGroup>
                <Input
                  label="Description"
                  name="description"
                  value={service.description || ''}
                  onChange={(v: string, k: string) => this._handleChange(v, k, service.id)}
                  topLabel
                  area />
                {service.description2 ?
                  <Input
                    label="Left column"
                    name="description2"
                    value={service.description2 || ''}
                    onChange={(v: string, k: string) => this._handleChange(v, k, service.id)}
                    topLabel
                    area />
                : null}
                {service.description3 ?
                  <Input
                    label="Right column"
                    name="description3"
                    value={service.description3 || ''}
                    onChange={(v: string, k: string) => this._handleChange(v, k, service.id)}
                    topLabel
                    area />
                : null}
              </InputGroup>
            </div>
            <ImagePicker image={service.image || ''} onFileSelect={(file: string) => this._handleChange(file, 'image', service.id)} />
            <div className={styles.resetImage} onClick={() => this._handleChange('', 'image', service.id)}>Reset image</div>
          </div>
        ))}
        <div className={styles.update}>
          <Button onClick={this._handleClickUpdate}>Update</Button>
        </div>
      </div>
    );
  }

  @autobind
  _handleChange(value: string, key: string, id: string) {
    const { products } = this.state;
    const serviceContents = get(products, id, {});
    const newContents = value === '' ? omit(serviceContents, key) : { ...serviceContents, [key]: value };
    this.setState({
      products: { ...products, [id]: newContents },
    });
  }

  @autobind
  _handleClickUpdate() {
    const { document, sectionId, onClickUpdate } = this.props;
    const { products } = this.state;
    document.sections = document.sections.map((documentSection: any) =>
      documentSection.id === sectionId ? { ...documentSection, contents: { products } } : documentSection);
    onClickUpdate(document);
  }
}


export default Services;
