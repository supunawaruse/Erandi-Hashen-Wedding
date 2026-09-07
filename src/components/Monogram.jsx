import { couple } from "../data/weddingData";
import "./Monogram.css";

export default function Monogram({ className = "" }) {
  const brideInitial = couple.brideFirstName.charAt(0);
  const groomInitial = couple.groomFirstName.charAt(0);

  return (
    <div className={`monogram ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="monogram-ring">
        <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="monogram-letters">
        {brideInitial}
        <span className="monogram-amp">&amp;</span>
        {groomInitial}
      </span>
    </div>
  );
}
