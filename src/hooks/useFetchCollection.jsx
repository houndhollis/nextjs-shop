'use client';
import React from 'react';

import { db } from '@/firebase/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';

const useFetchCollection = (collectionName) => {

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getCollection = React.useCallback(() => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(allData);
        setIsLoading(false);
      })

    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  },[collectionName])

  React.useEffect(() => {
    getCollection();
  },[getCollection])

  return { data, isLoading };
}

export default useFetchCollection 