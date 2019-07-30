import React from 'react';
import { Page, View, StyleSheet, Image, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { translate as t } from '~/utils/translation';
import { ProjectType } from '../../DocumentBoostrap';

import coverImage from '../images/cover.jpg';
import drawboticsLogo from '../images/logo.png';


const styles = StyleSheet.create({
  page: {
    position: 'relative',
    fontFamily: 'OpenSans',
    fontWeight: 300,
    backgroundColor: 'white',
  },
  coverImage: {
    width: '100%',
    height: 'auto',
  },
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  content: {
    position: 'absolute',
    left: '0px',
    top: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: sv.textSecondary,
  },
  subtitle: {
    fontSize: 20,
    color: sv.textSecondary,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: sv.textSecondary,
    marginTop: 5,
  },
  clientLogo: {
    maxHeight: '100px',
    maxWidth: '150px',
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
  onPageRender: (p: number) => void,
}> = ({ project, onPageRender }) => {
  return (
    <Page style={styles.page} wrap={false}>
      <View style={styles.wrapper}>
        <Image style={styles.coverImage} src={coverImage} />
        <View style={styles.content}>
          <Text style={styles.title}>{t(getCurrentLocale(), 'document.price_offer')}</Text>
          <Text style={styles.subtitle}>{project.projectName}</Text>
          <Text style={styles.description}>{project.contactName}</Text>
          {project.clientLogo ?
            <Image style={styles.clientLogo} src={project.clientLogo} />
          : null}
        </View>
        <Image style={styles.logo} src={drawboticsLogo} />
      </View>
      <Text render={({ pageNumber }: { pageNumber: number }) => onPageRender(pageNumber)} />
    </Page>
  );
};


export default Cover;
