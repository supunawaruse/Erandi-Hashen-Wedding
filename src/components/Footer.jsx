import { contact, couple, event } from "../data/weddingData";
import Reveal from "./Reveal";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Reveal as="footer" className="footer">
      <div className="footer-inner">
        <p className="footer-thanks">
          Thank you for visiting our wedding website and being part of our
          love story. We can't wait to celebrate with you!
        </p>

        <div className="footer-columns">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="#details">Details</a>
            <a href="#rsvp">RSVP</a>
          </div>

          <div className="footer-col">
            <h4>Wedding Details</h4>
            <p>{event.date}</p>
            <p>{event.venueName}</p>
            <p>{couple.hashtag}</p>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            {contact.map((c) => (
              <p key={c.name}>
                {c.name} - {c.phone}
              </p>
            ))}
          </div>
        </div>

        <p className="footer-made">Made with love</p>
        <p className="footer-copy">
          © {year} {couple.brideFirstName} &amp; {couple.groomFirstName}'s
          Wedding
        </p>
      </div>
    </Reveal>
  );
}
