import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserinfo";
export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { UserID } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      UserID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };

  return { addTransaction };
};
