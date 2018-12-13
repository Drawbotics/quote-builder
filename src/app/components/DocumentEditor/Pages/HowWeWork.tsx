import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

// import sv from '../vars';
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
    height: '500px',
  },
});


const HowWeWork: React.SFC<{}> = () => {
  const locale = getCurrentLocale().toLowerCase();
  console.log(locale);
  return (
    <PageWrapper title="Drawbotics" subtitle="How we work">
      <View style={styles.wrapper}>
        <View style={styles.content}>

        </View>
      </View>
    </PageWrapper>
  );
};


export default HowWeWork;
