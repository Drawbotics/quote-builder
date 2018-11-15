import Client from './Client';
import CompanyLogo from './CompanyLogo';
import Language from './Language';
import Sales from './Sales';
import OfferTable from './OfferTable';


export interface QuestionType {
  title: string
  component: React.ComponentType
}


export default [
  {
    title: 'Who is your client?',
    component: Client,
  },
  {
    title: 'Import the company logo',
    component: CompanyLogo,
  },
  {
    title: 'Choose the language',
    component: Language,
  },
  {
    title: 'Choose your sales',
    component: Sales,
  },
  {
    title: 'Fill in your quote',
    component: OfferTable,
  },
];
