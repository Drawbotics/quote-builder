import React from 'react';
import { css, cx } from 'emotion';
import { ChevronDown } from 'react-feather';


export interface SelectOptionType {
  label: string
  value: any
}


const styles = {
  wrapper: css`
    position: relative;
    flex: 1;
    display: flex;
  `,
  select: css`
    flex: 1;
    border: none;
    background: none;
    width: 100%;
    outline: none;
    -webkit-appearance: none;
    -webkit-border-radius: 0px;
    padding: var(--padding);
    margin: calc(var(--padding) * -1);
    color: var(--text-primary);
    transition: color var(--transition-duration) ease-in-out;

    &:focus {
      box-shadow: inset 0px 0px 0px 2px var(--primary);
    }

    &:hover {
      cursor: inherit;
    }
  `,
  icon: css`
    position: absolute;
    right: var(--margin);
  `,
};


const Select: React.SFC<{
  value?: string,
  values: SelectOptionType[],
  onChange: (value: string, name: string) => void,
  placeholder?: string,
  className?: string,
  name?: string,
}> = ({
  value,
  values=[],
  onChange,
  placeholder,
  className,
  name,
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.icon}>
        <ChevronDown size={17} />
      </div>
      <select
        name={name}
        value={value ? value : ' -- '}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value, e.target.name)}
        className={styles.select}>
        {! value ? <option key={values.length} value=' -- '>{placeholder ? placeholder : '--'}</option> : null}
        {values && values.map((value, i) => (
          <option
            key={i}
            value={value.value}
            disabled={value.value === '_separator'}>
            {value.label}
          </option>
        ))}
      </select>
    </div>
  );
};


export default Select;
