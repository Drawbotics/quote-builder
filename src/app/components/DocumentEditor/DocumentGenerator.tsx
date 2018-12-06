import React from 'react';
import { Page, Text, View, Document as PDFDocument, StyleSheet, Font } from '@react-pdf/renderer';
import { remote } from 'electron';


// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'OpenSans',
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
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Regular.ttf`,
  { family: 'OpenSans' },
);


// Create Document Component
const DocumentGenerator = () => (
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


export default DocumentGenerator;
