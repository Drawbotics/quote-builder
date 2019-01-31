import uniqBy from 'lodash/uniqBy';

import { TableType, TableRowType, ServiceType } from '../components/TableEditor/types';


export const services = [
  'interior3d',
  'exterior3d',
  'shoebox',
  'video-animation',
  'virtual-tour',
  'drone-shooting',
  'photo-shooting',
  'maquette',
  'commercial-floorplan',
  'billboard',
  'brand-id',
  'brochure',
  'flyer',
  'landing-page',
  'newsletter',
  'website',
  'media-kit',
  'social-media-kit',
  'floorplan',
  'photo-editing',
  'restyling',
  'exterior-restyling',
  'revo',
  'custom',
];


export function tablesToServiceList(tables: TableType[]) {
  const services = tables.reduce((memo: ServiceType[], table: TableType) =>
    [ ...memo, ...table.body.map((row: TableRowType) => row.service) ], []);
  return uniqBy(services, (s) => s.id);
}
