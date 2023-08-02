import classNames from 'classnames';
import styles from './Button.module.scss';
import React from 'react';

const Button = ({
  type = 'button',
  secondary = false,
  bgColor,
  fgColor,
  width,
  ...resProps
}) => {

  const composeClass = classNames(
    styles.button,
    secondary ? styles.secondary : styles.primary
  )
  const style = {
    backgroundColor : bgColor || '',
    color : fgColor || '',
    width : width || '',
  }


  return (
    <button
      className={composeClass}
      style={style}
      {...resProps}
    />
  )
}

export default Button