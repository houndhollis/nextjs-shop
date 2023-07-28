import styles from './Input.module.scss';
import classNames from 'classnames';

import React from 'react';
import Icon from '../Icon/Icon';

const Input = ({
  id,
  label,
  name = '',
  labelVisible,
  icon,
  email,
  password,
  placeholder = '',
  readOnly,
  disabled,
  value,
  error: errorProp,
  className = '',
  onChange,
  ...resProps
}) => {

  const [inputValue , setInputValue] = React.useState(value ? value : '');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const onCheckType = () => {
    if (email) return 'email';

    if (password) return isPasswordVisible ? 'text' : 'password';

    return 'text'
  }

  const onHandleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event);
  }

  const iconType = isPasswordVisible ? 'show' : 'hide';
  const iconLabel = `비밀번호 ${isPasswordVisible ? '표시' : '감춤'}`

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}
        className={classNames(styles.label, labelVisible || styles.labelHidden)}
      >
        {label}
      </label>
      <div className={classNames(styles.inputWrapper, errorProp && styles.inputWrapperError)}>
        {icon && <Icon type={icon}/>}
        <input 
          id={id}
          type={onCheckType()}
          name={name}
          className={classNames(styles.input)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          onChange={onHandleChange}
          { ...resProps }
        />
        {password && (
          <button
            type='button'
            className={styles.button}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        )}
      </div>
      {errorProp && (
        <span role='alert' className={styles.error}>
          {errorProp.message}
        </span>
      )}
    </div>
  )
}

export default Input