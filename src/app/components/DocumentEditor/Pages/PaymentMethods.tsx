import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';
import { PersonType } from '~/components/Person';


const tt = createTranslate('document.payment_methods');

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    flex: 1,
    width: '100%',
    padding: sv.basePadding * 3,
    paddingTop: sv.basePadding,
  },
  title: {
    fontSize: 15,
    color: sv.textTertiary,
    marginBottom: sv.baseMarginSmall - 3,
  },
  paragraph: {
    fontSize: 9,
    color: sv.textSecondary,
    lineHeight: 1.8,
    marginBottom: sv.baseMarginSmall,
  },
  websiteLink: {
    position: 'absolute',
    bottom: sv.baseMargin,
    width: '100%',
    left: sv.basePadding * 3,
    textAlign: 'center',
    fontSize: 8,
    color: sv.textSecondary,
  },
  line: {
    marginBottom: 5,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  dot: {
    fontSize: 30,
    color: sv.primary,
    height: 20,
    width: 20,
    marginTop: -13,
  },
  lineContent: {
  },
  footer: {
    height: '300px',
    width: '100%',
    backgroundColor: sv.grey50,
  },
  footerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: sv.baseMargin * 2,
  },
  picture: {
    height: '70px',
    marginRight: sv.baseMargin,
  },
  contact: {
  },
  name: {
    fontSize: 9,
    fontFamily: 'OpenSans-SemiBold',
    color: sv.textPrimary,
    marginBottom: 3,
  },
  role: {
    fontSize: 9,
    color: sv.textPrimary,
  },
  contactRow: {
    fontSize: 9,
    color: sv.textPrimary,
    marginTop: 5,
  },
});


const Line: React.SFC<{
  children: string,
}> = ({ children }) => {
  return (
    <View style={[styles.paragraph, styles.line]}>
      <View style={styles.dot}><Text>&bull;</Text></View>
      <Text style={styles.lineContent}>{children}</Text>
    </View>
  );
};


const PaymentMethods: React.SFC<{
  profile: PersonType,
}> = ({ profile }) => {
  const locale = getCurrentLocale();
  const t = (k: string) => tt(locale, k);
  return (
    <PageWrapper noPadding noPageNum>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('title')}</Text>
          <Text style={styles.paragraph}>{t('paragraph1')}</Text>
          <Line>{t('line1')}</Line>
          <Line>{t('line2')}</Line>
          <Text style={styles.paragraph}>{t('paragraph2')}</Text>
          <Text style={styles.websiteLink}>www.drawbotics.com</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Image style={styles.picture} src={profile.profilePicture} />
            <View style={styles.contact}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.role}>{profile.role}</Text>
              <Text style={styles.contactRow}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>P </Text>
                {profile.phone}
              </Text>
              <Text style={styles.contactRow}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>M </Text>
                {profile.mobile}
              </Text>
              <Text style={styles.contactRow}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>E </Text>
                {profile.email}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};


export default PaymentMethods;
