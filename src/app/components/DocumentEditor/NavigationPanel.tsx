import React from 'react';
import { css, cx } from 'emotion';
import { ChevronLeft, ChevronRight } from 'react-feather';
import snakeCase from 'lodash/snakeCase';
import get from 'lodash/get';

import { translate as t } from '~/utils/translation';
import { getCurrentLocale } from '~/utils';


interface SectionType {
  id: string
  type: string
}


const styles = {
  navigationPanel: css`
    background: var(--tertiary-transparent);
    border-right: 1px solid var(--line-color);
    height: 100%;
    padding: var(--padding);
    transition: all var(--transition-duration) ease-in-out;
    backdrop-filter: blur(3px);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  label: css`
    font-size: 0.9rem;
    color: var(--grey);
    transition: color var(--transition-duration) ease-in-out;
  `,
  icon: css`
    color: var(--grey);
    margin-bottom: -6px;
    margin-right: calc(var(--padding) / -2);

    &:hover {
      cursor: pointer;
      color: var(--text-primary);
    }
  `,
  sections: css`
    margin-top: var(--margin);
    transition: opacity var(--transition-duration-short) ease-in-out;
  `,
  hidden: css`
    opacity: 0;
    pointer-events: none;
  `,
  section: css`
    position: relative;
    padding: calc(var(--padding) / 2) var(--padding);
    margin: 0 calc(var(--margin) * -1);
    color: var(--text-primary);
    transition: all var(--transition-duration-short) ease-in-out;
    font-size: 0.9rem;

    &:hover {
      cursor: pointer;
      color: var(--primary);
    }

    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 5px;
      background: var(--primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: all var(--transition-duration-short) ease-in-out;
    }
  `,
  active: css`
    background: var(--primary-transparent);
    color: var(--primary);

    &::after {
      transform: scaleX(1);
    }
  `,
};


const NavigationPanel: React.SFC<{
  sections: SectionType[],
  activeSection?: SectionType,
  onClickToggle: () => void,
  open: boolean,
  onClickSection: (section: string) => void,
}> = ({ sections, activeSection, onClickToggle, open, onClickSection }) => {
  const locale = getCurrentLocale();
  return (
    <div className={styles.navigationPanel} id="navigation-panel">
      <div className={styles.header}>
        <div className={styles.label}>
          Sections
        </div>
        <div className={styles.icon} onClick={onClickToggle}>
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} /> }
        </div>
      </div>
      <div className={cx(styles.sections, { [styles.hidden]: ! open })}>
        {sections.map((section, i) => (
          <div key={i} className={cx(styles.section, { [styles.active]: section.id === get(activeSection, 'id') })} onClick={() => onClickSection(section.id)}>
            {`${i+1}. ${t(locale, `document.${snakeCase(section.type)}.title`)}`}
          </div>
        ))}
      </div>
    </div>
  );
};


export default NavigationPanel;
