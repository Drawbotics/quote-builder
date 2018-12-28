import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { title, paragraph} from './styles';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';
import BulletedText from './utils/BulletedText';


const tt = createTranslate('document.project');


const styles = StyleSheet.create({
  wrapper: {
  },
  title: title,
  paragraph: paragraph,
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
          <View key={i} wrap={false}>
            <Text style={styles.subtitle}>{section.title}</Text>
            <View style={styles.paragraph}>
              <BulletedText>{section.description}</BulletedText>
            </View>
          </View>
        ))}
      </View>
    </PageWrapper>
  );
};


export default Stats;
