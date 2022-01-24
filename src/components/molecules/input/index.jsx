import { useEffect, useState } from 'react';

import { ErrorMessage } from 'components/atoms';

import styles from './styles.module.scss';

const { root, root__input, input_container, input_container__with_prefix } =
  styles;

// export type InputProps = {
//   type: 'text' | 'password' | 'email',
//   label?: string,
//   placeholder: string,
//   name: string,
//   value?: string,
//   onChange?: (value: string) => void,
//   hideLabel?: boolean,
//   readonly?: boolean,
//   disabled?: boolean,
//   suffixIcon?: any,
//   prefixIcon?: any,
//   onClick?: () => void,
//   number?: boolean,
//   withParser?: boolean,
//   rules?: {
//     validate?: () => void,
//     validation?: boolean,
//     message: string,
//   },
//   required?: boolean,
//   max?: number,
// };

const Input = (props) => {
  const {
    label,
    type, // text | password | email
    name,
    placeholder,
    value = '',
    onChange = (v) => {},
    hideLabel = false,
    readonly = false,
    disabled = false,
    suffixIcon = null,
    prefixIcon = null,
    onClick = null,
    number = false,
    withParser = false,
    rules = null, // {validate: func, validation: boolean, message: string}
    required = false,
    small = false,
    max = 0,
    transparent = false,
    ghost = false,
    textAlign = 'left', // left | center | right
  } = props;
  const [showValue, setShowValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (number && value && withParser) {
      const withoutCommas = value.replace(/,/gi, '');
      setShowValue(Number(withoutCommas).toLocaleString('en'));
    } else {
      setShowValue(value);
    }
  }, [value, number]);

  useEffect(() => {
    if (rules?.validate()) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    console.log('validation', rules?.validate?.(), rules?.validation);
  }, [rules, showValue]);

  return (
    <label className={root} style={{ cursor: onClick && 'pointer' }}>
      {label ? (
        <p style={{ visibility: hideLabel ? 'hidden' : 'visible' }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </p>
      ) : null}
      <div
        className={input_container}
        data-disabled={`${disabled}`}
        data-small={small}
        data-transparent={transparent}
        data-ghost={ghost}
      >
        {type === 'textarea' ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={showValue}
            readOnly={readonly}
            disabled={disabled}
            onClick={() => (onClick ? onClick() : null)}
            onFocus={() => setIsTouched(true)}
            onBlur={() => setIsTouched(false)}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        ) : (
          <>
            <div className={input_container__with_prefix}>
              {prefixIcon && <div>{prefixIcon}</div>}

              <input
                name={name}
                className={root__input}
                type={type}
                placeholder={placeholder}
                value={showValue}
                data-small={small}
                onChange={(e) => {
                  if (number) {
                    const regex = /^\d*[.]?\d*$/;
                    const withoutCommas = e.target.value.replace(/,/gi, '');
                    if (regex.test(withoutCommas)) {
                      if (max > 0 && Number(withoutCommas) >= Number(max)) {
                        return;
                      } else {
                        onChange(withoutCommas);
                        if (withParser) {
                          setShowValue(
                            Number(withoutCommas).toLocaleString('en')
                          );
                        } else {
                          setShowValue(withoutCommas);
                        }
                      }
                    } else {
                      return;
                    }
                  } else {
                    onChange(e.target.value);
                  }
                }}
                readOnly={readonly}
                disabled={disabled}
                onClick={() => (onClick ? onClick() : null)}
                onFocus={() => setIsTouched(true)}
                onBlur={() => setIsTouched(false)}
                style={{ textAlign }}
              />
            </div>

            {suffixIcon && <div>{suffixIcon}</div>}
          </>
        )}
      </div>
      {isError && isTouched && (
        <div style={{ marginTop: '0.4rem' }}>
          <ErrorMessage>{errorMessage || rules?.message}</ErrorMessage>
        </div>
      )}
    </label>
  );
};

export default Input;
