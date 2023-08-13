'use client';
import styles from './Product.module.scss';

import React from 'react';
import useFetchCollection from '@/hooks/useFetchCollection';

const Product = () => {

  // const {data, isLoading} = useFetchCollection('products');

  return (
    <section className={styles.product}>
      <aside
        className={styles.filter}
      >
        aside
      </aside>
      <div className={styles.content}>
        content
      </div>
    </section>
  )
}

export default Product