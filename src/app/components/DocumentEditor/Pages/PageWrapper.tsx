import React from 'react';
import { View, Page, StyleSheet, Image, Text } from '@react-pdf/renderer';

import sv from '../vars';

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
    paddingTop: 0,
    marginTop: 140,
  },
  withBackground: {
    backgroundColor: sv.grey50,
    marginTop: 180,
  },
  withoutPadding: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  footerLogo: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    width: 80,
    transform: 'translate(-40px, 0)',
  },
  pageLine: {
    position: 'absolute',
    top: 60,
    right: 0,
    width: 30,
    height: 1,
    backgroundColor: sv.textSecondary,
  },
  pageCount: {
    position: 'absolute',
    top: sv.baseMargin + 5,
    right: sv.baseMargin + sv.baseMarginSmall,
    color: sv.textSecondary,
    fontSize: 32,
  },
  title: {
    position: 'absolute',
    top: 80,
    left: 70,
    fontSize: 30,
    color: sv.textSecondary,
  },
  subtitle: {
    position: 'absolute',
    fontFamily: 'OpenSans-Bold',
    top: 125,
    left: 70,
    fontSize: 12,
    textTransform: 'uppercase',
    color: sv.textPrimary,
  },
});


const PageWrapper: React.SFC<{
  children: any,
  title?: string,
  subtitle?: string,
  noPadding?: boolean,
  noPageNum?: boolean,
}> = ({
  children,
  title,
  subtitle,
  noPadding,
  noPageNum,
}) => {
  return (
    <Page style={styles.page} wrap={false}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={[styles.wrapper,
        title ? styles.withBackground : null,
        noPadding ? styles.withoutPadding : null,
      ]}>
        {children}
      </View>
      {noPageNum ? null : <View style={styles.pageLine}></View>}
      {noPageNum ? null : <Text style={styles.pageCount} render={({ pageNumber }: { pageNumber: number }) => `${pageNumber}`} />}
      <Image style={styles.footerLogo} src={drawboticsLogo} />
    </Page>
  );
};


export default PageWrapper;
