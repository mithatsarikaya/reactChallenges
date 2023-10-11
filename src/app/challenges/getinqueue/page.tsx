"use client";
import { useState } from "react";
import styles from "./getinqueue.module.css";

type TQueueList = TQueue[];
type TQueue = number[];

const GetInQueue = () => {
  const [newNumber, setNewNumber] = useState<number>(1);
  const [qNumbers, setQNumbers] = useState<TQueueList>([[], [], [], [], []]);
  console.log(qNumbers);
  console.log(newNumber);

  const handleSendToQueue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newNumber) return;
    console.log("object");

    let newNumbers = qNumbers.slice();
    newNumbers[0].push(newNumber);

    setQNumbers(newNumbers);
  };

  return (
    <main className={styles.container}>
      <form
        onSubmit={(e) => handleSendToQueue(e)}
        className={styles.inputForm}
        action=""
      >
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(Number(e.currentTarget.value))}
          type="number"
          name=""
          id=""
        />
        <button>put to the queue</button>
      </form>
      <section className={styles.queueContainer}>
        {qNumbers.map((q, idx) => (
          <article key={idx} className={styles.queue}>
            {q.map((a, idx) => (
              <p key={idx} style={{ textAlign: "center" }}>
                {a}
              </p>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
};

export default GetInQueue;
