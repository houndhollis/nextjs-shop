'use client'
import Button from '@/components/button/Button';
import CheckoutForm from '@/components/checkoutForm/CheckoutForm';
import Heading from '@/components/heading/Heading';
import { db } from '@/firebase/firebase';
import { selectEmail, selectUserID } from '@/redux/slice/authSlice';
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '@/redux/slice/cartSlice';
import { selectShippingAddress } from '@/redux/slice/checkoutSlice';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './Checkout.module.scss';

const CheckoutClient = () => {

  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const userID = useSelector(selectUserID);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const userEmail = useSelector(selectEmail);

  const dispatch = useDispatch();
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const tossPayment = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    )
    tossPayment.requestPayment('카드',{
      amount: cartTotalAmount,
      orderId: Math.random().toString(36).slice(2),
      orderName: '주문'
    })
    .then( async (data) => {
      const { orderId, paymentKey, amout } = data
      const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY

      const url = `https://api.tosspayments.com/v1/payments/confirm`
      const basicToken = Buffer.from(`${secretKey}:`,"utf-8").toString('base64')

      const confirmResponse = fetch(url,{
        method:'POST',
        body: JSON.stringify({
          amout,
          orderId,
          paymentKey
        }),
        headers: {
          Authorization: `Basic ${basicToken}`,
          "Content-Type" : "application/json"
        }
      }).then((response) => response.json());

      console.log('confirmResponse', confirmResponse);

      const today = new Date();
      const date = today.toDateString();
      const time = today.toLocaleDateString();

      const orderData = {
        userID,
        userEmail,
        orderData: date,
        orderTime : time,
        orderAmount : amout,
        orderStatus: '주문수락',
        cartItems,
        shippingAddress,
        createdAt: Timestamp.now().toDate()
      }

      await addDoc(collection(db, 'orders'), orderData);
      dispatch(CLEAR_CART());

      router.push(`/checkout-success?orderId=${orderId}`);

    })
    .catch((error) => {
      if (error.code === 'USER_CANCEL') {
        // 유저가 결제창을 닫았을 때,
        toast.error('결제창이 닫아졌습니다.')
      } else if (error.code === 'INVALID_CARD_COMPANY') {
        // 유효하지 않은 카드 
      }
    })
  }

  return (
    <section>
      <div className={styles.checkout}>
        <Heading title='주문하기'/>
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <CheckoutForm />
          </div>
          <div>
            <Button type='submit'>
              토스를 이용해서 결제하기
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CheckoutClient