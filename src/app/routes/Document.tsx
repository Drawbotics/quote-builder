import React from 'react';
import { parse } from 'query-string';

import DocumentBoostrap from '../components/DocumentBoostrap';


class Document extends React.Component<{
  match: any,
  location: any,
}> {
  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    if (params.id) {
      // load the current document
    }
  }

  render() {
    const { match, location } = this.props;
    const { params } = match;

    if (! params.id) {
      return <DocumentBoostrap fromTemplate={!! parse(location.search).template} />
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
