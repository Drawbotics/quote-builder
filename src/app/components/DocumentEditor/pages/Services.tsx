import React, { Fragment } from 'react';
import { View, StyleSheet, Image, Text } from '@react-pdf/renderer';

import sv from '../vars';
import PageWrapper from './PageWrapper';
import { getCurrentLocale } from  '~/utils';
import { createTranslate, translate as t, translateAlt as ta } from '~/utils/translation';
import { TableType } from '../../TableEditor/types';

import revoLogo from '../images/revo-logo.png';


interface ServiceType {
  icon: string
  name: string
  coverImage: string
  description: string
}

interface RevoType extends ServiceType {
  description2: string
  description3: string
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
  service: {
    width: '100%',
    height: 220,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sv.baseMargin * 2,
  },
  reversed: {
    flexDirection: 'row-reverse',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sv.baseMarginSmall,
  },
  reversedInfo: {
    marginLeft: sv.baseMarginSmall,
    marginRight: 0,
  },
  imageWrapper: {
    marginRight: -120,
    width: 330,
    marginLeft: sv.baseMargin,
  },
  reversedImage: {
    marginRight: sv.baseMargin,
    marginLeft: -120
  },
  image: {
    height: '100%',
  },
  icon: {
    height: 30,
  },
  title: {
    color: sv.textPrimary,
    marginBottom: sv.baseMarginSmall,
    marginTop: 3,
  },
  description: {
    fontSize: 10,
    color: sv.textPrimary,
    textAlign: 'center',
    lineHeight: 1.8,
  },
  revoLogo: {
    width: 130,
    marginBottom: sv.baseMarginSmall,
  },
  revoWrapper: {
    marginTop: sv.baseMargin,
  },
  descriptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  revoDescription: {
    flex: 1,
    textAlign: 'left',
  },
});


const Service: React.SFC<{
  service: ServiceType,
  reversed?: boolean,
}> = ({ service, reversed=false }) => {
  const { icon, name, coverImage, description } = service;
  return (
    <View style={[styles.service, reversed ? styles.reversed : null]} wrap={false}>
      <View style={[styles.info, reversed ? styles.reversedInfo : null]}>
        <Image src={icon} style={styles.icon} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={[styles.imageWrapper, reversed ? styles.reversedImage : null]}>
        <Image src={coverImage} style={styles.image} />
      </View>
    </View>
  );
};


const Revo: React.SFC<{
  service: RevoType,
}> = ({ service }) => {
  const { description, description2, description3, coverImage } = service;
  return (
    <View style={styles.revoWrapper}>
      <View style={styles.service}>
        <View style={styles.info}>
          <Image src={revoLogo} style={styles.revoLogo} />
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image src={coverImage} style={styles.image} />
        </View>
      </View>
      <View style={styles.descriptions}>
        <Text style={[styles.description, styles.revoDescription, { marginRight: sv.baseMargin }]}>{description2}</Text>
        <Text style={[styles.description, styles.revoDescription, { marginLeft: sv.baseMargin }]}>{description3}</Text>
      </View>
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
    name: t(locale, 'services.interior3d.name'),
    description: t(locale, 'services.interior3d.description'),
    coverImage: require('../images/services/revo.png'),
    icon: require('../images/icons/services/interior3d.png'),
  };
  return (
    <Fragment>
      <PageWrapper title="Drawbotics" subtitle={tt(locale, 'title')} wrap>
        <Service service={service} />
        <Service service={service} reversed />
        <Service service={service} />
      </PageWrapper>
      {true ?
        <PageWrapper title="Drawbotics" subtitle={tt(locale, 'title')}>
          <Revo service={{
            ...service,
            description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            description3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          }} />
        </PageWrapper>
      : null}
    </Fragment>
  );
};


export default Services;
