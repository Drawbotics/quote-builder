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
}> = ({ contents }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  // const images1 = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAeczDxErmEQXSZQtdFpiKrVKJKB8Y8MFkNCFodNkIPcWly-Fx', 'https://www.telegraph.co.uk/content/dam/Travel/2018/April/hong-kong-skyline.jpg?imwidth=450'];
  const images2 = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_yhj0tmdPemwpX2reGNPrE7fqYH7w_uVrSe9fax9cAGhy5k6', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsOIYUGblX8STY6m2K-ruHwcqhk6jQ4XbZwrUv5579esxJfeEP', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxB9xVDh3YreSZPYtq2BCpDFhoYtvEdM-LkdRrOlKaU8ZbGmIu'];
  const images1: string[] = [];
  // const images2: string[] = [];
  return (
    <PageWrapper title={t('title')} noPadding noLogo>
      <View style={styles.wrapper}>
        <View style={styles.padded}>
          <Text style={styles.title}>Central park</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </View>
        <View style={styles.gallery}>
          <View style={styles.row}>
            {images1.length > 0 ? images1.map((image, i) => (
              <Image key={i} style={styles.image} src={image} />
            )) : <NoImages />}
          </View>
          <View style={styles.row}>
            {images2.length > 0 ? images2.map((image, i) => (
              <Image key={i} style={styles.image} src={image} />
            )) : <NoImages />}
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};


export default StoryTelling;
