import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import sv from '../../vars';
import { paragraph } from '../styles';


function getSectionsFromText(text: string) {
  const sections = text.split('\n').filter((s) => /\S/.test(s));
  return sections.map((string) => string.includes('- ') ? { type: 'line', value: string.replace('-', '') } : { type: 'text', value: string });
}


const styles = StyleSheet.create({
  paragraph: paragraph,
  line: {
    marginBottom: 5,
    marginTop: 0,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    lineHeight: 1.5,
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


const BulletedText: React.SFC<{
  children: string,
}> = ({ children }) => {
  const sections = getSectionsFromText(children);
  return (
    <Fragment>
      {sections.map((section, i) => (
        section.type === 'text' ? <Text key={i} style={styles.paragraph}>{section.value}</Text> : <Line key={i}>{section.value}</Line>
      ))}
    </Fragment>
  );
};


export default BulletedText;
