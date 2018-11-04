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
    }

    & .fade-enter.fade-enter-active {
      opacity: 1;
      transition: opacity var(--transition-duration) ease-in-out;
    }

    > div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
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
