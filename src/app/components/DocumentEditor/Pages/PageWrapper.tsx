import React from 'react';
import { View, Page, StyleSheet, Image, Text } from '@react-pdf/renderer';

import sv from '../vars';

import drawboticsLogo from '../images/logo.png';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'OpenSans',
    fontWeight: 300,
    backgroundColor: 'white',
  },
  pageWithBackground: {
    backgroundColor: sv.grey50,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    height: 180,
    width: '100%',
    backgroundColor: sv.white,
  },
  wrapped: {
    paddingTop: 210,
    paddingBottom: 70,
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
  withDescription: {
    marginTop: 250,
  },
  withoutPadding: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  wrappedWrapper: {
    marginTop: 0,
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
    fontFamily: 'OpenSans',
    fontWeight: 300,
    position: 'absolute',
    top: sv.baseMargin + 5,
    right: sv.baseMargin + sv.baseMarginSmall,
    color: sv.textSecondary,
    fontSize: 32,
  },
  title: {
    fontFamily: 'OpenSans',
    fontWeight: 300,
    position: 'absolute',
    top: 80,
    left: 0,
    paddingRight: 70,
    paddingLeft: 70,
    fontSize: 30,
    color: sv.textSecondary,
  },
  subtitle: {
    position: 'absolute',
    fontFamily: 'OpenSans',
    fontWeight: 800,
    top: 125,
    left: 0,
    paddingRight: 70,
    paddingLeft: 70,
    fontSize: 12,
    textTransform: 'uppercase',
    color: sv.textPrimary,
  },
  description: {
    fontFamily: 'OpenSans',
    fontWeight: 300,
    position: 'absolute',
    top: 170,
    left: 0,
    fontSize: 10,
    color: sv.textSecondary,
    width: '100%',
    paddingRight: 70,
    paddingLeft: 70,
  },
});

const PageWrapper: React.SFC<{
  children: any;
  onPageRender: (p: number) => void;
  title?: string;
  subtitle?: string;
  description?: string;
  noPadding?: boolean;
  noPageNum?: boolean;
  wrap?: boolean;
  noLogo?: boolean;
  extraComponent?: any;
}> = ({
  children,
  title,
  subtitle,
  description,
  noPadding,
  noPageNum,
  wrap = false,
  noLogo,
  extraComponent,
  onPageRender,
}) => {
  return (
    <Page
      style={[
        styles.page,
        wrap ? styles.wrapped : null,
        title && wrap ? styles.pageWithBackground : null,
      ]}
      wrap={wrap}>
      {wrap && title ? <View style={styles.headerBackground} fixed /> : null}
      {title ? (
        <Text style={styles.title} fixed>
          {title}
        </Text>
      ) : null}
      {subtitle ? (
        <Text style={styles.subtitle} fixed>
          {subtitle}
        </Text>
      ) : null}
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {!!extraComponent && extraComponent}
      <View
        style={[
          styles.wrapper,
          title ? styles.withBackground : null,
          description ? styles.withDescription : null,
          noPadding ? styles.withoutPadding : null,
          wrap ? styles.wrappedWrapper : null,
        ]}>
        {children}
      </View>
      {noPageNum ? null : <View style={styles.pageLine} fixed></View>}
      {noPageNum ? null : (
        <Text
          style={styles.pageCount}
          render={({ pageNumber }: { pageNumber: number }) => {
            onPageRender(pageNumber);
            return `${pageNumber}`;
          }}
          fixed
        />
      )}
      {noPageNum ? (
        <Text render={({ pageNumber }: { pageNumber: number }) => onPageRender(pageNumber)} />
      ) : null}
      {noLogo ? null : <Image style={styles.footerLogo} src={drawboticsLogo} fixed />}
    </Page>
  );
};

export default PageWrapper;
