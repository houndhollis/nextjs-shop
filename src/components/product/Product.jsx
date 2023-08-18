'use client';
import styles from './Product.module.scss';

import React from 'react';
import useFetchCollection from '@/hooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRICE_RANGE, selectMaxPrice, selectProducts, STORE_PRODUCTS } from '@/redux/slice/productSlice';
import Loader from '../loader/Loader';
import ProductList from './productList/ProductList';
import ProductFilter from './productFilter/ProductFilter';

const Product = () => {

  const {data, isLoading} = useFetchCollection('products');

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data
      })
    )
    dispatch(
      GET_PRICE_RANGE({
        products: data
      })
    )
  },[data, dispatch])
  
  const products = useSelector(selectProducts);

  return (
    <section className={styles.product}>
      <aside
        className={styles.filter}
      >
        {isLoading ? null : <ProductFilter/>}
      </aside>
      <div className={styles.content}>
        {isLoading ? (
          <Loader basic/>
        ) : (
          <ProductList/>
        )}
      </div>
    </section>
  )
}

export default Product