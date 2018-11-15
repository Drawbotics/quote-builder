import React from 'react';
import { css } from 'emotion';
import autobind from 'autobind-decorator';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import questions from './questions';
import Step from './Step';


const styles = {
  documentBootstrap: css`
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 800px;

    & .rotate-enter, .rotate-reverse-exit.rotate-reverse-exit-active {
      opacity: 0;
      z-index: 1;
      transform: rotate3d(0, 1, 0, 10deg) translate3d(500px, 0, 0) scale(0.9);
      transition: all var(--transition-duration) ease-in-out;
      transition-property: opacity, transform;
    }

    & .rotate-enter.rotate-enter-active, .rotate-reverse-enter.rotate-reverse-enter-active, .rotate-exit, .rotate-reverse-exit {
      opacity: 1;
      transform: none;
      transition: all var(--transition-duration) ease-in-out;
    }

    & .rotate-exit.rotate-exit-active, .rotate-reverse-enter {
      opacity: 0;
      transform: rotate3d(0, 1, 0, -10deg) translate3d(-500px, 0, 0) scale(0.9);
      transition: all var(--transition-duration) ease-in-out;
      transition-property: opacity, transform;
    }
  `,
};


const MAX_STEP = 5;


class DocumentBoostrap extends React.Component<{}> {
  state = {
    step: 1,
    reverse: false,
  }

  render() {
    const { step, reverse } = this.state;
    return (
      <div className={styles.documentBootstrap}>
        <TransitionGroup
          component={null}
          childFactory={(child) => React.cloneElement(child, {
            classNames: reverse ? 'rotate-reverse' : 'rotate',
          })}>
          <CSSTransition key={step} timeout={400} classNames="rotate">
            <Step
              progressLabel={`${step}/${MAX_STEP}`}
              question={questions[step - 1]}
              goNext={step >= 1 ? (step === MAX_STEP ? this._handleFinish : this._goNext) : null}
              goBack={step === 1 ? null : this._goBack} />
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }

  @autobind
  _goBack() {
    const { step } = this.state;
    if (step > 1) {
      this.setState({ step: step - 1, reverse: true });
    }
  }

  @autobind
  _goNext() {
    const { step } = this.state;
    if (step < MAX_STEP) {
      this.setState({ step: step + 1, reverse: false });
    }
  }

  @autobind
  _handleFinish() {

  }
}


export default DocumentBoostrap;
