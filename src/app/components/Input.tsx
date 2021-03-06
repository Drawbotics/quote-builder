import React, { Fragment } from 'react';
import { css, cx } from 'emotion';


const styles = {
  input: css`
    flex: 1;
    border-radius: var(--border-radius);
    background: var(--secondary);
    color: var(--text-primary);
    outline: none;
    border: 0;
    padding: calc(var(--padding) / 2);
    font-size: 0.9rem;
    transition: all var(--transition-duration) ease-in-out,
      box-shadow var(--transition-duration-short) ease-in-out;

    &:focus {
      box-shadow: 0px 0px 0px 2px var(--primary);
    }

    &::-webkit-scrollbar {
      width: initial;
      background-color: initial;
    }

    &::-webkit-scrollbar-thumb {
      background-color: initial;
    }
  `,
  textarea: css`
    resize: none;
    padding: var(--padding) calc(var(--padding) / 2);
  `,
  wrapper: css`
    display: flex;
    align-items: center;
  `,
  topLabel: css`
    flex-direction: column;
    align-items: stretch;

    & [data-element="label"] {
      margin-bottom: 5px;
    }
  `,
  label: css`
    margin-right: calc(var(--margin) / 2);
    font-weight: 600;
    color: var(--text-primary);
    transition: color var(--transition-duration) ease-in-out;
    font-size: 0.8rem;
  `,
  inputWrapper: css`
    margin-bottom: calc(var(--margin) / 2);
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
  onChange?: (v: string, n: string) => void,
  placeholder?: string,
  value?: string,
  name?: string,
  label?: string,
  area?: boolean,
  topLabel?: boolean,
}> = ({
  onChange,
  placeholder,
  value,
  label,
  area,
  name,
  topLabel=false,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if ( ! onChange) return;
    return onChange(e.target.value, e.target.name);
  };

  return (
    <div className={cx(styles.wrapper, { [styles.topLabel]: topLabel })}>
      {label ? <label htmlFor={name} className={styles.label} data-element="label">{label}</label> : null}
      {area ?
        <textarea style={{ minHeight: '200px' }} name={name} className={cx(styles.input, styles.textarea)} value={value} onChange={handleOnChange} placeholder={placeholder} />
        :
        <input type="text" name={name} className={styles.input} value={value} onChange={handleOnChange} placeholder={placeholder} />
      }
    </div>
  );
}


export default Input;
