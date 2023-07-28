import React from 'react';
import Image from 'next/image';

import letterPath from './images/shape=letter.svg';
import lockPath from './images/shape=lock.svg';
import hidePath from './images/shape=hide.svg';
import showPath from './images/shape=show.svg';

const Icon = ({ type, alt = '', ...resProps }) => {
  let src = '';
  switch (type) {
    case 'letter':
      src = letterPath
      break
    case 'lock':
      src = lockPath
      break
    case 'hide':
      src = hidePath
      break
    case 'show':
      src = showPath
      break
    default: 
      throw new Error ('지원하는 아이콘 타입이 없습니다')
  }

  return (
    <Image src={src} alt={alt} {...resProps}/>
  )
}

export default Icon