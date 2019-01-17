import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';


const tt = createTranslate('document.story_telling');

const styles = StyleSheet.create({
  wrapper: {
    marginTop: sv.baseMargin * 2,
    height: '100%',
  },
  padded: {
    paddingRight: 70,
    paddingLeft: 70,
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
  gallery: {
    position: 'absolute',
    bottom: 180 - 15,
    left: 0,
    width: '100%',
  },
  row: {
    height: 200,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: '100%',
    marginRight: 5,
  },
  noImages: {
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
  noImagesLabel: {
    marginTop: sv.baseMarginSmall,
    fontSize: 12,
  },
});


const NoImages: React.SFC<{}> = () => {
  return (
    <View style={styles.noImages}>
      <Text>No images in this row</Text>
      <Text style={styles.noImagesLabel}>Import images to see them appear here</Text>
    </View>
  );
};


const StoryTelling: React.SFC<{
  contents: any,
  onPageRender: (p: number) => void,
}> = ({ contents, onPageRender }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  const row1 = contents.row1 || [];
  const row2 = contents.row2 || [];
  return (
    <PageWrapper title={t('title')} noPadding noLogo onPageRender={onPageRender}>
      <View style={styles.wrapper}>
        <View style={styles.padded}>
          <Text style={styles.title}>{contents.title}</Text>
          <Text style={styles.paragraph}>
            {contents.description}
          </Text>
        </View>
        <View style={styles.gallery}>
          <View style={styles.row}>
            {row1.length > 0 ? row1.map((image: string, i: number) => (
              <Image key={i} style={styles.image} src={image} />
            )) : <NoImages />}
          </View>
          <View style={styles.row}>
            {row2.length > 0 ? row2.map((image: string, i: number) => (
              <Image key={i} style={styles.image} src={image} />
            )) : <NoImages />}
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};


export default StoryTelling;
