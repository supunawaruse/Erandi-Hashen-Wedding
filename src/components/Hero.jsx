import { couple, event } from "../data/weddingData";
import TopMandala from "./TopMandala";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-frame" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <TopMandala />

      <div className="hero-content">
        <p className="hero-kicker">We're getting married</p>

        <h1 className="hero-names">
          {couple.brideFirstName}
          <span className="hero-amp">&amp;</span>
          {couple.groomFirstName}
        </h1>

        <div className="hero-rule" aria-hidden="true" />
        <p className="hero-date">{event.date}</p>
      </div>

      <a href="#details" className="hero-scroll">
        <span>Scroll for details</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  );
}
