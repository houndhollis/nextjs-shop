import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { toast } from 'react-toastify';


const useFetchDocument =  (collectionName, documentId ) => {
  
  const [document, setDocument] = React.useState(null);

  const getDocument = React.useCallback( async() => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id : documentId,
        ...docSnap.data(),
      }
      setDocument(obj);
    } else {
      toast.error('Document Not Found');
    }

  },[collectionName, documentId])

  React.useEffect(() => {
    getDocument();
  },[getDocument])

  return { document };
}

export default useFetchDocument