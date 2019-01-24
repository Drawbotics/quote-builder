import { translateAlt as ta } from '~/utils/translation';
import { get } from 'lodash';

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
  description2: string
  description3: string
}


export function generateServiceSections(allServices: any[], products: any, locale: string) {
  return allServices.map(({ id }) => ({
    id,
    name: ta(locale, `services.${id}.name`, get(products, `${id}.title`, '')),
    description: ta(locale, `services.${id}.description`, get(products, `${id}.description`, '')),
    image: get(products, `${id}.image`) || images[id],
    icon: icons[id] || icons['custom'],
  }));
}
