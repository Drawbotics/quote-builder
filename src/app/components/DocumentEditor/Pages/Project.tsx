import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { title, paragraph} from './styles';
import { getCurrentLocale } from '~/utils';
import { createTranslateAlt } from '~/utils/translation';
import PageWrapper from './PageWrapper';
import BulletedText from './utils/BulletedText';


interface SubsectionType {
  title: string
  description: string
}


const tt = createTranslateAlt('document.project');


const styles = StyleSheet.create({
  wrapper: {
  },
  title: title,
  paragraph: paragraph,
  subtitle: {
    fontSize: 10,
    fontFamily: 'OpenSans',
    fontWeight: 600,
    color: sv.textPrimary,
    marginBottom: 5,
    marginTop: 10,
  },
});


const Project: React.SFC<{
  contents: any,
  onPageRender: (p: number) => void,
}> = ({ contents, onPageRender }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  // TODO: see what to do about project sections longer than 2 pages
  const subsections = contents.subsections || [];
  return (
    <PageWrapper title={t('title')} wrap={true} onPageRender={onPageRender}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{t('introduction_title', contents.introductionTitle)}</Text>
        <Text style={styles.paragraph}>{t('introduction_description', contents.introductionDescription)}</Text>
        <Text style={styles.title}>{t('information_title', contents.informationTitle)}</Text>
        {subsections.map((subsection: SubsectionType, i: number) => (
          <View key={i} wrap={false}>
            <Text style={styles.subtitle}>{subsection.title}</Text>
            <View style={styles.paragraph}>
              <BulletedText>{subsection.description}</BulletedText>
            </View>
          </View>
        ))}
      </View>
    </PageWrapper>
  );
};


export default Project;
