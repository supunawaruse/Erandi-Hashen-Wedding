import { useEffect, useState } from "react";
import mandalaSrc from "../assets/design.png";
import "./TopMandala.css";

export default function TopMandala() {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const image = new Image();
    image.src = mandalaSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(image, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = frame;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;
        if (brightness < 36) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(frame, 0, 0);
      setSrc(canvas.toDataURL("image/png"));
    };
  }, []);

  if (!src) return <div className="top-mandala" aria-hidden="true" />;

  return (
    <div className="top-mandala" aria-hidden="true">
      <img src={src} alt="" />
    </div>
  );
}
