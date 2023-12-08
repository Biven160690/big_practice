"use client";

import React from "react";
import styles from "./styles.module.scss";
import { getStartingPosition, PositionArrows } from "../index";

const STARTING_HORDE = 1;

export const ElectroWatch = () => {
  const [positionArrow, setPositionArrow] = React.useState<PositionArrows>(() =>
    getStartingPosition(STARTING_HORDE)
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();

      setPositionArrow({
        second: currentDate.getSeconds(),
        minute: currentDate.getMinutes(),
        hour: currentDate.getHours() % 12 || 12,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.base}>
      <div>{positionArrow.hour}:</div>
      <div>{positionArrow.minute}:</div>
      <div>{positionArrow.second}</div>
    </div>
  );
};
