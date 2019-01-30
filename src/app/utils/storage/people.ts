import omit from 'lodash/omit';

import { save, load } from './index';


export async function savePerson(id: string, value: any) {
  return await save('people', id, value);
}


export async function loadPeople() {
  return await load('people');
}


export async function deletePerson(id: string) {
  const people = await loadPeople();
  return await save('people', null, omit(people, [id]));
}


export async function loadPerson(id: string) {
  return await load('people', id);
}
