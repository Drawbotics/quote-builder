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


Font.register({ family: 'OpenSans', fonts: [
 { src: `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Regular.ttf` },
 { src: `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-SemiBold.ttf`, fontWeight: 600 },
 { src: `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Bold.ttf`, fontWeight: 800 },
 { src: `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-Light.ttf`, fontWeight: 300 },
 { src: `http://localhost:${remote.getGlobal('_serverPort')}/fonts/OpenSans-LightItalic.ttf`, fontWeight: 300, fontStyle: 'italic' },
]});


// Font.registerHyphenationCallback((words: string[]) => (
//   words.map((word: string) => [word])
// ));


interface SectionType {
  id: string
  type: string
  contents?: any
}


interface DataType {
  language: string
  person: PersonType
  project: ProjectType
  tables: TableType[]
}


function sectionsToComponents(sections: SectionType[], data: DataType, onPageRender: (s: SectionType, pn: number) => void) {
  return sections.map((section, i) => {
    const { type, id } = section;
    const contents = section.contents || {};
    switch(type) {
      case 'cover': {
        return <Cover key={i} project={data.project} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'profile': {
        return <Profile key={i} profile={data.person} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'stats': {
        return <Stats key={i} contents={contents} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'howWeWork': {
        return <HowWeWork key={i} contents={contents} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'whatWeDo': {
        return <WhatWeDo key={i} contents={contents} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'project': {
        return <Project key={i} contents={contents} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'storyTelling': {
        return <StoryTelling key={i} contents={contents} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'products': {
        return <Services key={i} contents={contents} tables={data.tables} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'tables': {
        return <Tables key={i} tables={data.tables} billingAddress={data.project.billingAddress} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      case 'paymentMethods': {
        return <PaymentMethods key={i} contents={contents} profile={data.person} onPageRender={(page: number) => onPageRender({ type, id }, page)} />
      }
      default: {
        console.warn(`No equivalent component for section of type ${type}`);
        return undefined;
      }
    }
  }).filter((c) => c !== undefined);
}


const DocumentGenerator = ({ document, onPageRender }: { document: any, onPageRender: (s: SectionType, pn: number) => void }) => {
  const { data, sections } = document;
  const components = sectionsToComponents(sections, data, onPageRender);
  return (
    <PDFDocument>
      {...components}
    </PDFDocument>
  );
}


export default DocumentGenerator;
