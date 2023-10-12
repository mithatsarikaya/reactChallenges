"use client";
import { useEffect, useState } from "react";
import styles from "./getinqueue.module.css";

type TQueueList = TQueue[];
type TQueue = number[];

const GetInQueue = () => {
  const [newNumber, setNewNumber] = useState<number>(1);
  const [qNumbers, setQNumbers] = useState<TQueueList>([[], [], [], [], []]);
  console.log(qNumbers);
  console.log(newNumber);

  useEffect(() => {
    const decreaseIfNotZero = setInterval(() => {
      setQNumbers((prevNumbers) =>
        prevNumbers.map((p) => {
          return p
            .map((s, idx) => {
              if (s == 0) {
                return 0;
              } else if (idx == 0) {
                return s - 1;
              } else {
                return s;
              }
            })
            .filter((s) => s > 0);
        })
      );
    }, 1000);

    return () => {
      clearInterval(decreaseIfNotZero);
    };
  }, []);

  const handleSendToQueue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newNumber) return;

    let newQNumbers = qNumbers.slice();

    let newQNumbersSumArrayWithIDs = newQNumbers.map((arr, idx) => {
      if (arr.length == 0) {
        return { id: idx, sum: 0 };
      } else {
        return { id: idx, sum: arr.reduce((tot, curr) => tot + curr) };
      }
    });

    let idWithTheMinValue = newQNumbersSumArrayWithIDs.toSorted(
      (a, b) => a.sum - b.sum
    )[0].id;

    newQNumbers[idWithTheMinValue].push(newNumber);

    setQNumbers(newQNumbers);
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
