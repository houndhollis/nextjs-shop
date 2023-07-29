import React from 'react'

const CheckBox = ({
  disabled = false,
  checked = false,
  label,
  onChange,
  ...resProps
}) => {

  return (
    <label style={{ fontSize: '1.4rem' }}>
      <input
        type='checkbox'
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...resProps}
      />{" "}
      {label}
    </label>
  )
}

export default CheckBox