import React from 'react';
import { css } from 'emotion';

import GenericEditor from './GenericEditor';
import Input, { InputGroup } from '../../Input';
import Button from '../../Button';
import { getCurrentLocale } from '~/utils';
import { createTranslateAlt } from '~/utils/translation';


const ta = createTranslateAlt('document.how_we_work');

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
            <Input label="Title 1" name="kickoffTitle" value={t('kickoff_title', contents.kickoffTitle)} onChange={onChange} topLabel />
            <Input label="Description 1" name="kickoffDescription" value={t('kickoff_description', contents.kickoffDescription)} onChange={onChange} topLabel area />
            <Input label="Title 2" name="followupTitle" value={t('followup_title', contents.followupTitle)} onChange={onChange} topLabel />
            <Input label="Description 2" name="followupDescription" value={t('followup_description', contents.followupDescription)} onChange={onChange} topLabel area />
            <Input label="Title 3" name="correctionStudioTitle" value={t('correction_studio_title', contents.correctionStudioTitle)} onChange={onChange} topLabel />
            <Input label="Description 3" name="correctionStudioDescription" value={t('correction_studio_description', contents.correctionStudioDescription)} onChange={onChange} topLabel area />
            <Input label="Title 4" name="launchTitle" value={t('launch_title', contents.launchTitle)} onChange={onChange} topLabel />
            <Input label="Description 4" name="launchDescription" value={t('launch_description', contents.launchDescription)} onChange={onChange} topLabel area />
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
