import { omit } from 'lodash';

import { save, load } from './index';


export async function savePerson(path: string, value: any) {
  return await save('people', path, value);
}


export async function loadPeople() {
  return await load('people');
}


export async function deletePerson(path: string) {
  const people = await loadPeople();
  return await save('people', null, omit(people, [path]));
}


export async function loadPerson(path: string) {
  return await load('people', path);
}
