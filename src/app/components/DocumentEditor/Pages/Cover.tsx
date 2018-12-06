import React from 'react';
import { Page, View, StyleSheet, Image, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { translate as t } from '~/utils/translation';

import coverImage from '../images/cover.jpg';
import drawboticsLogo from '../images/logo.png';


interface ProjectType {
  clientLogo: string
  projectName: string
  companyName: string
  contactName: string
}


const styles = StyleSheet.create({
  page: {
    fontFamily: 'OpenSans-Light',
    backgroundColor: 'white',
  },
  coverImage: {
    width: '100%',
    height: 'auto',
  },
  content: {
    position: 'absolute',
    top: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    color: sv.textSecondary,
  },
  subtitle: {
    fontSize: 25,
    color: sv.textSecondary,
    marginTop: 10,
  },
  description: {
    fontSize: 17,
    color: sv.textSecondary,
    marginTop: 5,
  },
  clientLogo: {
    height: '100px',
    marginTop: sv.baseMarginSmall,
  },
  logo: {
    position: 'absolute',
    bottom: '-90px',
    left: '50%',
    width: '250px',
    transform: 'translate(-125px, 0)',
  },
});


const Cover: React.SFC<{
  project: ProjectType,
}> = ({ project }) => {
  return (
    <Page style={styles.page}>
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>{t(getCurrentLocale(), 'document.price_offer')}</Text>
          <Text style={styles.subtitle}>{project.projectName}</Text>
          <Text style={styles.description}>{project.contactName}</Text>
          <Image style={styles.clientLogo} src={project.clientLogo} />
        </View>
        <Image style={styles.coverImage} src={coverImage} />
        <Image style={styles.logo} src={drawboticsLogo} />
      </View>
    </Page>
  );
};


export default Cover;
