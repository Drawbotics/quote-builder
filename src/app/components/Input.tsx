import React, { Fragment } from 'react';
import { css } from 'emotion';


const styles = {
  input: css`
    border-radius: var(--border-radius);
    background: var(--secondary);
    color: var(--text-primary);
    outline: none;
    border: 0;
    padding: calc(var(--padding) / 2);
    width: 100%;
    font-size: 0.9rem;
    transition: all var(--transition-duration) ease-in-out,
      box-shadow var(--transition-duration-short) ease-in-out;

    &:focus {
      box-shadow: 0px 0px 0px 1px var(--primary);
    }
  `,
  inputWrapper: css`
    margin-bottom: var(--margin);
  `,
}


export const InputGroup: React.SFC<{
  children: React.ReactNode,
}> = ({
  children,
}) => {
  return (
    <Fragment>
      {React.Children.map(children, (child) => (
        <div className={styles.inputWrapper}>
          {child}
        </div>
      ))}
    </Fragment>
  );
}


const Input: React.SFC<{
  onChange: (v: string, n: string) => void,
  placeholder?: string,
  value?: string,
  name?: string,
}> = ({
  onChange,
  placeholder,
  value,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ( ! onChange) return;
    return onChange(e.target.value, e.target.name);
  };

  return (
    <input name={name} className={styles.input} value={value} onChange={handleOnChange} placeholder={placeholder} />
  );
}


export default Input;
