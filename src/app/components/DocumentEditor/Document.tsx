import React from 'react';
import { Page, Text, View, Document as PDFDocument, StyleSheet, Font } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Oswald',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});


Font.register(
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  { family: 'Oswald' },
);


// Create Document Component
const Document = () => (
  <PDFDocument>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Section #4</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </PDFDocument>
);


export default Document;
