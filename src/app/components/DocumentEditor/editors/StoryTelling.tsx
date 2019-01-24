import React from 'react';
import autobind from 'autobind-decorator';
import { omit } from 'lodash';
import { css } from 'emotion';
import { X } from 'react-feather';

import Input, { InputGroup } from '../../Input';
import Button from '../../Button';
import FileSelector from '../../FileSelector';


const styles = {
  update: css`
    margin-top: var(--margin);
  `,
  row: css`
    margin-top: var(--margin);
  `,
  label: css`
    margin-bottom: calc(var(--margin) / 2);
    font-size: 0.9rem;
    color: var(--text-primary);
  `,
  images: css`
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: calc(var(--margin) / 2);
  `,
  image: css`
    width: 100px;
    height: 70px;
    position: relative;
    margin-right: calc(var(--margin) / 2);

    > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  `,
  remove: css`
    position: absolute;
    top: 5px;
    right: 5px;
    color: var(--white);
    background: var(--primary);
    height: 15px;
    width: 15px;
    border-radius: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
    }
  `,
};


class StoryTelling extends React.Component<{
  document: any,
  onClickUpdate: (document: any) => void,
  sectionId: string,
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
    const { row1, row2 } = contents;
    return (
      <div>
        <InputGroup>
          <Input label="Title" name="title" value={contents.title || ''} onChange={this._handleChange} topLabel />
          <Input label="Description" name="description" value={contents.description || ''} onChange={this._handleChange} topLabel area />
        </InputGroup>
        <div className={styles.row}>
          <div className={styles.label}>
            Images in row 1
          </div>
          <div className={styles.images}>
            {row1 && row1.map((image: string, i: number) => (
              <div className={styles.image} key={i}>
                <div className={styles.remove} onClick={() => this._handleRemoveImage('row1', i)}>
                  <X size={12} />
                </div>
                <img src={image} />
              </div>
            ))}
          </div>
          <FileSelector label="Click to add image" onFileSelect={(file: string) => this._handleSelectFile('row1', file)} />
        </div>
        <div className={styles.row}>
          <div className={styles.label}>
            Images in row 2
          </div>
          <div className={styles.images}>
            {row2 && row2.map((image: string, i: number) => (
              <div className={styles.image} key={i}>
                <div className={styles.remove} onClick={() => this._handleRemoveImage('row2', i)}>
                  <X size={12} />
                </div>
                <img src={image} />
              </div>
            ))}
          </div>
          <FileSelector label="Click to add image" onFileSelect={(file: string) => this._handleSelectFile('row2', file)} />
        </div>
        <div className={styles.update}>
          <Button onClick={this._handleClickUpdate}>Update</Button>
        </div>
      </div>
    );
  }

  @autobind
  _handleChange(value: string, key: string) {
    const contents = value === '' ? omit(this.state.contents, key) : { ...this.state.contents, [key]: value };
    this.setState({ contents });
  }

  @autobind
  _handleSelectFile(key: string, file: string) {
    const { contents } = this.state;
    this.setState({ contents: { ...contents, [key]: [ ...(contents[key] || []), file ] } });
  }

  @autobind
  _handleRemoveImage(key: string, index: number) {
    const { contents } = this.state;
    this.setState({ contents: { ...contents, [key]: contents[key].filter((image: string, i: number) => i !== index) }});
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


export default StoryTelling;
