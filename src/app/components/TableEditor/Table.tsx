import React from 'react';
import { css, cx } from 'emotion';
import autobind from 'autobind-decorator';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
  SortableHandle,
} from 'react-sortable-hoc';
import { MoreVertical } from 'react-feather';

import { TableType, TableRowType, FooterRowType, TableHeaderType } from './types';
import Row from './Row';
import Header from './Header';
import Footer from './Footer';


const styles = {
  table: css`
  `,
  body: css`
    border-top: 1px solid var(--line-color);
    border-right: 1px solid var(--line-color);
    background: var(--tertiary);
    margin-bottom: var(--margin);
    transition: all var(--transition-duration) ease-in-out;
  `,
  footers: css`
    border-top: 1px solid var(--line-color);
    border-right: 1px solid var(--line-color);
    background: var(--tertiary);
    transition: all var(--transition-duration) ease-in-out;
  `,
  rowContainer: css`
    position: relative;

    &:hover {
      & [data-element="handle"] {
        opacity: 1;
      }
    }
  `,
  dragging: css`
    box-shadow: var(--box-shadow-hover);
    z-index: 9999;
  `,
  dragHandle: css`
    display: flex;
    align-items: center;
    padding: var(--padding);
    position: absolute;
    left: calc(var(--margin) * -2);
    color: var(--grey);
    opacity: 0;

    > svg {
      margin: 0 -7px;
    }

    &:hover {
      cursor: grab;
    }
  `,
}


const DragHandle = SortableHandle(() => (
  <div className={styles.dragHandle} data-element="handle">
    <MoreVertical size={20} />
    <MoreVertical size={20} />
  </div>
));


const SortableRow: any = SortableElement(({ value, ...rest }) => {
  return (
    <div className={cx(styles.rowContainer)}>
      <DragHandle />
      <Row row={value} {...rest} />
    </div>
  );
});


const SortableBody: any = SortableContainer(({ items, onChange, onClickRemove, dragging }) => {
  return (
    <div>
      {items.map((row: TableRowType, i: number) => (
        <SortableRow
          value={row}
          key={`item-${i}`}
          index={i}
          onClickRemove={() => onClickRemove(i)}
          onChange={(v: any) => onChange(i, v)} />
      ))}
    </div>
  );
});


class Table extends React.Component<{
  table: TableType,
  onChange: (newTable: TableType) => void,
}> {

  render() {
    const { table } = this.props;
    const { header, body, footers } = table;
    return (
      <div className={styles.table}>
        <div className={styles.body}>
          <Header header={header} onChange={this._hanldleModifyHeader} />
          <SortableBody
            helperClass={styles.dragging}
            useDragHandle={true}
            lockAxis="y"
            onChange={(i: number, v: any) => this._handleModifyRow('modify', i, v)}
            onClickRemove={(i: number) => this._handleModifyRow('remove', i)}
            items={body}
            onSortEnd={this._handleOnRowMove} />
          <Row onClickAdd={() => this._handleModifyRow('add')} />
        </div>
        <div className={styles.footers}>
          {footers.map((footer, i) => (
            <Footer
              key={i}
              footer={footer}
              onClickRemove={() => this._handleModifyFooter('remove', i)}
              onChange={(v) => this._handleModifyFooter('modify', i, v)}/>
          ))}
          <Footer onClickAdd={() => this._handleModifyFooter('add')} />
        </div>
      </div>
    );
  }

  @autobind
  _hanldleModifyHeader(value: TableHeaderType) {
    const { onChange, table } = this.props;
    onChange({ ...table, header: value });
  }

  @autobind
  _handleOnRowMove({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
    const { table, onChange } = this.props;
    const newBody = arrayMove(table.body, oldIndex, newIndex);
    onChange({ ...table, body: newBody });
  }

  @autobind
  _handleModifyRow(operation: string, index=0, value?: TableRowType) {
    const { onChange, table } = this.props;
    const { body } = table;
    if (operation === 'remove') {
      onChange({
        ...table,
        body: [ ...body.slice(0, index), ...body.slice(index + 1) ],
      });
    }
    else if (operation === 'add') {
      const newRow = { phase: '', service: { id: undefined }, comment: '', price: '' };
      onChange({ ...table, body: [ ...body, newRow ] });
    }
    else if (operation === 'modify') {
      onChange({
        ...table,
        body: Object.assign([], body, { [index]: value }),
      });
    }
  }

  @autobind
  _handleModifyFooter(operation: string, index=0, value?: FooterRowType) {
    const { onChange, table } = this.props;
    const { footers } = table;
    if (operation === 'remove') {
      onChange({
        ...table,
        footers: [ ...footers.slice(0, index), ...footers.slice(index + 1) ],
      });
    }
    else if (operation === 'add') {
      const newFooter = { label: '', comment: '', value: '' };
      onChange({ ...table, footers: [ ...footers, newFooter ] });
    }
    else if (operation === 'modify') {
      onChange({
        ...table,
        footers: Object.assign([], footers, { [index]: value }),
      });
    }
  }
}


export default Table;
