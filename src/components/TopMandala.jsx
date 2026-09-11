import mandalaSrc from "../assets/design.png";
import "./TopMandala.css";

export default function TopMandala() {
  return (
    <div className="top-mandala" aria-hidden="true">
      <img
        src={mandalaSrc}
        alt=""
        className="top-mandala-img"
        loading="eager"
      />
    </div>
  );
}

