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
        <Reveal as="h2" className="couple-heading">The Happy Couple</Reveal>

        <Reveal className="couple-grid" delay={100}>
          <article className="couple-card">
            <p className="couple-role">The Bride</p>
            <h3 className="couple-name">{couple.brideFullName}</h3>
            <p className="couple-lineage">
              Beloved daughter of
              <br />
              {couple.brideParents}
            </p>
          </article>

          <div className="couple-divider" aria-hidden="true" />

          <article className="couple-card">
            <p className="couple-role">The Groom</p>
            <h3 className="couple-name">{couple.groomFullName}</h3>
            <p className="couple-lineage">
              Beloved son of
              <br />
              {couple.groomParents}
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
