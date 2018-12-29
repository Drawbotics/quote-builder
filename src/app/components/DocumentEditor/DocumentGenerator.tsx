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
  Tables,
  Services,
} from './pages';
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


function sectionsToComponents(sections: SectionType[], data: DataType, onPageRender: (s: string, pn: number) => void) {
  return sections.map((section, i) => {
    const contents = section.contents || {};
    switch(section.type) {
      case 'cover': {
        return <Cover key={i} project={data.project} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'profile': {
        return <Profile key={i} profile={data.person} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'stats': {
        return <Stats key={i} contents={contents} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'howWeWork': {
        return <HowWeWork key={i} contents={contents} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'whatWeDo': {
        return <WhatWeDo key={i} contents={contents} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'project': {
        return <Project key={i} contents={contents} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'storyTelling': {
        return <StoryTelling key={i} contents={contents} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'products': {
        return <Services key={i} contents={contents} tables={data.tables} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'tables': {
        return <Tables key={i} tables={data.tables} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      case 'paymentMethods': {
        return <PaymentMethods key={i} profile={data.person} onPageRender={(page: number) => onPageRender(section.type, page)} />
      }
      default: {
        console.warn(`No equivalent component for section of type ${section.type}`);
        return undefined;
      }
    }
  }).filter((c) => c !== undefined);
}


const DocumentGenerator = ({ document, onPageRender }: { document: any, onPageRender: (s: string, pn: number) => void }) => {
  const { data, sections } = document;
  // @ts-ignore
  const components = sectionsToComponents(sections, data, onPageRender);
  // return (
  //   <PDFDocument>
  //     <Cover project={data.project} onPageRender={(page: number) => onPageRender('cover', page)} />
  //     <Profile profile={data.person} onPageRender={(page: number) => onPageRender('profile', page)} />
  //     <Stats contents={{}} onPageRender={(page: number) => onPageRender('stats', page)} />
  //     <WhatWeDo contents={{}} onPageRender={(page: number) => onPageRender('whatWeDo', page)} />
  //     <HowWeWork contents={{}} onPageRender={(page: number) => onPageRender('howWeWork', page)} />
  //     <Project contents={{}} onPageRender={(page: number) => onPageRender('project', page)} />
  //     <StoryTelling contents={{}} onPageRender={(page: number) => onPageRender('storyTelling', page)} />
  //     <Services contents={sections.find((s: any) => s.type === 'products').contents} tables={data.tables} onPageRender={(page: number) => onPageRender('products', page)} />
  //     <Tables tables={data.tables} onPageRender={(page: number) => onPageRender('tables', page)} />
  //     <PaymentMethods profile={data.person} onPageRender={(page: number) => onPageRender('paymentMethods', page)} />
  //   </PDFDocument>
  // );
  // TODO: plug like below once we have all templates
  return (
    <PDFDocument>
      {...components}
    </PDFDocument>
  );
}


export default DocumentGenerator;
