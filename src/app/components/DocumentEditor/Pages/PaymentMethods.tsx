import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';

import sv from '../vars';
import { title, paragraph } from './styles';
import { getCurrentLocale } from '~/utils';
import { createTranslateAlt } from '~/utils/translation';
import PageWrapper from './PageWrapper';
import { PersonType } from '~/components/Person';
import BulletedText from './utils/BulletedText';


const tt = createTranslateAlt('document.payment_methods');

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
    paddingTop: 0,
  },
  title: { ...title, marginTop: 0 },
  paragraph: { ...paragraph, marginBottom: sv.baseMarginSmall + 5, marginTop: 10 },
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
    marginTop: 0,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  dot: {
    fontFamily: 'OpenSans',
    fontWeight: 800,
    color: sv.primary,
    background: sv.primary,
    height: 20,
    width: 20,
    marginLeft: 10,
    marginRight: -7,
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
    height: '75px',
    marginRight: sv.baseMargin,
  },
  contact: {
  },
  name: {
    fontSize: 9,
    fontFamily: 'OpenSans',
    fontWeight: 600,
    color: sv.textPrimary,
    marginBottom: 3,
  },
  role: {
    fontSize: 9,
    color: sv.textPrimary,
    marginBottom: 5,
  },
  contactRow: {
    fontSize: 9,
    color: sv.textPrimary,
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'OpenSans',
    fontWeight: 600,
    width: 10,
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
  contents: any,
  onPageRender: (p: number) => void,
}> = ({ profile, onPageRender, contents }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  return (
    <PageWrapper noPadding noPageNum onPageRender={onPageRender}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('title')}</Text>
          <Text style={styles.paragraph}>{t('paragraph1', contents.paragraph1)}</Text>
          <BulletedText>{t('bullet_points', contents.bulletPoints) || ''}</BulletedText>
          <Text style={styles.paragraph}>{t('paragraph2', contents.paragraph1)}</Text>
          <Text style={styles.websiteLink}>www.drawbotics.com</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Image style={styles.picture} src={profile.profilePicture} />
            <View style={styles.contact}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.role}>{profile.role}</Text>
              {profile.phone ?
                <View style={styles.contactRow}>
                  <Text style={styles.label}>P</Text>
                  <Text>{profile.phone}</Text>
                </View>
              : null}
              <View style={styles.contactRow}>
                <Text style={styles.label}>M</Text>
                <Text>{profile.mobile}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.label}>E</Text>
                <Text>{profile.email}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};


export default PaymentMethods;
