import React from "react";
import styles from "./styles.module.scss";

const initialString = "Hello world";

const TimeoutTextEffect = () => {
  const [string, setString] = React.useState<string>("");
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const timeoutId = React.useRef<NodeJS.Timeout>();

  const updateText = React.useCallback((index: number) => {
    timeoutId.current = setTimeout(() => {
      if (initialString.length === index) {
        setCurrentIndex(0);
        setString("");
        return;
      }

      setString((prev) => prev + initialString[index]);
      setCurrentIndex((prev) => prev + 1);
    }, 400);
  }, []);

  React.useEffect(() => {
    updateText(currentIndex);

    return () => clearTimeout(timeoutId.current);
  }, [currentIndex, updateText]);

  return (
    <div className={styles.base}>
      <h1 className={styles.text}>{string}</h1>
      <div className={styles.carriage} />
    </div>
  );
};

const IntervalTextEffect = () => {
  const [string, setString] = React.useState<string>("");

  React.useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (initialString.length === currentIndex) {
        currentIndex = 0;
        setString("");
      }

      setString((prev) => prev + initialString[currentIndex++]);
    }, 400);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.base}>
      <h1 className={styles.text}>{string}</h1>
      <div className={styles.carriage} />
    </div>
  );
};

export const AutoTextEffect = () => {
  return (
    <React.Fragment>
      <TimeoutTextEffect />
      <IntervalTextEffect />
    </React.Fragment>
  );
};
