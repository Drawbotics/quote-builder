import React from 'react';
import { Document as PDFDocument, Font } from '@react-pdf/renderer';
import { remote } from 'electron';

import {
  Cover,
  Profile,
  HowWeWork,
  WhatWeDo,
  PaymentMethods,
  Stats,
  Project,
  StoryTelling,
} from './Pages';
import { TableType } from '../TableEditor/types';
import { PersonType } from '../Person';
import { ProjectType } from '../DocumentBoostrap';


Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Regular.ttf`,
  { family: 'OpenSans' },
);

Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-SemiBold.ttf`,
  { family: 'OpenSans-SemiBold' },
);

Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Bold.ttf`,
  { family: 'OpenSans-Bold' },
);

Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Light.ttf`,
  { family: 'OpenSans-Light' },
);

Font.register(
  `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-LightItalic.ttf`,
  { family: 'OpenSans-Italic' },
);

Font.registerHyphenationCallback((words: string[]) => (
  words.map((word: string) => [word])
));


interface SectionType {
  type: string
  contents: any
}


interface DataType {
  language: string
  person: PersonType
  project: ProjectType
  tables: TableType[]
}


// @ts-ignore:
function sectionsToComponents(sections: SectionType[], data: DataType) {
  return sections.map((section, i) => {
    switch(section.type) {
      case 'cover': {
        return <Cover key={i} project={data.project} />
      }
      case 'profile': {
        return <Profile key={i} profile={data.person} />
      }
      case 'howWeWork': {
        return <HowWeWork key={i} contents={section.contents} />
      }
      case 'whatWeDo': {
        return <WhatWeDo key={i} contents={section.contents} />
      }
      case 'project': {
        return <Project key={i} contents={section.contents} />
      }
      case 'storyTelling': {
        return <StoryTelling key={i} contents={section.contents} />
      }
      default: {
        console.warn(`No equivalent component for section of type ${section.type}`);
        return '';
      }
    }
  }).filter((c) => c !== '');
}


const DocumentGenerator = ({ document }: { document: any }) => {
  const { data } = document;
  // const components = sectionsToComponents(sections, data);
  return (
    <PDFDocument>
      <StoryTelling contents={{}} />
      <Cover project={data.project} />
      <Profile profile={data.person} />
      <Stats contents={{}} />
      <WhatWeDo contents={{}} />
      <HowWeWork contents={{}} />
      <Project contents={{}} />
      <PaymentMethods profile={data.person} />
    </PDFDocument>
  );
  // TODO: plug like below once we have all templates
  // return (
  //   <PDFDocument>
  //     {...components}
  //   </PDFDocument>
  // );
}


export default DocumentGenerator;
