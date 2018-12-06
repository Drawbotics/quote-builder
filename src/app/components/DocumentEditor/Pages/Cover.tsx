import React from 'react';
import { Page, View, StyleSheet, Image } from '@react-pdf/renderer';

import coverImage from '../images/cover.jpg';
import drawboticsLogo from '../images/logo.png';


const styles = StyleSheet.create({
  page: {
    fontFamily: 'OpenSans',
    backgroundColor: 'white',
  },
  coverImage: {
    width: '100%',
    height: 'auto',
  },
  content: {
  },
  logo: {
    position: 'absolute',
    bottom: '-90px',
    left: '50%',
    width: '250px',
    transform: 'translate(-125px, 0)',
  },
});


const Cover = () => {
  return (
    <Page style={styles.page}>
      <View>
        <Image style={styles.coverImage} src={coverImage} />
        <Image style={styles.logo} src={drawboticsLogo} />
      </View>
    </Page>
  );
};


export default Cover;
