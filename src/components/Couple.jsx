import { couple } from "../data/weddingData";
import Reveal from "./Reveal";
import "./Couple.css";

export default function Couple() {
  return (
    <section id="couple" className="section couple">
      <div className="section-inner">
        <Reveal className="eyebrow-rule" aria-hidden="true">
          <span />
        </Reveal>
        <Reveal as="h2" className="couple-heading gold-foil-heading">
          The Happy Couple
        </Reveal>

        <Reveal className="couple-grid" delay={100}>
          <article className="couple-card">
            <p className="couple-role">The Bride</p>
            <h3 className="couple-name gold-foil-heading">{couple.brideFullName}</h3>
            <p className="couple-lineage">
              Beloved daughter of
              <br />
              <span className="couple-parents">{couple.brideParents}</span>
            </p>
          </article>

          {/* Ornate Gold Ampersand & Line Divider */}
          <div className="couple-divider" aria-hidden="true">
            <span className="couple-divider-line" />
            <div className="couple-divider-badge">
              <span className="couple-amp">&amp;</span>
            </div>
            <span className="couple-divider-line" />
          </div>

          <article className="couple-card">
            <p className="couple-role">The Groom</p>
            <h3 className="couple-name gold-foil-heading">{couple.groomFullName}</h3>
            <p className="couple-lineage">
              Beloved son of
              <br />
              <span className="couple-parents">{couple.groomParents}</span>
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

