import styles from './AutoSigninCheckbox.module.scss';

import React from 'react';
import CheckBox from '../checkBox/Checkbox';
import Tooltip from '../tooltip/Tooltip';

const AutoSignInCheckBox = ({ 
  label = '자동 로그인',
  checked, 
  disabled,
  orientation = 'top',
  message = '개인 정보 보호를 위해 본인 기기에서만 이용해주세요.',
  onChange,
  ...resProps 
}) => {
  return (
    <div className={styles.wrapper}>
      <CheckBox
        label={label}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...resProps}
      />
    {checked && (
      <Tooltip
        left={-5}
        top={24}
        orientation={orientation}
        message={message}
      />
      )}
    </div>
  )
}

export default AutoSignInCheckBox