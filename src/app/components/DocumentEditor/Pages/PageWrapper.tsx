import React from 'react';
import { View, Page, StyleSheet, Image } from '@react-pdf/renderer';

import drawboticsLogo from '../images/logo.png';


const styles = StyleSheet.create({
  page: {
    fontFamily: 'OpenSans-Light',
    backgroundColor: 'white',
  },
  wrapper: {
    height: '100%',
    width: '100%',
    padding: 70,
    paddingTop: 100,
  },
  footerLogo: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    width: 80,
    transform: 'translate(-40px, 0)',
  },
});


const PageWrapper: React.SFC<{
  children: any,
}> = ({
  children,
}) => {
  return (
    <Page style={styles.page} wrap={false}>
      <View style={styles.wrapper}>
        {children}
      </View>
      <Image style={styles.footerLogo} src={drawboticsLogo} />
    </Page>
  );
};


export default PageWrapper;
