import React from 'react';
import { Document as PDFDocument, Font } from '@react-pdf/renderer';
import { remote } from 'electron';

import { Cover } from './Pages';


Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Regular.ttf`,
  { family: 'OpenSans' },
);


const DocumentGenerator = ({ document }: { document: any }) => {
  console.log(document);
  return (
    <PDFDocument>
      <Cover />
      {/* <Page style={styles.page}>
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
      </Page>
      <Page>
        <View style={styles.section}>
          <Text>Section #4</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page> */}
    </PDFDocument>
  );
}


export default DocumentGenerator;
