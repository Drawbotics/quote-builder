import React from 'react';
import { css } from 'emotion';
import autobind from 'autobind-decorator';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import questions from './questions';
import Step from './Step';
import { basicInfoToQuoteFile } from './utils';


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
      transition: all var(--transition-duration) cubic-bezier(0.88, 0.17, 0.29, 0.85);
    }

    & .rotate-exit.rotate-exit-active, .rotate-reverse-enter {
      opacity: 0;
      transform: rotate3d(0, 1, 0, -10deg) translate3d(-500px, 0, 0) scale(0.9);
      transition: all var(--transition-duration) ease-in-out;
      transition-property: opacity, transform;
    }
  `,
};


const MAX_STEP = 1;


class DocumentBoostrap extends React.Component<{
  fromTemplate: boolean,
  onFinish: (data: any) => void
}> {
  state = {
    step: 1,
    reverse: false,
    values: {} as any,
  }

  render() {
    const { step, reverse, values } = this.state;
    const currentStep = questions[step - 1];
    return (
      <div className={styles.documentBootstrap}>
        <TransitionGroup
          component={null}
          childFactory={(child) => React.cloneElement(child, {
            classNames: reverse ? 'rotate-reverse' : 'rotate',
          })}>
          <CSSTransition key={step} timeout={400} classNames="rotate">
            <Step
              onChange={(v: string | any, k: string) => this._handleChange(currentStep.slug, v, k)}
              value={values[currentStep.slug]}
              progressLabel={`${step}/${MAX_STEP}`}
              question={currentStep}
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
  _handleChange(stepKey: string, value: any, key: string) {
    const { values } = this.state;
    const currentStepValue = values[stepKey];
    this.setState({
      values: {
        ...values,
        [stepKey]: {
          ...currentStepValue,
          [key]: value,
        },
      },
    });
  }

  @autobind
  async _handleFinish() {
    const { fromTemplate, onFinish } = this.props;
    const { values } = this.state;
    const fileContent = await basicInfoToQuoteFile(values, fromTemplate);
    onFinish(fileContent);
  }
}


export default DocumentBoostrap;
