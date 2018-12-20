import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate } from '~/utils/translation';
import PageWrapper from './PageWrapper';
import { TableType } from '../../TableEditor/types';


const tt = createTranslate('document.tables');
// const ta = createTranslate('table');


const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  address: {
    position: 'absolute',
    top: sv.baseMargin * -3,
    right: 0,
  },
  addressLabel: {
    color: sv.textTertiary,
    fontSize: 9,
    marginBottom: 1,
  },
});


const Address: React.SFC<{}> = () => {
  return (
    <View style={styles.address}>
      <Text style={styles.addressLabel}>DRAWBOTICS</Text>
      <Text style={styles.addressLabel}>Place Communale d'Auderghem, 8</Text>
      <Text style={styles.addressLabel}>1160 Brussels</Text>
      <Text style={styles.addressLabel}>TVA BE0666514417</Text>
      <Text style={styles.addressLabel}>+32 2 380 69 33</Text>
    </View>
  );
};


// const Table: React.SFC<{
//   table: TableType,
// }> = ({ table }) => {
//   const locale = getCurrentLocale();
//   const t = (k: string, alt?: string) => tt(locale, k, alt);
//   return (
//     <View style={styles.header}>
//
//     </View>
//   );
// };


const Tables: React.SFC<{
  tables: TableType[],
}> = ({ tables }) => {
  const locale = getCurrentLocale();
  console.log(tables);
  return (
    <PageWrapper title={tt(locale, 'title')}>
      <View style={styles.wrapper}>
        <Address />
      </View>
    </PageWrapper>
  );
};


export default Tables;
