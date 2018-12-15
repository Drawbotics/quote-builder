import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';


const tt = createTranslate('document.project');


const styles = StyleSheet.create({
  wrapper: {
  },
  title: {
    fontSize: 16,
    color: sv.textPrimary,
    marginTop: sv.baseMargin,
    marginBottom: sv.baseMarginSmall,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.8,
    color: sv.textPrimary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    fontFamily: 'OpenSans-SemiBold',
    color: sv.textPrimary,
    marginBottom: 5,
    marginTop: 10,
  },
});


const Stats: React.SFC<{
  contents: any,
}> = ({ contents }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  const section = { title: 'Audience', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' };
  const sections = Array(5).fill(section);
  return (
    <PageWrapper title={t('title')} wrap={true}>
    <View style={styles.wrapper}>
        <Text style={styles.title}>{t('introduction_title')}</Text>
        <Text style={styles.paragraph}>{t('introduction_description')}</Text>
        <Text style={styles.title}>{t('information_title')}</Text>
        {sections.map((section, i) => (
          <View key={i}>
            <Text style={styles.subtitle}>{section.title}</Text>
            <Text style={styles.paragraph}>{section.description}</Text>
          </View>
        ))}
      </View>
    </PageWrapper>
  );
};


export default Stats;
