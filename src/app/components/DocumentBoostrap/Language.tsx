import React from 'react';
import { css, cx } from 'emotion';
import get from 'lodash/get';
import { Globe } from 'react-feather';

import AnimatedCheckmark from '../AnimatedCheckmark';
import { setCurrentLocale } from '../../utils';


enum LanguageEnum {
  EN='EN',
  FR='FR',
  NL='NL',
}


interface LanguageValue {
  language: LanguageEnum | keyof typeof LanguageEnum
}


const styles = {
  language: css`
    display: flex;
    align-items: center;
  `,
  selectionBox: css`
    height: 200px;
    width: 220px;
    margin: 0 var(--margin);
    border-radius: var(--border-radius);
    border: 3px solid var(--primary);
    background: var(--tertiary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    transition: all var(--transition-duration) ease-in-out,
      opacity var(--transition-duration-short) ease-in-out;
    color: var(--primary);
    opacity: 0.3;

    &:hover {
      cursor: pointer;
      opacity: 0.5;
    }
  `,
  selected: css`
    opacity: 1 !important;
  `,
  label: css`
    text-align: center;
    color: var(--text-primary);
  `,
  checkmark: css`
    position: absolute;
    top: var(--margin);
    right: var(--margin);
  `,
  icon: css`
    margin-bottom: var(--margin);
  `,
}


function onClickLanguage(value: string, key: string, cb: (v: string, k: string) => void) {
  setCurrentLocale(value);
  cb(value, key);
}


const SelectBox: React.SFC<{
  selected: boolean,
  label: string,
  onClick: () => void,
}> = ({ selected, label, onClick }) => {
  return (
    <div className={cx(styles.selectionBox, { [styles.selected]: selected })} onClick={onClick}>
      <div className={styles.checkmark}>
        <AnimatedCheckmark size={30} checked={selected} />
      </div>
      <div className={styles.icon}>
        <Globe size={60} />
      </div>
      <div className={styles.label}>
        {label}
      </div>
    </div>
  );
}


const Language: React.SFC<{
  onChange: (v: string, k: string) => void,
  value: LanguageValue,
}> = ({ onChange, value }) => {
  const key = 'language';
  const language = get(value, 'language');
  return (
    <div className={styles.language}>
      <SelectBox selected={language === 'EN'} label="English" onClick={() => onClickLanguage('EN', key, onChange)} />
      <SelectBox selected={language === 'FR'} label="Français" onClick={() => onClickLanguage('FR', key, onChange)} />
      <SelectBox selected={language === 'NL'} label="Nederlands" onClick={() => onClickLanguage('NL', key, onChange)} />
    </div>
  );
}


export default Language;
