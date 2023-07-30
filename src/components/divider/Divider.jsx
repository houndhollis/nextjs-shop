import classNames from 'classnames';
import styles from './Divider.module.scss';

import React from 'react';

const Divider = ({
  space = 22,
  color = '#ccc',
  className = '',
  ...resProps
}) => {

  const style = {
    marginTop: space,
    marginBottom: space,
    background: color
  }

  return (
    <div
      role="presentation"
      className={classNames(styles.line, className)}
      style={style}
   />
  )
}

export default Divider