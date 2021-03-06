import React from 'react';
import { css } from 'emotion';
import { ArrowRight, ArrowLeft } from 'react-feather';

import { QuestionType } from './questions';
import Button from '../Button';
import Title from '../Title';


const styles = {
  step: css`
    min-height: 400px;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-height: calc(100% - var(--margin) * 5);
  `,
  title: css`
    margin-bottom: calc(var(--margin) * 2);
    text-align: center;
  `,
  subtitle: css`
    font-size: 0.85rem;
    margin-bottom: var(--margin);
    text-align: center;
    color: var(--grey);
    transition: color var(--transition-duration) ease-in-out;
  `,
  navigation: css`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: calc(--var(margin) * 3);
  `,
  button: css`
    &:last-child:not(:nth-child(1)) {
      margin-left: var(--margin);
    }
  `,
  content: css`
  `,
};


const Step: React.SFC<{
  question: QuestionType,
  progressLabel: string,
  goNext: (() => void) | null,
  goBack: (() => void) | null,
  onChange: (v: string, k: string) => void,
  value: any,
}> = ({ question, progressLabel, goNext, goBack, onChange, value }) => {
  const { component: Component, title, optional } = question;
  return (
    <div className={styles.step}>
      <div className={styles.subtitle}>
        {`Question ${progressLabel}`}
      </div>
      <div className={styles.title}>
        <Title>{title}</Title>
      </div>
      <div className={styles.content}>
        <Component onChange={onChange} value={value} />
      </div>
      <div className={styles.navigation}>
        {goBack ?
          <div className={styles.button} onClick={goBack}>
            <Button flat leftIcon icon={<ArrowLeft size={15} />}>Back</Button>
          </div>
        : null}
        {goNext ?
          <div className={styles.button} onClick={goNext}>
            <Button icon={<ArrowRight size={15} />} disabled={! value && ! optional}>Next</Button>
          </div>
        : null}
      </div>
    </div>
  );
}


export default Step;
