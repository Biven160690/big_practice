"use client";

import React from "react";
import styles from "./styles.module.scss";
import { ElectroWatch } from "./electroWatch";

export type PositionArrows = {
  second: number;
  minut: number;
  hour: number;
};

export const ARROWS = {
  second: "second",
  minut: "minut",
  hour: "hour",
} as const;

const HORDS = {
  second: 6,
  minut: 0.1,
  hour: 0.00166,
} as const;

const STARTING_HORDS = {
  second: 6,
  minut: 6,
  hour: 30,
} as const;

export type ValueOf<T> = Required<T>[keyof T];

export type Keys = ValueOf<typeof ARROWS>;

const getPosition = (
  positionArrows: React.MutableRefObject<PositionArrows>,
  key: Keys,
  hord: number
) => {
  if (positionArrows.current[key] === 354) {
    return (positionArrows.current[key] = 0);
  }

  return (positionArrows.current[key] += hord);
};

export const getStartingPosition = (startingHord?: number): PositionArrows => {
  const currentDate = new Date();
  const { second, minut, hour } = STARTING_HORDS;

  return {
    second: currentDate.getSeconds() * (startingHord || second),
    minut: currentDate.getMinutes() * (startingHord || minut),
    hour: currentDate.getHours() * (startingHord || hour),
  };
};

export const Timer = () => {
  const secondArrowRef = React.useRef<HTMLDivElement | null>(null);
  const minutArrowRef = React.useRef<HTMLDivElement | null>(null);
  const hourArrowRef = React.useRef<HTMLDivElement | null>(null);
  const positionArrows = React.useRef<PositionArrows>(getStartingPosition());

  React.useLayoutEffect(() => {
    const secondArrow = secondArrowRef.current;
    const minutArrow = minutArrowRef.current;
    const hourArrow = hourArrowRef.current;

    if (!(secondArrow && minutArrow && hourArrow)) {
      return;
    }

    const { second, minut, hour } = positionArrows.current;

    secondArrow.style.transform = `rotate(${second}deg)`;
    minutArrow.style.transform = `rotate(${minut}deg)`;
    hourArrow.style.transform = `rotate(${hour}deg)`;
  }, []);

  React.useEffect(() => {
    const secondArrow = secondArrowRef.current;
    const minutArrow = minutArrowRef.current;
    const hourArrow = hourArrowRef.current;

    if (!(secondArrow && minutArrow && hourArrow)) {
      return;
    }

    const intervalId = setInterval(() => {
      secondArrow.style.transform = `rotate(${getPosition(
        positionArrows,
        ARROWS.second,
        HORDS.second
      )}deg)`;
      minutArrow.style.transform = `rotate(${getPosition(
        positionArrows,
        ARROWS.minut,
        HORDS.minut
      )}deg)`;
      hourArrow.style.transform = `rotate(${getPosition(
        positionArrows,
        ARROWS.hour,
        HORDS.hour
      )}deg)`;
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <React.Fragment>
      <div className={styles.base}>
        <div className={styles.timeBlock}>
          <div className={styles.arrowContaner} ref={secondArrowRef}>
            <div className={styles.second} />
            <div className={styles.centerPoint} />
          </div>
          <div className={styles.arrowContaner} ref={minutArrowRef}>
            <div className={styles.minut} />
          </div>
          <div className={styles.arrowContaner} ref={hourArrowRef}>
            <div className={styles.hour} />
          </div>
        </div>
        <ElectroWatch />
      </div>
    </React.Fragment>
  );
};
