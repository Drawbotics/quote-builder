import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';


const tt = createTranslate('document.story_telling');

const styles = StyleSheet.create({
  wrapper: {
    marginTop: sv.baseMargin * 2,
  },
  title: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    color: sv.textPrimary,
    marginBottom: sv.baseMarginSmall,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.8,
    color: sv.textPrimary,
  },
});


const StoryTelling: React.SFC<{
  contents: any,
}> = ({ contents }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  return (
    <PageWrapper title={t('title')}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Central park</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>
    </PageWrapper>
  );
};


export default StoryTelling;
