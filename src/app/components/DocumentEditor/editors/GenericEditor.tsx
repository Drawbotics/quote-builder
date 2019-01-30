import React from 'react';
import autobind from 'autobind-decorator';
import omit from 'lodash/omit';


class GenericEditor extends React.Component<{
  document: any,
  onClickUpdate: (document: any) => void,
  sectionId: string,
  children: any,
}> {
  state = {} as any

  componentDidMount() {
    const { document, sectionId } = this.props;
    const section = document.sections.find((s: any) => s.id === sectionId);
    this.setState({ contents: section.contents || {} });
  }

  render() {
    const { contents } = this.state;
    if (! contents) return null;
    return (
      <div>
        {this.props.children({
          onChange: this._handleChange,
          onClickUpdate: this._handleClickUpdate,
          contents,
        })}
      </div>
    );
  }

  @autobind
  _handleChange(value: string, key: string) {
    const contents = value === '' ? omit(this.state.contents, key) : { ...this.state.contents, [key]: value };
    this.setState({ contents });
  }

  @autobind
  _handleClickUpdate() {
    const { document, sectionId, onClickUpdate } = this.props;
    const { contents } = this.state;
    document.sections = document.sections.map((documentSection: any) =>
      documentSection.id === sectionId ? { ...documentSection, contents } : documentSection);
    onClickUpdate(document);
  }
}


export default GenericEditor;
