import React, { useState } from "react";
import "./style.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTranscations } from "../../hooks/useGetTranscations";
import { useGetUserInfo } from "../../hooks/useGetUserinfo";
import { avatar } from "../../assets/avatar.png";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const MoneyTracker = () => {
  const { addTransaction } = useAddTransaction();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { transactions, transactionTotals } = useGetTranscations();
  const { name, profilePhoto } = useGetUserInfo();

  const { balance, expenses, income } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Money Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            {balance >= 0 ? (
              <h2>
                ₹ {""} {balance} /-
              </h2>
            ) : (
              <h1 style={{ color: balance < 1 ? "red" : "" }}>
                -₹{balance * -1} /-
              </h1>
            )}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>
                ₹ {""} {income}
              </p>
            </div>
            <div className="expenses">
              <h4>Expense</h4>
              <p>
                ₹ {""} {expenses}
              </p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              onChange={(e) => {
                setTransactionAmount(e.target.value);
              }}
            />
            <input
              checked={transactionType === "expense"}
              type="radio"
              id="expense"
              value="expense"
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
            />
            <label htmlFor="expense">Expense</label>
            <input
              checked={transactionType === "income"}
              type="radio"
              id="income"
              value="income"
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Transcation</button>
          </form>
        </div>
        {profilePhoto ? (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto} />
          </div>
        ) : (
          <div className="profile">
            <img
              className="profile-photo"
              src="../../assets/avatar.png"
              alt="Default Profile"
            />
          </div>
        )}
        <button className="sign-out-button" onClick={signUserOut}>
          sign out
        </button>
      </div>
      <div>
        <div className="transactions">
          <h3>Transcation</h3>
          <ul>
            {transactions.map((transaction) => {
              const { description, transactionAmount, transactionType } =
                transaction;
              return (
                <li>
                  <h4>{description}</h4>
                  <p>
                    ₹ {transactionAmount}.
                    <label
                      style={{
                        color: transactionType === "expense" ? "red" : "green",
                      }}
                    >
                      {transactionType}
                    </label>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
