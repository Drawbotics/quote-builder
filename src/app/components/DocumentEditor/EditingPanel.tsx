import React from 'react';
import { css } from 'emotion';

import Panel from './Panel';


const styles = {
  editingPanel: css`
    min-width: 350px;
  `,
};


const EditingPanel: React.SFC<{
  onClickToggle: () => void,
}> = ({
  onClickToggle,
}) => {
  return (
    <div className={styles.editingPanel} id="editing-panel">
      <Panel title="Modify section" onClick={onClickToggle}>
        <div></div>
      </Panel>
    </div>
  );
};


export default EditingPanel;
