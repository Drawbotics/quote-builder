import { translateAlt as ta } from '~/utils/translation';
import get from 'lodash/get';
import { pdf } from '@react-pdf/renderer';

import DocumentGenerator from './DocumentGenerator';

import images from './images/services';
import icons from './images/icons/services';


export interface ServiceType {
  id: string
  name: string
  icon?: string
  image?: string
  description?: string
}


export interface RevoType extends ServiceType {
  description2?: string
  description3?: string
}


export function generateServiceSections(allServices: any[], products: any, locale: string) {
  const services = allServices.map(({ id, name }) => ({
    id,
    name: ta(locale, `services.${id}.name`, get(products, `${id}.title`, name || '')),
    description: ta(locale, `services.${id}.description`, get(products, `${id}.description`, '')),
    image: get(products, `${id}.image`) || images[id],
    icon: icons[id] || icons['custom'],
  }));
  const withRevo = services.map((service) => service.id === 'revo' ? ({
    ...service,
    description2: ta(locale, 'services.revo.description2', get(products, 'revo.description2', '')),
    description3: ta(locale, 'services.revo.description3', get(products, 'revo.description3', '')),
  }) : service);
  return withRevo.sort((a) => a.id === 'revo' ? 1 : -1);
}


async function blobToBuffer(blob: Blob) {
  const reader = new FileReader();
  return new Promise<any>((resolve, reject) => {
    reader.onload = () => {
      try {
        const buffer = new Buffer(reader.result as ArrayBuffer);
        resolve(buffer);
      }
      catch (err) {
        reject(err);
      }
    };
    reader.readAsArrayBuffer(blob);
  });
}


export async function documentToPDF(document: any) {
  const blobGenerator = pdf();
  const generatedDocument = DocumentGenerator({ document, onPageRender: () => null });
  blobGenerator.updateContainer(generatedDocument);
  const blob = await blobGenerator.toBlob();
  return await blobToBuffer(blob);
}
