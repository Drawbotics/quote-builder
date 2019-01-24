import React from 'react';
import { css } from 'emotion';

import Panel from './Panel';
import editors from './editors';


interface Section {
  type: string
  id: string
}


const styles = {
  editingPanel: css`
    min-width: 350px;
  `,
};


const EditingPanel: React.SFC<{
  onClickToggle: () => void,
  editingSection: Section,
  document: any,
  onChange: (document: any) => void,
}> = ({
  onClickToggle,
  editingSection,
  document,
  onChange,
}) => {
  const Editor = editors[editingSection.type];
  if (! Editor) {
    console.warn(`No editor implemented for ${editingSection.type}`);
    return null;
  }
  return (
    <div className={styles.editingPanel} id="editing-panel">
      <Panel title="Modify section" onClick={onClickToggle}>
        <Editor document={document} onClickUpdate={onChange} sectionId={editingSection.id} />
      </Panel>
    </div>
  );
};


export default EditingPanel;
