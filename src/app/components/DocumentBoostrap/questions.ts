import Client from './Client';
import CompanyLogo from './CompanyLogo';
import Language from './Language';
import Sales from './Sales';
import OfferTable from './OfferTable';


export interface QuestionType {
  title: string
  component: any  // dont really know what type this should be to make it work
}


export default [
  {
    slug: 'client',
    title: 'Who is your client?',
    component: Client,
  },
  {
    slug: 'logo',
    title: 'Import the company logo',
    component: CompanyLogo,
  },
  {
    slug: 'language',
    title: 'Choose the language',
    component: Language,
  },
  {
    slug: 'sales',
    title: 'Choose your sales',
    component: Sales,
  },
  {
    slug: 'quote',
    title: 'Fill in your quote',
    component: OfferTable,
  },
];
