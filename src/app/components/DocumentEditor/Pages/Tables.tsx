import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import autobind from 'autobind-decorator';

import sv from '../vars';
import { getCurrentLocale } from '~/utils';
import { createTranslate, translate as t, createTranslateAlt } from '~/utils/translation';
import PageWrapper from './PageWrapper';
import { TableType, TableRowType, FooterRowType } from '../../TableEditor/types';
import { countLinesInString } from '../utils';

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
  column: {},
  title: {
    fontFamily: 'OpenSans',
    fontWeight: 800,
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
    alignItems: 'flex-start',
    // height: 35,
    paddingLeft: 3,
    paddingRight: sv.basePaddingSmall,
    paddingTop: 10,
    paddingBottom: 10,
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
    fontFamily: 'OpenSans',
    fontStyle: 'italic',
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
    fontFamily: 'OpenSans',
    fontWeight: 800,
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
  validWrapper: {
    marginTop: -60,
  },
  validUntil: {
    fontSize: 10,
    textAlign: 'right',
    fontFamily: 'OpenSans',
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
  address: string | null;
}> = ({ address }) => {
  return (
    <View style={styles.addresses}>
      {address && <Text style={styles.addressLabel}>{address}</Text>}
      <Address />
    </View>
  );
};

const Row: React.SFC<{
  children: any;
  topBorder?: boolean;
  rightAlign?: boolean;
  height?: number;
}> = ({ children, topBorder, rightAlign, height = 0 }) => {
  const heightStyle = height > 0 ? { height: height, paddingBottom: 0 } : null;
  // console.log(heightStyle);
  return (
    <View
      style={[
        styles.row,
        topBorder ? styles.rowWithTopBorder : null,
        rightAlign ? styles.rightAlign : null,
        heightStyle,
      ]}
      wrap={false}>
      {children}
    </View>
  );
};

const Phases: React.SFC<{
  rows: TableRowType[];
  heights: { [key: number]: number };
}> = ({ rows, heights }) => {
  const phases = rows.map((row) => row.phase);
  return (
    <View>
      {phases.map((label, i) => (
        <Row key={i} topBorder={!!label && i !== 0} height={heights[i]}>
          <Text style={{ fontFamily: 'OpenSans', fontWeight: 600 }}>{label}</Text>
        </Row>
      ))}
    </View>
  );
};

const Services: React.SFC<{
  rows: TableRowType[];
  heights: { [key: number]: number };
}> = ({ rows, heights }) => {
  const locale = getCurrentLocale();
  const services = rows.map((row) => ({
    name: row.service.name ? row.service.name : t(locale, `services.${row.service.id}.name`),
    comment: row.comment,
  }));
  return (
    <View>
      {services.map((service, i) => (
        <Row key={i} topBorder={i !== 0} height={heights[i]}>
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
  rows: TableRowType[];
  heights: { [key: number]: number };
}> = ({ rows, heights }) => {
  const prices = rows.map((row) => row.price);
  return (
    <View>
      {prices.map((price, i) => (
        <Row key={i} topBorder={i !== 0} rightAlign height={heights[i]}>
          <Text>{price}</Text>
        </Row>
      ))}
    </View>
  );
};

const Footer: React.SFC<{
  footers: FooterRowType[];
}> = ({ footers }) => {
  return (
    <View style={styles.footers}>
      {footers.map((footer, i) => (
        <View key={i} style={styles.footer}>
          <Text style={styles.footerTitle}>{footer.label}</Text>
          <Text style={[styles.footerComment, i !== 0 && styles.topBorder]}>{footer.comment}</Text>
          <Text style={[styles.footerValue, i !== 0 && styles.topBorder]}>{footer.value}</Text>
        </View>
      ))}
    </View>
  );
};

class Table extends React.Component<{
  table: TableType;
}> {
  state = {
    rowHeights: {},
  };

  componentWillMount() {
    this._setRowHeight();
  }

  render() {
    const { rowHeights } = this.state;
    const { table } = this.props;
    const locale = getCurrentLocale();
    const t = (k: string, alt?: string) => ta(locale, k, alt);
    const { header, body: rawBody, footers } = table;
    const body = rawBody.filter((row) => !row.hidden);
    return (
      <View style={styles.table}>
        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.title}>{t('phase', header.phase)}</Text>
            <Phases rows={body} heights={rowHeights} />
          </View>
          <View style={[styles.column, { flex: 1 }]}>
            <Text style={styles.title}>{t('service', header.service)}</Text>
            <Services rows={body} heights={rowHeights} />
          </View>
          <View style={styles.column}>
            <Text style={[styles.title, { paddingRight: 0 }]}>{t('price', header.price)}</Text>
            <Prices rows={body} heights={rowHeights} />
          </View>
        </View>
        <Footer footers={footers} />
      </View>
    );
  }

  @autobind
  _setRowHeight() {
    const { table } = this.props;
    const { body: rawBody } = table;
    const body = rawBody.filter((row) => !row.hidden);
    const rowHeights = body.reduce((heights, row, index) => {
      if (!row.hidden) {
        const commentRows = countLinesInString(row.comment || '');
        if (commentRows > 1) {
          return { ...heights, [index]: commentRows * 13 + 30 - commentRows * 2 };
        } else {
          return { ...heights, [index]: 35 };
        }
      }
      return heights;
    }, {});
    this.setState({ rowHeights });
  }
}

const Tables: React.SFC<{
  tables: TableType[];
  billingAddress: string | null;
  validUntil?: string;
  onPageRender: (p: number) => void;
}> = ({ tables, onPageRender, billingAddress, validUntil }) => {
  const locale = getCurrentLocale();
  return (
    <PageWrapper
      title={tt(locale, 'title')}
      extraComponent={<Addresses address={billingAddress} />}
      onPageRender={onPageRender}>
      <View style={styles.wrapper}>
        {tables.map((table, i) => (
          <Table key={i} table={table} />
        ))}
      </View>
      {validUntil != null && validUntil !== '' ? (
        <View style={styles.validWrapper}>
          <Text style={styles.validUntil}>{`*${tt(locale, 'valid_until')}: ${validUntil}`}</Text>
        </View>
      ) : (
        undefined
      )}
    </PageWrapper>
  );
};

export default Tables;
