import React from 'react';
import { css, cx } from 'emotion';
import snakeCase from 'lodash/snakeCase';

import { translate as t } from '~/utils/translation';
import { getCurrentLocale } from '~/utils';
import Panel from './Panel';


const sections = [{
  key: 'cover',
  unique: true,
  image: require('./images/sections/cover.jpg'),
}, {
  key: 'profile',
  unique: true,
  image: require('./images/sections/profile.jpg'),
}, {
  key: 'howWeWork',
  unique: true,
  image: require('./images/sections/how-we-work.jpg'),
}, {
  key: 'whatWeDo',
  unique: true,
  image: require('./images/sections/what-we-do.jpg'),
}, {
  key: 'stats',
  unique: true,
  image: require('./images/sections/stats.jpg'),
}, {
  key: 'project',
  unique: false,
  image: require('./images/sections/project.jpg'),
}, {
  key: 'storyTelling',
  unique: false,
  image: require('./images/sections/storytelling.jpg'),
}, {
  key: 'products',
  unique: true,
  image: require('./images/sections/products.jpg'),
}, {
  key: 'tables',
  image: require('./images/sections/offer.jpg'),
  unique: true,
}, {
  key: 'paymentMethods',
  image: require('./images/sections/payments.jpg'),
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

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
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
}> = ({ label, disabled, onClick, image }) => {
  return (
    <div
      className={cx(styles.sectionCard, { [styles.disabled]: disabled })}
      onClick={disabled ? x=>x : onClick}>
      <div className={styles.image}>
        <img src={image} />
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
              image={section.image} />
          ))}
        </div>
      </Panel>
    </div>
  );
};


export default SectionsPanel;
