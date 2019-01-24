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
  const services = allServices.map(({ id }) => ({
    id,
    name: ta(locale, `services.${id}.name`, get(products, `${id}.title`, '')),
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
