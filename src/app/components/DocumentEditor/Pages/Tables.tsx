import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate, translate as t, createTranslateAlt } from '~/utils/translation';
import PageWrapper from './PageWrapper';
import { TableType, TableRowType, FooterRowType } from '../../TableEditor/types';


const tt = createTranslate('document.tables');
const ta = createTranslateAlt('table');


const rowHeight = 40;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  addresses: {
    position: 'absolute',
    top: sv.baseMargin * 3,
    right: sv.baseMargin * 2,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  address: {
    marginLeft: sv.baseMargin * 1.5,
  },
  addressLabel: {
    color: sv.textTertiary,
    fontSize: 9,
    marginBottom: 1,
  },
  table: {
    fontSize: 9,
    marginBottom: sv.baseMargin * 2,
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    textTransform: 'uppercase',
    color: sv.textPrimary,
    fontSize: 8,
    borderBottomWidth: 2,
    borderBottomColor: sv.primary,
    height: rowHeight / 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: rowHeight,
    paddingLeft: 3,
    paddingRight: sv.basePaddingSmall,
    paddingTop: 7,
    paddingBottom: 7,
    color: sv.textPrimary,
  },
  rowWithTopBorder: {
    borderTopColor: sv.grey300,
    borderTopWidth: 1,
  },
  rightAlign: {
    paddingRight: 0,
    justifyContent: 'flex-end',
  },
  comment: {
    marginLeft: sv.baseMarginSmall,
    fontFamily: 'OpenSans-Italic',
  },
  footers: {
    borderTopColor: sv.grey600,
    borderTopWidth: 2,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    color: sv.textPrimary,
    fontFamily: 'OpenSans-Bold',
    height: rowHeight,
  },
  footerTitle: {
    textTransform: 'uppercase',
    minWidth: 70,
  },
  footerComment: {
    flex: 1,
    paddingRight: sv.basePaddingSmall,
    fontSize: 10,
    textAlign: 'right',
    fontFamily: 'OpenSans',
    height: '100%',
    paddingTop: 13,
  },
  footerValue: {
    height: '100%',
    paddingTop: 12,
  },
  topBorder: {
    borderTopColor: sv.grey300,
    borderTopWidth: 1,
  },
  service: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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


const Addresses: React.SFC<{
  address: string | null,
}> = ({ address }) => {
  return (
    <View style={styles.addresses}>
      {address && <Text style={styles.addressLabel}>{address}</Text>}
      <Address />
    </View>
  );
};


const Row: React.SFC<{
  children: any,
  topBorder?: boolean,
  rightAlign?: boolean
}> = ({ children, topBorder, rightAlign }) => {
  return (
    <View style={[styles.row,
      topBorder ? styles.rowWithTopBorder : null,
      rightAlign ? styles.rightAlign : null,
    ]} wrap={false}>
      {children}
    </View>
  );
};


const Phases: React.SFC<{
  rows: TableRowType[],
}> = ({ rows }) => {
  const phases = rows.map((row) => row.phase);
  return (
    <View>
      {phases.map((label, i) => (
        <Row key={i} topBorder={!! label && i !== 0}>
          <Text>{label}</Text>
        </Row>
      ))}
    </View>
  );
};


const Services: React.SFC<{
  rows: TableRowType[],
}> = ({ rows }) => {
  const locale = getCurrentLocale();
  const services = rows.map((row) => ({
    name: row.service.name ? row.service.name : t(locale, `services.${row.service.id}.name`),
    comment: row.comment,
  }));
  return (
    <View>
      {services.map((service, i) => (
        <Row key={i} topBorder={i !== 0}>
          <View style={styles.service}>
            <Text>{service.name}</Text>
            <Text style={styles.comment}>{service.comment}</Text>
          </View>
        </Row>
      ))}
    </View>
  );
};


const Prices: React.SFC<{
  rows: TableRowType[],
}> = ({ rows }) => {
  const prices = rows.map((row) => row.price);
  return (
    <View>
      {prices.map((price, i) => (
        <Row key={i} topBorder={i !== 0} rightAlign>
          <Text>{price}</Text>
        </Row>
      ))}
    </View>
  );
};


const Footer: React.SFC<{
  footers: FooterRowType[],
}> = ({ footers }) => {
  return (
    <View style={styles.footers}>
      {footers.map((footer, i) => (
        <View key={i} style={styles.footer}>
          <Text style={styles.footerTitle}>{footer.label}</Text>
          <Text style={[styles.footerComment, i !== 0 && styles.topBorder ]}>{footer.comment}</Text>
          <Text style={[styles.footerValue, i !== 0 && styles.topBorder ]}>{footer.value}</Text>
        </View>
      ))}
    </View>
  );
};


const Table: React.SFC<{
  table: TableType,
}> = ({ table }) => {
  const locale = getCurrentLocale();
  const t = (k: string, alt?: string) => ta(locale, k, alt);
  const { header, body: rawBody, footers } = table;
  const body = rawBody.filter((row) => ! row.hidden);
  return (
    <View style={styles.table}>
      <View style={styles.columns}>
        <View style={styles.column}>
          <Text style={styles.title}>{t('phase', header.phase)}</Text>
          <Phases rows={body} />
        </View>
        <View style={[styles.column, { flex: 1 }]}>
          <Text style={styles.title}>{t('service', header.service)}</Text>
          <Services rows={body} />
        </View>
        <View style={styles.column}>
          <Text style={[styles.title, { paddingRight: 0 }]}>{t('price', header.price)}</Text>
          <Prices rows={body} />
        </View>
      </View>
      <Footer footers={footers} />
    </View>
  );
};


const Tables: React.SFC<{
  tables: TableType[],
  billingAddress: string | null,
  onPageRender: (p: number) => void,
}> = ({ tables, onPageRender, billingAddress }) => {
  const locale = getCurrentLocale();
  return (
    <PageWrapper title={tt(locale, 'title')} wrap extraComponent={<Addresses address={billingAddress} />} onPageRender={onPageRender}>
      <View style={styles.wrapper}>
        {tables.map((table, i) => (
          <Table key={i} table={table} />
        ))}
      </View>
    </PageWrapper>
  );
};


export default Tables;
