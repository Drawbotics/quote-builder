import React from 'react';
import { Document as PDFDocument, Font } from '@react-pdf/renderer';
import { remote } from 'electron';

import { Cover } from './Pages';


Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Regular.ttf`,
  { family: 'OpenSans' },
);

Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Light.ttf`,
  { family: 'OpenSans-Light' },
);


const DocumentGenerator = ({ document }: { document: any }) => {
  const { data } = document;
  return (
    <PDFDocument>
      <Cover project={data.project} />
    </PDFDocument>
  );
}


export default DocumentGenerator;
