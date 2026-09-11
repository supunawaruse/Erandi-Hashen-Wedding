import { useEffect, useRef, useState } from "react";
import { couple, event } from "../data/weddingData";
import frontMonogram from "../assets/front_monogram.png";
import "./Opener.css";

export default function Opener({ onOpen }) {
  // Animation state: 'idle' | 'opening' | 'extracted' | 'dissolving'
  const [stage, setStage] = useState("idle");
  const [hidden, setHidden] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, lightX: 50, lightY: 40 });
  const containerRef = useRef(null);

  // Lock body scroll while opener is visible
  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  // Subtle interactive 3D mouse parallax before opening
  useEffect(() => {
    if (stage !== "idle") return;

    function handleMouseMove(e) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);

      // Max tilt: +/- 9 degrees for elegant subtle perspective
      const tiltX = Math.max(-10, Math.min(10, -dy * 9));
      const tiltY = Math.max(-12, Math.min(12, dx * 11));

      const lightX = 50 + dx * 28;
      const lightY = 40 + dy * 28;

      setTilt({ x: tiltX, y: tiltY, lightX, lightY });
    }

    function handleDeviceOrientation(e) {
      if (e.beta == null || e.gamma == null) return;
      const tiltX = Math.max(-10, Math.min(10, (e.beta - 45) * 0.3));
      const tiltY = Math.max(-12, Math.min(12, e.gamma * 0.35));
      setTilt({ x: tiltX, y: tiltY, lightX: 50 + tiltY * 2, lightY: 40 + tiltX * 2 });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [stage]);

  const timersRef = useRef([]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  function triggerDissolve() {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];

    onOpen?.();
    setStage("dissolving");

    // Phase 4: Final unmount of the opener overlay after fade animation
    const fadeTimer = setTimeout(() => {
      setHidden(true);
    }, 850);
    timersRef.current.push(fadeTimer);
  }

  function handleOpen() {
    if (stage === "idle") {
      // Reset tilt smoothly for cinematic opening
      setTilt({ x: 0, y: 0, lightX: 50, lightY: 35 });
      setStage("opening");

      // Phase 1: Flap opens in 3D (0 -> 700ms)
      // Phase 2: Card slides up out of envelope pocket (700ms)
      const extractTimer = setTimeout(() => {
        setStage("extracted");

        // Phase 3: Keep card visible for 3 seconds so guests can comfortably read
        const readingTimer = setTimeout(() => {
          triggerDissolve();
        }, 3000);
        timersRef.current.push(readingTimer);
      }, 700);
      timersRef.current.push(extractTimer);
    } else if (stage === "extracted") {
      // Allow early tap/click anywhere to immediately skip the wait time
      triggerDissolve();
    }
  }

  if (hidden) return null;

  const isOpeningOrBeyond = stage !== "idle";
  const isExtractedOrBeyond = stage === "extracted" || stage === "dissolving";
  const isDissolving = stage === "dissolving";

  return (
    <div
      className={`opener-backdrop ${isDissolving ? "opener-fade-out" : ""}`}
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={
        stage === "extracted"
          ? "Tap anywhere to continue to wedding website"
          : "Tap to open the wedding invitation"
      }
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      {/* Elegant perimeter gold border with corner accents */}
      <div className="opener-frame" aria-hidden="true">
        <span className="frame-corner tl" />
        <span className="frame-corner tr" />
        <span className="frame-corner bl" />
        <span className="frame-corner br" />
      </div>

      {/* Floating subtle gold ambient sparkles */}
      <div className="opener-ambient-particles" aria-hidden="true">
        <span className="sparkle sp-1" />
        <span className="sparkle sp-2" />
        <span className="sparkle sp-3" />
        <span className="sparkle sp-4" />
        <span className="sparkle sp-5" />
        <span className="sparkle sp-6" />
      </div>

      {/* Background ambient lighting */}
      <div className="opener-ambient-glow" aria-hidden="true" />

      {/* 3D Perspective Stage */}
      <div
        className="opener-stage"
        style={{
          "--tilt-x": `${tilt.x}deg`,
          "--tilt-y": `${tilt.y}deg`,
          "--light-x": `${tilt.lightX}%`,
          "--light-y": `${tilt.lightY}%`,
        }}
      >
        {/* Royal header with custom gold foil monogram emblem */}
        <div className={`opener-header ${isOpeningOrBeyond ? "header-fade" : ""}`}>
          <div className="opener-monogram-emblem">
            <img
              src={frontMonogram}
              alt={`${couple.brideFirstName} & ${couple.groomFirstName}`}
              className="opener-monogram-img"
            />
          </div>
          <p className="opener-kicker">You are cordially invited to the wedding of</p>
          <h2 className="opener-header-names">
            {couple.brideFirstName} <span className="header-amp">&amp;</span> {couple.groomFirstName}
          </h2>
        </div>

        <div
          className={`envelope-3d ${isOpeningOrBeyond ? "envelope-opening" : ""} ${isExtractedOrBeyond ? "envelope-extracted" : ""
            } ${isDissolving ? "envelope-dissolving" : ""}`}
        >
          {/* Envelope Back Plate (interior pocket lining) */}
          <div className="env-back">
            <div className="env-back-pattern" />
          </div>

          {/* Invitation Card tucked inside the pocket */}
          <div
            className={`invitation-card ${isExtractedOrBeyond ? "card-extracted" : ""
              } ${isDissolving ? "card-dissolving" : ""}`}
            aria-hidden={!isOpeningOrBeyond}
          >
            <div className="card-border-gold">
              <div className="card-inner-frame">
                {/* Custom gold monogram badge on card */}
                <div className="card-monogram-badge">
                  <img src={frontMonogram} alt="E & H" className="card-monogram-img" />
                </div>

                <p className="card-kicker">Together with their families</p>

                <h1 className="card-names">
                  <span>{couple.brideFirstName}</span>
                  <span className="card-amp">&amp;</span>
                  <span>{couple.groomFirstName}</span>
                </h1>

                <div className="card-divider">
                  <span className="card-divider-diamond" />
                </div>

                <p className="card-save-date">Save the Date</p>
                <p className="card-date">{event.date}</p>
              </div>
            </div>
          </div>

          {/* Envelope Front Pocket Layers */}
          <div className="env-pocket-left" />
          <div className="env-pocket-right" />
          <div className="env-pocket-bottom">
            <div className="env-bottom-gold-trim" />
          </div>

          {/* Envelope 3D Top Flap (folds down when closed, flips up 180° when opened) */}
          <div className={`env-flap-top ${isOpeningOrBeyond ? "flap-open" : ""}`}>
            <div className="env-flap-face env-flap-front">
              <div className="env-flap-gold-edge" />
            </div>
            <div className="env-flap-face env-flap-back" />
          </div>

          {/* 3D Embossed Gold Wax Seal with Monogram */}
          <div
            className={`wax-seal ${isOpeningOrBeyond ? "wax-seal-opened" : ""}`}
            title="Click to open"
          >
            <div className="wax-seal-body">
              <div className="wax-seal-outer-rim" />
              <div className="wax-seal-inner-rim" />
              <img
                src={frontMonogram}
                alt="E & H"
                className="wax-seal-monogram-img"
              />
            </div>
          </div>

          {/* Dynamic Specular Sheen (follows mouse cursor / light reflection) */}
          <div className="env-specular-sheen" aria-hidden="true" />
        </div>

        {/* Elegant "View Invitation" prompt */}
        <div
          className={`opener-view-prompt ${isOpeningOrBeyond ? "prompt-hidden" : ""
            }`}
        >
          <span className="opener-view-btn">
            <span className="opener-view-text">View Invitation</span>
            <svg
              className="opener-view-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
