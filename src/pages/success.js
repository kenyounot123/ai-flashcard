import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { db } from "@/firebase";
import { getFirestore, doc, collection, updateDoc } from 'firebase/firestore';

export default function Success() {
  const router = useRouter();
  const { status, userId } = router.query;


  useEffect(() => {
    const updateSubscription = async () => {
      if (status === 'success') {
        alert('Welcome! You are now a pro member!');
        try {
          
          const userDocRef = doc(collection(db, 'users'), userId);

          await updateDoc(userDocRef, {
            subscription: 'pro',
          });

          
          router.push('/');
        } catch (err) {
          console.error('Error updating Firestore:', err.message);
        }
      }
    };
    updateSubscription();
  }, [status, userId, router]);

  return <CircularProgress />;
}