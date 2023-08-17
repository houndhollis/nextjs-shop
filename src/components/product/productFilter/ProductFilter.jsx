import styles from './ProductFilter.module.scss';

import React from 'react';
import { selectMaxPrice, selectMinPrice, selectProducts } from '@/redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY, FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '@/redux/slice/filterSlice';
import priceFormat from '@/utils/priceFormat';
import Button from '@/components/button/Button';

const ProductFilter = () => {

  const [category, setCategory] = React.useState('All');
  const [brand, setBrand] = React.useState('All');
  const [price, setPrice] = React.useState('30000');

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category
    ))
  ]

  const allBrand = [
    'All',
    ...new Set(products.map((product) => product.brand
    ))
  ]

  const filterCategories = (category) => {
    setCategory(category);
  }

  React.useEffect(() => {
    dispatch(FILTER_BY({ products, price, brand, category }))
  },[dispatch, products, price, brand, category])

  const clearFilters = () => {
    setCategory('All');
    setBrand('All');
    setPrice(maxPrice)
  }

  return (
    <div className={styles.filter}>
      <h4>카테고리</h4>
      <div className={styles.category}>
        {allCategories.map((cat) => {
          return (
            <button
              key={cat}
              type='button'
              className={`${category}` === cat ? `${styles.active}` : ''}
              onClick={() => filterCategories(cat)}
            >
             &#8250; {cat}
            </button>
          )
        })}
      </div>

      <h4>브랜드</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrand.map((brand) => {
            return (
              <option
                value={brand}
                key={brand}
              >
                {brand}
              </option>
            )
          })}
        </select>
      </div>

      <h4>가격</h4>
      <p>{priceFormat(Number(price))}원</p>
      <div className={styles.price}>
        <input
          type='range'
          value={price}
          onChange={((e) => setPrice(e.target.value))}
          min={minPrice}
          max={maxPrice}
        />
      </div>
      <Button onClick={clearFilters}>
          필터 초기화
      </Button>
    </div>
  )
}

export default ProductFilter