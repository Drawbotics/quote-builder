import * as React from 'react';
import { css } from 'emotion';

import Title from '../components/Title';
import Button from '../components/Button';
import QuoteCard from '../components/QuoteCard';


const styles = {
  quotes: css`
    padding: calc(var(--padding) * 3);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(var(--margin) * 2);
  `,
  actions: css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
  action: css`
    margin-right: var(--margin);

    &:last-child {
      margin-right: 0;
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: var(--margin);
    row-gap: var(--margin);
  `,
  cell: css`
  `,
};

class Quotes extends React.Component {
  render() {
    const quotes = [0, 0, 0, 0];
    return (
      <div className={styles.quotes}>
        <div className={styles.header}>
          <Title>
            My quotes
          </Title>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button>
                New quote
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {quotes.map((quote, i) => (
            <div key={i} className={styles.cell}>
              <QuoteCard draft={false} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default Quotes;
