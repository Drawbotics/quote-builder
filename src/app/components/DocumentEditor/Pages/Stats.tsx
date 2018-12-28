import React from 'react';
import { View, StyleSheet, Image, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';

import compass from '../images/icons/compass.png';
import globe from '../images/icons/globe.png';
import house from '../images/icons/house.png';
import order from '../images/icons/order-online.png';
import shadow from '../images/shadow.png';


const tt = createTranslate('document.stats');

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    marginTop: sv.baseMargin * 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stat: {
    position: 'relative',
    height: 120,
    width: 140,
    backgroundColor: sv.white,
    margin: sv.baseMargin,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: 'translateX(-15)',
    height: 30,
    width: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: sv.primary,
  },
  icon: {
    width: 20,
  },
  title: {
    color: sv.primary,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 25,
  },
  subtitle: {
    position: 'absolute',
    width: '100%',
    top: 60,
    padding: sv.basePaddingSmall,
    color: sv.textSecondary,
    fontSize: 9,
    textAlign: 'center',
  },
  shadow: {
    position: 'absolute',
    width: 200,
    bottom: -28,
    opacity: 0.2,
  },
});


const Stat: React.SFC<{
  icon: string,
  title: string,
  subtitle: string,
}> = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.stat}>
      <View style={styles.iconBox}>
        <Image style={styles.icon} src={icon} />
      </View>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
      <Image style={styles.shadow} src={shadow} />
    </View>
  );
};


const Stats: React.SFC<{
  contents: any,
}> = ({ contents }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => tt(locale, k, alt);
  return (
    <PageWrapper title="Drawbotics" subtitle={t('title')} description={t('description')}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Stat icon={order} title="1400+" subtitle={t('order_subtitle')} />
          <Stat icon={globe} title="30+" subtitle={t('global_subtitle')} />
        </View>
        <View style={[styles.row, { marginTop: sv.baseMargin }]}>
          <Stat icon={house} title="35 000+" subtitle={t('projects_subtitle')} />
          <Stat icon={compass} title="93" subtitle={t('artists_and_designers')} />
        </View>
      </View>
    </PageWrapper>
  );
};


export default Stats;
