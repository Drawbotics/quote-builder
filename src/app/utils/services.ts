import { uniqBy } from 'lodash';

import { TableType, TableRowType, ServiceType } from '../components/TableEditor/types';


export const services = [
  'interior3d',
  'exterior3d',
  'custom',
];


export function tablesToServiceList(tables: TableType[]) {
  const services = tables.reduce((memo: ServiceType[], table: TableType) =>
    [ ...memo, ...table.body.map((row: TableRowType) => row.service) ], []);
  return uniqBy(services, (s) => s.id);
}
