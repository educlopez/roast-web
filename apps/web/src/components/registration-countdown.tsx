import { useEffect, useState } from "react";
import { REGISTRATION_START } from "@/lib/registration-dates";

type TimeLeft = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function RegistrationCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(REGISTRATION_START),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(REGISTRATION_START));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.totalMs <= 0) {
    return null;
  }

  const parts: string[] = [];

  if (timeLeft.days > 0) {
    parts.push(
      `${timeLeft.days} día${timeLeft.days === 1 ? "" : "s"}`,
    );
  }

  if (timeLeft.hours > 0 || timeLeft.days > 0) {
    parts.push(
      `${timeLeft.hours} hora${timeLeft.hours === 1 ? "" : "s"}`,
    );
  }

  if (timeLeft.minutes > 0 || timeLeft.hours > 0 || timeLeft.days > 0) {
    parts.push(
      `${timeLeft.minutes} minuto${timeLeft.minutes === 1 ? "" : "s"}`,
    );
  }

  if (parts.length === 0) {
    parts.push(
      `${timeLeft.seconds} segundo${timeLeft.seconds === 1 ? "" : "s"}`,
    );
  }

  const countdownText = parts.join(" · ");

  return (
    <p className="text-xs text-light-secondary/80 md:text-sm">
      Las inscripciones abren en{" "}
      <span className="font-medium text-light-primary">
        {countdownText}
      </span>
      .
    </p>
  );
}


