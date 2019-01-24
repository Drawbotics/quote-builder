import React from 'react';
import { css, cx } from 'emotion';
import { snakeCase } from 'lodash';

import { translate as t } from '~/utils/translation';
import { getCurrentLocale } from '~/utils';
import Panel from './Panel';


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
    width: 370px;
  `,
  grid: css`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: var(--padding);
    margin-right: calc(var(--padding) * -1);
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
    font-size: 0.8rem;
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
      <Panel title="Add section" onClick={onClickToggle}>
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
      </Panel>
    </div>
  );
};


export default SectionsPanel;
