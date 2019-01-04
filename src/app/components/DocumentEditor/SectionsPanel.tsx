import React from 'react';
import { css, cx } from 'emotion';
import { ChevronRight } from 'react-feather';
import { snakeCase } from 'lodash';

import { translate as t } from '~/utils/translation';
import { getCurrentLocale } from '~/utils';


const sections = [{
  key: 'cover',
  unique: true,
}, {
  key: 'profile',
  unique: true,
}, {
  key: 'howWeWork',
  unique: true,
}, {
  key: 'whatWeDo',
  unique: true,
}, {
  key: 'stats',
  unique: true,
}, {
  key: 'project',
  unique: false,
}, {
  key: 'storyTelling',
  unique: false,
}, {
  key: 'products',
  unique: true,
}, {
  key: 'tables',
  unique: true,
}, {
  key: 'paymentMethods',
  unique: true,
}];


const styles = {
  sectionsPanel: css`
    width: 350px;
    background: var(--tertiary-transparent);
    border-left: 1px solid var(--line-color);
    padding: var(--padding);
    transition: all var(--transition-duration) ease-in-out;
    backdrop-filter: blur(3px);
    display: flex;
    flex-direction: column;
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: var(--padding);
  `,
  label: css`
    font-size: 0.9rem;
    color: var(--grey);
    transition: color var(--transition-duration) ease-in-out;
  `,
  icon: css`
    color: var(--grey);
    margin-bottom: -6px;
    margin-left: calc(var(--padding) / -2);
    margin-right: var(--padding);

    &:hover {
      cursor: pointer;
      color: var(--text-primary);
    }
  `,
  grid: css`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: var(--padding);
    padding-bottom: calc(var(--padding) * 3);
    margin-right: calc(var(--padding) * -1);
    overflow: scroll;
    flex: 1;
    min-height: 0;
  `,
  sectionCard: css`
    flex: 1 0 42%;
    max-width: calc(50% - var(--margin));
    margin-bottom: var(--margin);
    margin-right: var(--margin);

    &:hover {
      cursor: pointer;
    }
  `,
  disabled: css`
    opacity: 0.3;

    &:hover {
      cursor: not-allowed;
    }
  `,
  image: css`
    height: 180px;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    background: var(--tertiary);

    transition: box-shadow var(--transition-duration-short) ease-in-out,
      background var(--transition-duration) ease-in-out;

    &:hover {
      box-shadow: var(--box-shadow-hover);
    }

    &:active {
      box-shadow: var(--box-shadow-active);
    }
  `,
  cardLabel: css`
    text-align: center;
    margin-top: var(--margin);
    color: var(--text-primary);
    transition: color var(--transition-duration) ease-in-out;
  `,
};


const SectionCard: React.SFC<{
  label: string,
  image: string,
  disabled: boolean,
  onClick: () => void,
}> = ({ label, disabled, onClick }) => {
  return (
    <div
      className={cx(styles.sectionCard, { [styles.disabled]: disabled })}
      onClick={disabled ? x=>x : onClick}>
      <div className={styles.image}>
      </div>
      <div className={styles.cardLabel}>
        {label}
      </div>
    </div>
  );
};


const SectionsPanel: React.SFC<{
  onClickToggle: () => void,
  currentSections: string[],
  onClickAddSection: (sectionKey: string) => void,
}> = ({ onClickToggle, currentSections, onClickAddSection }) => {
  const locale = getCurrentLocale();
  return (
    <div className={styles.sectionsPanel}>
      <div className={styles.header}>
        <div className={styles.icon} onClick={onClickToggle}>
          <ChevronRight size={20} />
        </div>
        <div className={styles.label}>
          Add a section
        </div>
      </div>
      <div className={styles.grid}>
        {sections.map((section, i) => (
          <SectionCard
            key={i}
            onClick={() => onClickAddSection(section.key)}
            label={t(locale, `document.${snakeCase(section.key)}.title`)}
            disabled={currentSections.includes(section.key) && section.unique}
            image="" />
        ))}
      </div>
    </div>
  );
};


export default SectionsPanel;
