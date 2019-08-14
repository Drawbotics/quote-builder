import React from 'react';
import autobind from 'autobind-decorator';
import { css } from 'emotion';
import omit from 'lodash/omit';

import Input from '../../Input';
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


function getTranslatedLines(t: (k: string, a: string) => string, contents: any) {
  let lines = [];
  let read = true;
  let index = 1;
  while(read) {
    const line = t(`line${index}`, contents[`line${index}`]);
    if (! line) {
      read = false;
    }
    else {
      lines.push(line);
    }
    index = index + 1;
  }
  return lines;
}


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
    const lines = getTranslatedLines(t, contents);
    return (
      <div>
        {lines.map((text, i) => (
          <div key={i} className={styles.line}>
            <Input
              label={`Line ${i + 1}`}
              name={`line${i + 1}`}
              value={text}
              onChange={this._handleChange}
              topLabel />
            <div className={styles.actions}>
              <div className={styles.action} onClick={() => this._handleChange(' ', `line${i + 1}`)}>
                Hide from list
              </div>
              <div className={styles.action} onClick={() => this._handleChange('', `line${i + 1}`)}>
                Reset to default
              </div>
            </div>
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
    console.log(value, key);
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