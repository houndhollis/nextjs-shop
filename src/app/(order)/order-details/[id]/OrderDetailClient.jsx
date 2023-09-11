'use client';
import Heading from '@/components/heading/Heading';
import Loader from '@/components/loader/Loader';
import useFetchDocument from '@/hooks/useFetchDocument';
import { useParams } from 'next/navigation';
import React from 'react';
import styles from './OrderDetailClient.module.scss';

const OrderDetailClient = () => {

  const { id } = useParams();

  const { document : order } = useFetchDocument('orders', id)
  return (
    <section className={styles.table}>
      <Heading title='주문 상세 정보'/>
      {order === null ? (
        <Loader basic/>
      ) : (
        <div className={styles.details}>
          <p>
            <b>주문 아이디</b> {order.id}
          </p>
        </div>
      )}
    </section>
  )
}

export default OrderDetailClient