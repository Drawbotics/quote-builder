import React from 'react';
import { css } from 'emotion';
import { ChevronLeft, ChevronRight } from 'react-feather';
// import { snakeCase } from 'lodash';

// import { translate as t } from '~/utils/translation';
import { getCurrentLocale } from '~/utils';


const styles = {
  sectionsPanel: css`
    width: 350px;
    background: var(--tertiary-transparent);
    border-left: 1px solid var(--line-color);
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
    padding: var(--padding);
    margin-right: calc(var(--padding) * -1);
  `,
  sectionCard: css`
    flex: 1 0 42%;
    height: 180px;
    max-width: calc(50% - var(--margin));
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    background: var(--tertiary);
    margin-right: var(--margin);
    margin-bottom: var(--margin);
    transition: box-shadow var(--transition-duration-short) ease-in-out,
      background var(--transition-duration) ease-in-out;

    &:hover {
      cursor: pointer;
      box-shadow: var(--box-shadow-hover);
    }

    &:active {
      box-shadow: var(--box-shadow-active);
    }
  `,
};


const SectionsPanel: React.SFC<{
  onClickToggle: () => void,
  open: boolean,
}> = ({ onClickToggle, open }) => {
  // @ts-ignore
  const locale = getCurrentLocale();
  return (
    <div className={styles.sectionsPanel}>
      <div className={styles.header}>
        <div className={styles.icon} onClick={onClickToggle}>
          {open ? <ChevronRight size={20} /> : <ChevronLeft size={20} /> }
        </div>
        <div className={styles.label}>
          Add a section
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.sectionCard}>
        </div>
        <div className={styles.sectionCard}>
        </div>
        <div className={styles.sectionCard}>
        </div>
      </div>
    </div>
  );
};


export default SectionsPanel;
