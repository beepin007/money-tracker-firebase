import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserinfo";

export const useGetTranscations = () => {
  const [transactionTotals, setTransactionTotals] = useState([
    { balance: 0.0, income: 0.0, expenses: 0.0 },
  ]);
  const [transactions, setTransactions] = useState([]);
  const transactionCollectionRef = collection(db, "transactions");
  const { UserID } = useGetUserInfo();
  const getTransactions = async () => {
    let unSubscribe;
    try {
      const queryTransaction = query(
        transactionCollectionRef,
        where("UserID", "==", UserID),
        orderBy("createdAt")
      );

      //snapshot is , all the details which we can retrive from firebase console
      unSubscribe = onSnapshot(queryTransaction, (snapShot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;
        snapShot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
          if (data.transactionType == "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });

        setTransactions(docs);
        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });
      });
    } catch (err) {
      console.log(err);
    }
    return () => unSubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};
