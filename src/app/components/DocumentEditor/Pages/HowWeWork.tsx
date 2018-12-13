import React from 'react';
import { View, StyleSheet, Image, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';

import studio from '../images/studio.png';
import screen from '../images/screen.png';
import rocket from '../images/rocket.png';
import phone from '../images/phone.png';


const tt = createTranslate('document.how_we_work');

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sv.baseMargin * 2,
  },
  section: {
    position: 'relative',
    height: '110px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reverse: {
    flexDirection: 'row-reverse',
    textAlign: 'right',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: sv.textTertiary,
    marginBottom: sv.baseMarginSmall - 3,
  },
  paragraph: {
    fontSize: 9,
    color: sv.textSecondary,
    lineHeight: 1.8,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    height: '40px',
    width: '2px',
    backgroundColor: sv.grey300,
    left: '50%',
    transform: 'translateX(-1px)',
  },
  image: {
    width: '60px',
    margin: sv.baseMargin,
    marginTop: 0,
  },
});


const Section: React.SFC<{
  title: string,
  paragraph: string,
  icon: string,
  reverse?: boolean,
  noLine?: boolean,
}> = ({ title, paragraph, icon, reverse, noLine }) => {
  return (
    <View style={[styles.section, reverse ? styles.reverse : null]}>
      <View style={styles.info} />
      <Image style={styles.image} src={icon} />
      {noLine ? null : <View style={styles.line} />}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.paragraph}>{paragraph}</Text>
      </View>
    </View>
  );
};


const HowWeWork: React.SFC<{
  contents: any,
}> = ({ contents }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  return (
    <PageWrapper title="Drawbotics" subtitle={t('subtitle')}>
      <View style={styles.wrapper}>
        <Section
          title={t('kickoff_title', contents.kickoffTitle)}
          paragraph={t('kickoff_description', contents.kickoffDescription)}
          icon={phone} />
        <Section
          title={t('followup_title', contents.followupTitle)}
          paragraph={t('followup_description', contents.followupDescription)}
          icon={screen}
          reverse />
        <Section
          title={t('correction_studio_title', contents.correctionStudioTitle)}
          paragraph={t('correction_studio_description', contents.correctionStudioDescription)}
          icon={studio} />
        <Section
          title={t('launch_title', contents.launchTitle)}
          paragraph={t('launch_description', contents.launchDescription)}
          icon={rocket}
          reverse
          noLine />
      </View>
    </PageWrapper>
  );
};


export default HowWeWork;
