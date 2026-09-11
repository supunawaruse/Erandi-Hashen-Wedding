import { useEffect, useState } from "react";
import { event } from "../data/weddingData";
import Reveal from "./Reveal";
import "./Countdown.css";

function getTimeLeft() {
  const diff = new Date(event.isoDateTime).getTime() - Date.now();
  const clamped = Math.max(diff, 0);

  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    done: diff <= 0,
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="section countdown">
      <div className="section-inner">
        <Reveal className="eyebrow-rule" aria-hidden="true">
          <span />
        </Reveal>
        <Reveal as="h2" className="countdown-heading gold-foil-heading">
          Counting Down to Forever
        </Reveal>
        <Reveal as="p" className="countdown-sub" delay={80}>
          {time.done
            ? "Our celebration has begun — thank you for being part of it!"
            : "Our special day is almost here"}
        </Reveal>

        <Reveal className="countdown-grid" delay={150}>
          {units.map((u, i) => (
            <div className="countdown-item-group" key={u.label}>
              <div className="countdown-unit">
                <span className="countdown-value gold-foil-heading">
                  {String(u.value).padStart(2, "0")}
                </span>
                <span className="countdown-label">{u.label}</span>
              </div>
              {i < units.length - 1 && (
                <div className="countdown-divider-dots" aria-hidden="true">
                  <span />
                  <span />
                </div>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
