import React from 'react';
import { parse } from 'query-string';
import { v4 } from 'uuid';
import autobind from 'autobind-decorator';

import DocumentBoostrap from '../components/DocumentBoostrap';
import { saveUntitled } from '../utils/storage';


class Document extends React.Component<{
  match: any,
  location: any,
  history: any,
}> {
  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    if (params.id) {
      console.log('gonna load new doc', params.id);
      // load the current document
    }
  }

  render() {
    const { match, location } = this.props;
    const { params } = match;

    if (! params.id) {
      return <DocumentBoostrap onFinish={this._onFinishBootstrap} fromTemplate={!! parse(location.search).template} />
    }
    else {
      return (
        <div>
          I am editing a document
        </div>
      );
    }
  }

  @autobind
  async _onFinishBootstrap(newFileData: any) {
    const { history } = this.props;
    const newId = v4();
    await saveUntitled(newId, '', { ...newFileData, id: newId });
    history.push(`/${newId}/edit`);
  }
}


export default Document;
