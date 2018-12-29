import { ServiceType } from '../TableEditor/types';
import { loadPerson } from '~/utils/storage/people';
import { tablesToServiceList } from '~/utils/services';
import { ProductType } from '~/utils/types';


export async function basicInfoToQuoteFile(info: any, fromTemplate: boolean) {
  const person = await loadPerson(info.sales.personId);
  const uniqueServices = tablesToServiceList(info.quote.tables);
  const customServices = uniqueServices.filter((service: ServiceType) => service.name);
  const customProducts = customServices.reduce((memo: { [key: string]: ProductType }, service: ServiceType) => ({
    ...memo,
    [service.id as string]: {
      title: service.name,
      image: undefined,
      description: undefined,
    },
  }), {} as { [key: string]: ProductType });

  const data = {
    person: person,
    project: {
      ...info.client,
      clientLogo: info.logo.logo,
    },
    language: info.language.language,
    tables: info.quote.tables,
  };

  let sections = [];
  sections.push({ type: 'cover' });
  if (fromTemplate) {
    sections.push({ type: 'profile' });
    sections.push({ type: 'howWeWork' });
    sections.push({ type: 'products',
      contents: {
        products: customProducts,
      },
    });
  }
  sections.push({ type: 'tables' });
  sections.push({ type: 'paymentMethods' });

  return { data, sections };
}
