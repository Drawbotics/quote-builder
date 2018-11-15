import React from 'react';

import DocumentBoostrap from '../components/DocumentBoostrap';


class Document extends React.Component<{
  match: any,
}> {
  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    if (params.id) {
      // load the current document
    }
  }

  render() {
    const { match } = this.props;
    const { params } = match;
    if (! params.id) {
      return <DocumentBoostrap />
    }
    else {
      return (
        <div>
          I am editing a document
        </div>
      );
    }
  }
}


export default Document;
