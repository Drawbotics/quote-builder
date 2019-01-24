import React from 'react';
import autobind from 'autobind-decorator';
import { css, cx } from 'emotion';


const styles = {
  container: css`
    height: 100%;
    width: 100%;
    overflow: scroll;
    display: flex;
    justify-content: center;
  `,
  draggable: css`
    &:hover {
      cursor: grab;
    }
  `,
}


class DraggableContainer extends React.Component<{
  children: React.ReactNode,
}> {
  scrollableContainer: any = null;

  state = {
    isScrolling: false,
    draggable: false,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleMouseDown);
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
    document.addEventListener('keydown', this._handleKeyPress);
    document.addEventListener('keyup', this._handleKeyRelease);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleMouseDown);
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
    document.removeEventListener('keydown', this._handleKeyPress);
    document.removeEventListener('keyup', this._handleKeyRelease);
  }

  render() {
    const { draggable } = this.state;
    const { children } = this.props;
    return (
      <div
        className={cx(styles.container, { [styles.draggable]: draggable })}
        ref={(container) => this.scrollableContainer = container}>
        {children}
      </div>
    );
  }

  @autobind
  _handleKeyPress(e: KeyboardEvent) {
    if (e.metaKey) {
      this.setState({ draggable: true });
    }
  }

  @autobind
  _handleKeyRelease(e: KeyboardEvent) {
    this.setState({ draggable: false, isScrolling: false });
  }

  @autobind
  _handleMouseDown(e: MouseEvent) {
    const { draggable } = this.state;
    if (draggable) {
      e.stopPropagation();
      this.setState({ isScrolling: true });
    }
  }

  @autobind
  _handleMouseMove(e: MouseEvent) {
    const { isScrolling } = this.state;
    if (isScrolling) {
      this.scrollableContainer.scrollTop = this.scrollableContainer.scrollTop - e.movementY * 1.1;
    }
  }

  @autobind
  _handleMouseUp(e: MouseEvent) {
    e.stopPropagation();
    this.setState({ isScrolling: false });
  }
}


export default DraggableContainer;
