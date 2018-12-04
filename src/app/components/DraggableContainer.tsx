import React from 'react';


class DraggableContainer extends React.Component<{
  children: React.ReactNode,
}> {
  state = {
    isScrolling: false,
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}


export default DraggableContainer;
