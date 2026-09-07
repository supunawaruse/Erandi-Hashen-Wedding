import { useEffect, useState } from "react";
import { couple } from "../data/weddingData";
import Monogram from "./Monogram";
import TopMandala from "./TopMandala";
import "./Opener.css";

export default function Opener({ onOpen }) {
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  function handleOpen() {
    if (closing) return;
    setClosing(true);
    onOpen?.();
    // Match the CSS transition duration below before unmounting.
    window.setTimeout(() => setHidden(true), 900);
  }

  if (hidden) return null;

  return (
    <div
      className={`opener ${closing ? "opener-closing" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation"
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      <div className="opener-frame" aria-hidden="true" />
      <TopMandala />

      <div className="opener-content">
        {/* <Monogram /> */}
        <p className="opener-kicker">You're Invited</p>

        <h1 className="opener-names">
          {couple.brideFirstName}
          <span className="opener-amp">&amp;</span>
          {couple.groomFirstName}
        </h1>

        <div className="opener-tap">
          <span className="opener-tap-ring" />
          <span className="opener-tap-label">Tap to Open</span>
        </div>
      </div>
    </div>
  );
}
