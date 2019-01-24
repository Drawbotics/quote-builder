import React, { Fragment } from 'react';
import { View, StyleSheet, Image, Text } from '@react-pdf/renderer';
import { chunk, last } from 'lodash';

import sv from '../vars';
import PageWrapper from './PageWrapper';
import BulletedText from './utils/BulletedText';
import { getCurrentLocale } from  '~/utils';
import { tablesToServiceList } from '~/utils/services';
import { createTranslate } from '~/utils/translation';
import { TableType } from '../../TableEditor/types';
import { ServiceType, RevoType, generateServiceSections } from '../utils';

import revoLogo from '../images/revo-logo.png';


const tt = createTranslate('document.products');


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
    minHeight: 50,
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
  noImage: {
    height: '100%',
    width: '100%',
    backgroundColor: sv.grey100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderTopColor: 'red',
    borderTopWidth: 2,
    borderRightColor: 'red',
    borderRightWidth: 2,
    borderLeftColor: 'red',
    borderLeftWidth: 2,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  noImageLabel: {
    marginTop: sv.baseMarginSmall,
    fontSize: 12,
  },
  red: {
    color: 'red',
    textAlign: 'left',
  },
});


const ImagePlaceholder: React.SFC<{}> = () => {
  return (
    <View style={styles.noImage}>
      <Text>No image for this service</Text>
      <Text style={styles.noImageLabel}>Import an image to see it appear here</Text>
    </View>
  );
};


const Service: React.SFC<{
  service: ServiceType,
  reversed?: boolean,
}> = ({ service, reversed=false }) => {
  const { icon, name, image, description } = service;
  return (
    <View style={[styles.service, reversed ? styles.reversed : null]} wrap={false}>
      <View style={[styles.info, reversed ? styles.reversedInfo : null]}>
        <Image src={icon} style={styles.icon} />
        <Text style={styles.title}>{name}</Text>
        <Text style={[styles.description, description ? null : styles.red]}>{description || 'No description'}</Text>
      </View>
      <View style={[styles.imageWrapper, reversed ? styles.reversedImage : null]}>
        {image ? <Image src={image} style={styles.image} /> : <ImagePlaceholder />}
      </View>
    </View>
  );
};


const Revo: React.SFC<{
  service: RevoType,
}> = ({ service }) => {
  const { description, description2, description3, image } = service;
  return (
    <View style={styles.revoWrapper}>
      <View style={styles.service}>
        <View style={styles.info}>
          <Image src={revoLogo} style={styles.revoLogo} />
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image src={image} style={styles.image} />
        </View>
      </View>
      <View style={styles.descriptions}>
        <View style={[styles.description, styles.revoDescription, { marginRight: sv.baseMargin }]}>
          <BulletedText>{description2 || ''}</BulletedText>
        </View>
        <View style={[styles.description, styles.revoDescription, { marginLeft: sv.baseMargin }]}>
          <BulletedText>{description3 || ''}</BulletedText>
        </View>
      </View>
    </View>
  );
};


const Services: React.SFC<{
  tables: TableType[],
  contents: any,
  onPageRender: (p: number) => void,
}> = ({ tables, contents, onPageRender }) => {
  const locale = getCurrentLocale();
  const allServices = tablesToServiceList(tables);
  const sections = generateServiceSections(allServices, contents.products, locale);
  const servicePages = chunk(sections.filter((section: ServiceType | RevoType) => section.id !== 'revo'), 2);
  const revo = last(sections) as RevoType;
  return (
    <Fragment>
      {servicePages.map((services, i) => (
        <PageWrapper key={i} title="Drawbotics" subtitle={tt(locale, 'title')} onPageRender={onPageRender}>
          {services.map((service: ServiceType, j) => (
            <Service key={j} service={service} reversed={j % 2 !== 0} />
          ))}
        </PageWrapper>
      ))}
      {revo &&
        <PageWrapper title="Drawbotics" subtitle={tt(locale, 'title')} onPageRender={onPageRender}>
          <Revo service={revo} />
        </PageWrapper>
      }
    </Fragment>
  );
};


export default Services;
