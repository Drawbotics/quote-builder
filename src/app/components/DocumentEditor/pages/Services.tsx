import React from 'react';
import { View, StyleSheet, Image, Text } from '@react-pdf/renderer';

// import sv from '../vars';
import PageWrapper from './PageWrapper';
import { getCurrentLocale } from  '~/utils';
import { createTranslate, translate as t, translateAlt as ta } from '~/utils/translation';
import { TableType } from '../../TableEditor/types';


interface ServiceType {
  icon: string
  name: string
  coverImage: string
  description: string
}


const tt = createTranslate('document.products');


function getAllServices(tables: TableType[]) {
  return tables.reduce((memo, table) => [
    ...memo,
    ...table.body.reduce((memo, row) => row.service.id ? [
      ...memo,
      row.service.id,
    ] : memo, []),
  ], []);
}


function generateServiceSections(allServices: string[], products: any, locale: string) {
  // TODO fix this section
  return allServices.map((id) => {
    return {
      name: t(locale, `services.${id}.name`),
      description: ta(locale, `services.${id}description`, 'custom description'),
    };
  });
}


const styles = StyleSheet.create({
  wrapper: {
  },
  service: {

  },
});


const Service: React.SFC<{
  service: ServiceType,
}> = ({ service }) => {
  return (
    <View style={styles.service}>
      <View style={styles.image}>
        <Image />
      </View>
      <Text></Text>
    </View>
  );
};


const Services: React.SFC<{
  tables: TableType[],
  contents: any,
}> = ({ tables, contents }) => {
  const locale = getCurrentLocale();
  const allServices = getAllServices(tables);
  // @ts-ignore:
  const sections = generateServiceSections(allServices, contents.products, locale);
  // placeholder
  const service = {
    name: t(locale, 'services.interio3d.name'),
    description: t(locale, 'interior3d.description'),
    coverImage: require('../images/services/interior3d.jpg'),
    icon: '',
  };
  return (
    <PageWrapper title="Drawbotics" subtitle={tt(locale, 'title')} wrap>
      <View style={styles.wrapper}>
        <Service service={service} />
      </View>
    </PageWrapper>
  );
};


export default Services;
