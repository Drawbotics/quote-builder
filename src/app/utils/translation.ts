import { get } from 'lodash';
import locales from '../locales';


function _replaceData(string: any, data={}) {
  if (typeof string === 'object') {
    // It's because we have a multiple string { one: '', other: '' }
    // Get count from data
    const count = get(data, 'count');
    string = count === 1 ? get(string, 'one', '') : get(string, 'other', '');
  }
  if (typeof string === 'number') {
    string = string.toString();
  }
  if ( ! string) {
    return null;
  }
  const result = string.split(/(%\{[^}]*\})/)
    .map((fragment: string, i: number, array: string[]) => {
      const match = fragment.match(/%\{(.*)\}/);
      if ( ! match) {
        return fragment;
      }
      const key = match[1];
      return data[key];
    })
    .map((replacement: any, i: number) => {
      if ( ! replacement) {
        return '';
      }
      return replacement.hasOwnProperty('key') && replacement.key == null ? { ...replacement, key: i } : replacement;
    });
  return result;
}


function _translate(locale: string, key: string, data: string, defaultValue: string | undefined) {
  const value = _replaceData(get(locales[locale], key, defaultValue), data);
  if ( ! value) {
    console.warn(`Translation key '${key}' not found`);
    return '';
  }
  return value;
}


export function translate(locale: string, base: string, key: string, data: any, defaultValue?: string | undefined) {
  let translationKey = '';
  if (arguments.length === 1) {
    translationKey = base;
  }
  if (arguments.length === 2) {
    translationKey = base;
    defaultValue = key && (typeof key === 'string') ? key : undefined;
    data = key && (typeof key === 'object') ? key : {};
  }
  if (arguments.length === 3) {
    translationKey = base.replace(/\.$/, '') + '.' + key;
    defaultValue = data && (typeof data === 'string') ? data : undefined;
    data = data && (typeof data === 'object') ? data : {};
  }
  if (arguments.length >= 3) {
    translationKey = base.replace(/\.$/, '') + '.' + key;
  }
  return _translate(locale, translationKey, data, defaultValue);
}


export function createTranslate(locale: string, base: string) {
  return (key: string, data: any, defaultValue: string | undefined) => {
    if ( ! data && defaultValue) {
      return translate(locale, base, key, defaultValue);
    }
    if ( ! defaultValue && data) {
      return translate(locale, base, key, data);
    }
    return translate(locale, base, key, data, defaultValue);
  };
}


export default translate;
