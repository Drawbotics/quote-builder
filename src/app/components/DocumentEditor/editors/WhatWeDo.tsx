import React from 'react';
import { css } from 'emotion';

import GenericEditor from './GenericEditor';
import Input, { InputGroup } from '../../Input';
import Button from '../../Button';
import { getCurrentLocale } from '~/utils';
import { createTranslateAlt } from '~/utils/translation';


const ta = createTranslateAlt('document.what_we_do');

const styles = {
  actions: css`
    margin-top: var(--margin);
  `,
};


const HowWeWork: React.SFC<{
  document: any,
  onClickUpdate: (document: any) => void,
  sectionId: string,
}> = (props) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => ta(locale, k, alt);
  return (
    <GenericEditor {...props}>
      {({ onClickUpdate, onChange, contents }: any) => (
        <div>
          <InputGroup>
            <Input label="Title 1" name="platformTitle" value={t('platform_title', contents.platformTitle)} onChange={onChange} topLabel />
            <Input label="Description 1" name="platformDescription" value={t('platform_description', contents.platformDescription)} onChange={onChange} topLabel area />
            <Input label="Title 2" name="managementTitle" value={t('management_title', contents.managementTitle)} onChange={onChange} topLabel />
            <Input label="Description 2" name="managementDescription" value={t('management_description', contents.managementDescription)} onChange={onChange} topLabel area />
          </InputGroup>
          <div className={styles.actions}>
            <Button onClick={onClickUpdate}>Update</Button>
          </div>
        </div>
      )}
    </GenericEditor>
  );
};


export default HowWeWork;
