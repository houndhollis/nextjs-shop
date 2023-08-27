'use client';
import Button from '@/components/button/Button';
import Heading from '@/components/heading/Heading';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '@/redux/slice/checkoutSlice';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './CheckoutAddress.module.scss'


  const initialAddressState = {
    name: '',
    line: '',
    city: '',
    postalCode: ''
  }

const CheckoutAddressClient = () => {

  const [shippingAddress, setShippingAddress] = React.useState({
    ...initialAddressState
  })
  
  const [billingAddress, setBillingAddress] = React.useState({
    ...initialAddressState
  })

  const dispatch = useDispatch();
  const router = useRouter();

  const handleShipping = (event) => {
    const {name , value} = event.target;
    setShippingAddress({...shippingAddress, [name]:value});
  }

  const handleBilling = (event) => {
    const {name , value} = event.target;
    setBillingAddress({...billingAddress, [name]:value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    router.push('/checkout')
  }

 
  return (
    <section className={styles.checkout}>
      <Heading title='상세주문'/>
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h3>배송 주소</h3>
          <label>받는 사람 이름</label>
          <input
            type='text'
            placeholder='Recipient Name'
            required
            name='name'
            value={shippingAddress.name}
            onChange={(event) => handleShipping(event)}
          />

          <label>상세주소</label>
          <input
            type='text'
            placeholder='상세주소'
            required
            name='line'
            value={shippingAddress.line}
            onChange={(event) => handleShipping(event)}
          />

          <label>도시</label>
          <input
            type='text'
            placeholder='도시'
            required
            name='city'
            value={shippingAddress.city}
            onChange={(event) => handleShipping(event)}
          />

          <label>우편번호</label>
          <input
            type='text'
            placeholder='우편번호'
            required
            name='postalCode'
            value={shippingAddress.postalCode}
            onChange={(event) => handleShipping(event)}
          />
        </div>
      
        {/* BillingSection */}
        <div className={styles.card}>
          <h3>청구지 주소</h3>
          <label>보내는 사람 사람 이름</label>
          <input
            type='text'
            placeholder='Name'
            required
            name='name'
            value={billingAddress.name}
            onChange={(event) => handleBilling(event)}
          />

          <label>상세주소</label>
          <input
            type='text'
            placeholder='상세주소'
            required
            name='line'
            value={billingAddress.line}
            onChange={(event) => handleBilling(event)}
          />

          <label>도시</label>
          <input
            type='text'
            placeholder='도시'
            required
            name='city'
            value={billingAddress.city}
            onChange={(event) => handleBilling(event)}
          />

          <label>우편번호</label>
          <input
            type='text'
            placeholder='우편번호'
            required
            name='postalCode'
            value={billingAddress.postalCode}
            onChange={(event) => handleBilling(event)}
          />
          <Button type='submit'>주문하기</Button>
        </div>
      </form>
    </section>
  )
}

export default CheckoutAddressClient