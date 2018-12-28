import React from 'react';
import { View, StyleSheet, Image, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { title, paragraph } from './styles';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';

import management from '../images/management.png';
import platform from '../images/online-platform.png';


const tt = createTranslate('document.what_we_do');

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sv.baseMargin * 3,
  },
  section: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sv.baseMargin * 2,
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  info: {
    flex: 1,
  },
  title: title,
  paragraph: paragraph,
  image: {
    flex: 1,
    marginLeft: sv.baseMargin,
  },
  reverseImage: {
    marginLeft: 0,
    marginRight: sv.baseMargin,
  },
});


const Section: React.SFC<{
  title: string,
  paragraph: string,
  icon: string,
  reverse?: boolean,
}> = ({ title, paragraph, icon, reverse }) => {
  return (
    <View style={[styles.section, reverse ? styles.reverse : null]}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.paragraph}>{paragraph}</Text>
      </View>
      <Image style={[styles.image, reverse ? styles.reverseImage : null]} src={icon} />
    </View>
  );
};


const WhatWeDo: React.SFC<{
  contents: any,
}> = ({ contents }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  return (
    <PageWrapper title="Drawbotics" subtitle={t('subtitle')}>
      <View style={styles.wrapper}>
        <Section
          title={t('platform_title', contents.platformTitle)}
          paragraph={t('platform_description', contents.platformDescription)}
          icon={platform} />
        <Section
          title={t('management_title', contents.managementTitle)}
          paragraph={t('management_description', contents.managementDescription)}
          icon={management}
          reverse />
      </View>
    </PageWrapper>
  );
};


export default WhatWeDo;
