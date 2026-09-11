import { couple, event } from "../data/weddingData";
import TopMandala from "./TopMandala";
import "./Hero.css";

export default function Hero() {
  const handleScrollClick = (e) => {
    e.preventDefault();
    const target = document.getElementById("couple") || document.getElementById("details");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      {/* Royal double-line gold border with open crest for top mandala */}
      <div className="hero-frame-outer" aria-hidden="true">
        {/* Outer top border segments with gold terminal accents */}
        <div className="frame-top-seg frame-top-left">
          <span className="frame-terminal" />
        </div>
        <div className="frame-top-seg frame-top-right">
          <span className="frame-terminal" />
        </div>

        <div className="hero-frame-inner">
          {/* Inner top border segments */}
          <div className="frame-inner-top-seg frame-inner-top-left" />
          <div className="frame-inner-top-seg frame-inner-top-right" />
        </div>

        {/* 4 Intricate Gold Corner Ornaments */}
        <div className="hero-corner hero-corner-tl">
          <svg viewBox="0 0 36 36" fill="none" className="hero-corner-svg">
            <path d="M 2 28 L 2 2 L 28 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 7 24 L 7 7 L 24 7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
            <polygon points="13,13 16.5,9.5 13,6 9.5,9.5" fill="currentColor" />
          </svg>
        </div>
        <div className="hero-corner hero-corner-tr">
          <svg viewBox="0 0 36 36" fill="none" className="hero-corner-svg">
            <path d="M 34 28 L 34 2 L 8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 29 24 L 29 7 L 12 7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
            <polygon points="23,13 26.5,9.5 23,6 19.5,9.5" fill="currentColor" />
          </svg>
        </div>
        <div className="hero-corner hero-corner-bl">
          <svg viewBox="0 0 36 36" fill="none" className="hero-corner-svg">
            <path d="M 2 8 L 2 34 L 28 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 7 12 L 7 29 L 24 29" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
            <polygon points="13,23 16.5,26.5 13,30 9.5,26.5" fill="currentColor" />
          </svg>
        </div>
        <div className="hero-corner hero-corner-br">
          <svg viewBox="0 0 36 36" fill="none" className="hero-corner-svg">
            <path d="M 34 8 L 34 34 L 8 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 29 12 L 29 29 L 12 29" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
            <polygon points="23,23 26.5,26.5 23,30 19.5,26.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Subtle ambient radial gold glow */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Top crested mandala arch with feathered fade */}
      <TopMandala />

      {/* Reorganized Hero Content */}
      <div className="hero-content">
        <div className="hero-kicker-wrap">
          <span className="hero-kicker-line" aria-hidden="true" />
          <p className="hero-kicker">We're Getting Married</p>
          <span className="hero-kicker-line" aria-hidden="true" />
        </div>

        <h1 className="hero-names">
          <span className="hero-name">{couple.brideFirstName}</span>
          <span className="hero-amp-wrap" aria-hidden="true">
            <span className="hero-amp">&amp;</span>
          </span>
          <span className="hero-name">{couple.groomFirstName}</span>
        </h1>

        {/* Ornate Gold Filigree Motif Divider */}
        <div className="hero-divider" aria-hidden="true">
          <span className="hero-divider-bar" />
          <div className="hero-divider-motif">
            <svg viewBox="0 0 64 16" fill="none" className="hero-motif-svg">
              <path d="M 4 8 C 14 3, 22 13, 32 8 C 42 3, 50 13, 60 8" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" />
              <polygon points="32,2 36,8 32,14 28,8" fill="var(--gold)" />
              <circle cx="20" cy="8" r="1.5" fill="var(--gold)" />
              <circle cx="44" cy="8" r="1.5" fill="var(--gold)" />
            </svg>
          </div>
          <span className="hero-divider-bar" />
        </div>

        {/* Save The Date & Event Details */}
        <div className="hero-meta">
          <p className="hero-save-date">Save the Date</p>
          <p className="hero-date">
            <span className="hero-day">{event.dayName}</span>
            <span className="hero-date-sep">, </span>
            <span className="hero-full-date">{event.date}</span>
          </p>
          <p className="hero-venue">{event.venueName}</p>
        </div>
      </div>

      {/* Elevated scroll indicator */}
      <a
        href="#couple"
        className="hero-scroll"
        onClick={handleScrollClick}
        aria-label="Scroll to explore details"
      >
        <span className="hero-scroll-text">Scroll to explore</span>
        <div className="hero-scroll-indicator" aria-hidden="true">
          <span className="hero-scroll-line" />
        </div>
      </a>
    </section>
  );
}

