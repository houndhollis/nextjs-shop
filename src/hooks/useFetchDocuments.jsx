'use client';
import React from 'react';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const useFetchDocuments = (collectionName, agr) => {
  const [documents, setDocuments] = React.useState([]);

  const getDocuments = React.useCallback(async() => {
   const q = query(collection(db, collectionName), where(agr[0], agr[1], agr[2]));
   const querySnapshot = await getDocs(q);
   let documentsArray = [];

   querySnapshot.forEach(doc => {
     const data = {
      id: doc.id,
      ...doc.data()
     }
     documentsArray.push(data);
   });

   setDocuments(documentsArray);

  },[collectionName, agr[0], agr[1], agr[2]])

  React.useEffect(() => {
    getDocuments()
  },[getDocuments])

  return { documents }
}

export default useFetchDocuments