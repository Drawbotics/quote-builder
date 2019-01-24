import React from 'react';
import { css } from 'emotion';

import GenericEditor from './GenericEditor';
import Input from '../../Input';
import Button from '../../Button';
import { getCurrentLocale } from '~/utils';
import { createTranslateAlt } from '~/utils/translation';


const ta = createTranslateAlt('document.stats');

const styles = {
  actions: css`
    margin-top: var(--margin);
  `,
};


const Stats: React.SFC<{
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
          <Input label="Description" name="description" value={t('description', contents.description)} onChange={onChange} topLabel area />
          <div className={styles.actions}>
            <Button onClick={onClickUpdate}>Update</Button>
          </div>
        </div>
      )}
    </GenericEditor>
  );
};


export default Stats;
