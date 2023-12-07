"use client";

import React from "react";
import styles from "./styles.module.scss";
import { getStartingPosition, PositionArrows } from "../index";

const STARTING_HORD = 1;

export const ElectroWatch = () => {
  const [positionArrow, setPositionArrow] = React.useState<PositionArrows>(() =>
    getStartingPosition(STARTING_HORD)
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();

      setPositionArrow({
        second: currentDate.getSeconds(),
        minut: currentDate.getMinutes(),
        hour: currentDate.getHours(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.base}>
      <div>{positionArrow.hour}:</div>
      <div>{positionArrow.minut}:</div>
      <div>{positionArrow.second}</div>
    </div>
  );
};
