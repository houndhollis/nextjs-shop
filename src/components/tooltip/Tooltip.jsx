import classNames from 'classnames';
import styles from './Tooltip.module.scss';

import React from 'react';

const Tooltip = ({
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
  color = '',
  bgColor = '',
  orientation,
  message,
  ...resProps
}) => {

  const style = {
    top,
    right,
    bottom,
    left,
    color,
    backgroundColor: bgColor
  }

  const onSetOrientationClass = (type) => {
    switch (type) {
      case 'top':
        return styles.orientationTop
      case 'right':
        return styles.orientationRight
      case 'bottom':
        return styles.orientationBottom
      case 'left':
        return styles.orientationLeft
      default: break;
    }

  }

  return (
    <span
      role='tooltip'
      style={style}
      className={classNames(styles.tooltip, onSetOrientationClass(orientation))}
      {...resProps}
    >
      {message}
    </span>
  )
}

export default Tooltip