import React from 'react';
import autobind from 'autobind-decorator';
import { css } from 'emotion';
import omit from 'lodash/omit';

import Input, { InputGroup } from '../../Input';
import Button from '../../Button';
import { getCurrentLocale } from '~/utils';
import { createTranslateAlt } from '~/utils/translation';


const ta = createTranslateAlt('document.payment_methods');


const styles = {
  update: css`
    margin-top: var(--margin);
  `,
  line: css`
    margin-bottom: var(--margin);
  `,
  actions: css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: calc(var(--margin) / 2);
  `,
  action: css`
    margin-right: calc(var(--margin) / 2);
    font-size: 0.8rem;
    color: var(--primary);

    &:hover {
      cursor: pointer;
    }
  `,
};


class PaymentMethods extends React.Component<{
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
      <div>
        <InputGroup>
          <Input
            label="Paragraph 1"
            name="paragraph1"
            value={t('paragraph1', contents.paragraph1)}
            onChange={this._handleChange}
            topLabel
            area />
          <Input
            label="Bullet points"
            name="bulletPoints"
            value={t('bullet_points', contents.bulletPoints)}
            onChange={this._handleChange}
            topLabel
            area />
          <Input
            label="Paragraph 2"
            name="paragraph2"
            value={t('paragraph2', contents.paragraph2)}
            onChange={this._handleChange}
            topLabel
            area />
        </InputGroup>
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


export default PaymentMethods;