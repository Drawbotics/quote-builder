import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';

import { PersonType } from '~/components/Person';
import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import PageWrapper from './PageWrapper';


const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300,
  },
  quote: {
    fontFamily: 'OpenSans',
    fontStyle: 'italic',
    color: sv.textSecondary,
    fontSize: 23,
    textAlign: 'center',
  },
  name: {
    fontFamily: 'OpenSans',
    fontWeight: 600,
    fontSize: 11,
    textTransform: 'uppercase',
    marginTop: sv.baseMarginSmall,
    color: sv.textPrimary,
  },
  image: {
    marginTop: sv.baseMargin,
    height: 140,
    width: 140,
  },
  description: {
    marginTop: sv.baseMargin,
    fontSize: 10,
    color: sv.textSecondary,
    lineHeight: 2,
    textAlign: 'justify',
  },
  signature: {
    marginTop: sv.baseMargin,
    width: 100,
  },
  fullName: {
    fontFamily: 'OpenSans',
    fontWeight: 600,
    fontSize: 9,
    marginTop: sv.baseMarginSmall,
    color: sv.textPrimary,
  },
  role: {
    marginTop: 5,
    color: sv.textSecondary,
    fontSize: 9,
  },
});


const Profile: React.SFC<{
  profile: PersonType,
  onPageRender: (p: number) => void,
}> = ({ profile, onPageRender }) => {
  const locale = getCurrentLocale().toLowerCase();
  return (
    <PageWrapper onPageRender={onPageRender}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.quote}>{`"${profile.quotes[locale]}"`}</Text>
          <Text style={styles.name}>{profile.name.split(' ')[0]}</Text>
          <Image style={styles.image} src={profile.profilePicture} />
          <Text style={styles.description}>{profile.descriptions[locale]}</Text>
          <Image style={styles.signature} src={profile.signature} />
          <Text style={styles.fullName}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role}</Text>
        </View>
      </View>
    </PageWrapper>
  );
};


export default Profile;
