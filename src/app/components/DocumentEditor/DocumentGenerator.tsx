import React from 'react';
import { Document as PDFDocument, Font } from '@react-pdf/renderer';
import { remote } from 'electron';

import { Cover, Profile } from './Pages';


Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Regular.ttf`,
  { family: 'OpenSans' },
);

Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-SemiBold.ttf`,
  { family: 'OpenSans-SemiBold' },
);

Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Light.ttf`,
  { family: 'OpenSans-Light' },
);

Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-LightItalic.ttf`,
  { family: 'OpenSans-Italic' },
);


const DocumentGenerator = ({ document }: { document: any }) => {
  const { data } = document;
  // console.log(data);
  return (
    <PDFDocument>
      <Cover project={data.project} />
      <Profile profile={data.person} />
    </PDFDocument>
  );
}


export default DocumentGenerator;
