import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch } from 'react-router-dom';
import { css } from 'emotion';


const styles = {
  wrapper: css`
    position: relative;

    & .fade-enter {
      opacity: 0;
      z-index: 1;
      transform: rotate3d(1,1,0,20deg);
      transform-origin: 0 100%;
      transition: all var(--transition-duration-short) var(--transition-duration-short) ease-in-out;
      transition-property: opacity, transform;
    }

    & .fade-enter.fade-enter-active {
      opacity: 1;
      transform: none;
    }

    & .fade-exit {
      opacity: 1;
      transform: none;
      transition: all var(--transition-duration-short) ease-in-out;
    }

    & .fade-exit.fade-exit-active {
      opacity: 0;
      transform: rotate3d(1,1,0,20deg);
      transform-origin: 0 100%;
    }

    > div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `,
  groupEnter: css`
  `,
};


const AnimatedSwitch: React.SFC<{
  children: React.ReactNodeArray,
  location: any,
}> = ({
  children,
  location,
}) => {
  return (
    <div className={styles.wrapper}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}>
          <Switch location={location}>
            {children}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};


export default AnimatedSwitch;
