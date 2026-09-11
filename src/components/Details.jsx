import { couple, event, note } from "../data/weddingData";
import { CalendarIcon, ClockIcon, PinIcon } from "./Icons";
import Reveal from "./Reveal";
import "./Details.css";

function buildCalendarUrl() {
  const start = new Date(event.isoDateTime);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000); // default 5-hour block

  const fmt = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${couple.brideFirstName} & ${couple.groomFirstName} Wedding`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "We are excited to celebrate with you!",
    location: event.venueName,
    sf: "true",
    output: "xml",
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export default function Details() {
  return (
    <section id="details" className="section details">
      <div className="section-inner">
        <Reveal className="eyebrow-rule" aria-hidden="true">
          <span />
        </Reveal>

        <Reveal as="h2" className="details-heading gold-foil-heading">
          Wedding Details
        </Reveal>

        <Reveal className="details-card" delay={100}>
          <p className="details-event">{event.title}</p>
          <p className="details-date gold-foil-heading">{event.date}</p>

          <div className="details-grid">
            <div className="details-item">
              <div className="details-icon-badge" aria-hidden="true">
                <CalendarIcon className="details-icon" />
              </div>
              <span className="details-item-label">Day</span>
              <span className="details-item-value">{event.dayName}</span>
            </div>
            <div className="details-item">
              <div className="details-icon-badge" aria-hidden="true">
                <ClockIcon className="details-icon" />
              </div>
              <span className="details-item-label">Time</span>
              <span className="details-item-value">{event.time}</span>
            </div>
            <div className="details-item">
              <div className="details-icon-badge" aria-hidden="true">
                <PinIcon className="details-icon" />
              </div>
              <span className="details-item-label">Venue</span>
              <span className="details-item-value">{event.venueName}</span>
            </div>
          </div>

          <div className="details-actions">
            <a
              className="details-btn details-btn--outline"
              href={event.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>View Location</span>
            </a>
            <a
              className="details-btn details-btn--filled"
              href={buildCalendarUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <span>Add to Calendar</span>
            </a>
          </div>
        </Reveal>

        <Reveal className="note" delay={150}>
          <div className="note-quote-mark" aria-hidden="true">“</div>
          <h3 className="note-heading">{note.heading}</h3>
          <div className="note-body">
            {note.paragraphs.map((p, i) => (
              <p className="note-paragraph" key={i}>
                {p}
              </p>
            ))}
          </div>
          <div className="note-signoff" aria-hidden="true">
            <span className="note-signoff-line" />
            <span className="note-signoff-names">{couple.brideFirstName} &amp; {couple.groomFirstName}</span>
            <span className="note-signoff-line" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
