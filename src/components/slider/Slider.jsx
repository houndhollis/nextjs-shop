'use client';
import styles from './Slider.module.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

import React from 'react';
import sliderData from './SliderData';

const Slider = () => {

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const sliderLength = sliderData.length;

  const intervalTime = 5000;

  const nextSlide = React.useCallback(() => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  },[currentSlide, sliderLength]);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  },[currentSlide, sliderLength])
  
  React.useEffect(() => {
    setCurrentSlide(0);
  },[])

  React.useEffect(() => {
    const interval = setInterval(nextSlide, intervalTime);
    
    return () => {
      clearInterval(interval);
    }
  },[nextSlide])

  return (
    <div className={styles.slider}>
      <AiOutlineArrowLeft className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}/>
      <AiOutlineArrowRight className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}/>
      {sliderData?.map((slider, index) => {
        const { image, heading, desc } = slider
        return (
          <div 
            key={heading}
            className={index === currentSlide ? `${styles.slide} ${styles.current}` : `${styles.silde}`}
          >
            {
              index === currentSlide ?
              <Image src={image} alt={heading} fill/>
              : 
              null
            }
          </div>
        )
      })}
    </div>
  )
}

export default Slider