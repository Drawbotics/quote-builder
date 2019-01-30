import get from 'lodash/get';
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
  return result[0];
}


function _translate(locale: string, key: string, data: string, defaultValue: string | undefined) {
  const value = _replaceData(get(locales[locale], key, defaultValue), data);
  if ( ! value) {
    // TODO re-enable this
    // console.warn(`Translation key '${key}' for locale '${locale}' not found`);
    return '';
  }
  return value;
}


export function translate(locale: string, base: string, key?: string, data?: any, defaultValue?: string | undefined) {
  let translationKey = '';
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
  if (arguments.length >= 4) {
    translationKey = key ? base.replace(/\.$/, '') + '.' + key : base;
  }
  return _translate(locale, translationKey, data, defaultValue);
}


export function createTranslate(base: string) {
  return (locale: string, key: string, alt?: string | undefined) => {
    if (alt) {
      return translate(locale, base, key, undefined, alt);
    }
    return translate(locale, base, key);
  };
}


export function translateAlt(locale: string, base: string, alt: string | undefined, key?: string | undefined) {
  return alt ? alt : translate(locale, base, key, undefined, alt);
}


export function createTranslateAlt(base: string) {
  return (locale: string, key: string, alt?: string | undefined) => translateAlt(locale, base, alt, key);
}


export default translate;
