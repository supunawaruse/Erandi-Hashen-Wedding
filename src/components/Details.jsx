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

        <Reveal as="h2" className="details-heading">
          Wedding Details
        </Reveal>

        <Reveal className="details-card" delay={100}>
          <p className="details-event">{event.title}</p>
          <p className="details-date">{event.date}</p>

          <div className="details-grid">
            <div className="details-item">
              <CalendarIcon className="details-icon" />
              <span className="details-item-label">Day</span>
              <span className="details-item-value">{event.dayName}</span>
            </div>
            <div className="details-item">
              <ClockIcon className="details-icon" />
              <span className="details-item-label">Time</span>
              <span className="details-item-value">{event.time}</span>
            </div>
            <div className="details-item">
              <PinIcon className="details-icon" />
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
              View Location
            </a>
            <a
              className="details-btn details-btn--filled"
              href={buildCalendarUrl()}
              target="_blank"
              rel="noreferrer"
            >
              Add to Calendar
            </a>
          </div>
        </Reveal>

        <Reveal className="note" delay={150}>
          <h3 className="note-heading">{note.heading}</h3>
          {note.paragraphs.map((p, i) => (
            <p className="note-paragraph" key={i}>
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
