import * as React from 'react';
import { css } from 'emotion';

import Title from '../components/Title';
import Button from '../components/Button';


const styles = {
  quotes: css`
    padding: calc(var(--padding) * 3);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
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
};

class Quotes extends React.Component {
  render() {
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
      </div>
    );
  }
}


export default Quotes;
