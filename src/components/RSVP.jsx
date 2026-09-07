import { useState } from "react";
import Reveal from "./Reveal";
import "./RSVP.css";

const initialForm = {
  name: "",
  attending: "",
  guests: "1",
  message: "",
};

// Set in .env as VITE_RSVP_SCRIPT_URL — see apps-script/README.md for setup.
const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_SCRIPT_URL;

export default function RSVP() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!RSVP_ENDPOINT) {
      // No Google Sheet endpoint configured yet — see apps-script/README.md.
      console.warn(
        "VITE_RSVP_SCRIPT_URL is not set. RSVP was not sent anywhere:",
        form
      );
      setStatus("sent");
      return;
    }

    setStatus("sending");

    try {
      // Apps Script web apps don't return CORS headers, so the response is
      // opaque here (mode: "no-cors"). A resolved promise just means the
      // request went out — check the "RSVP" tab in the sheet to confirm rows
      // are landing, and Apps Script's execution log if something looks off.
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(form).toString(),
      });
      setStatus("sent");
    } catch (err) {
      console.error("RSVP submission failed:", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section id="rsvp" className="section rsvp">
        <div className="section-inner rsvp-thanks">
          <div className="eyebrow-rule" aria-hidden="true">
            <span />
          </div>
          <h2 className="rsvp-heading">Thank You</h2>
          <p className="rsvp-sub">
            Your RSVP has been recorded. We can't wait to celebrate with you!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="section rsvp">
      <div className="section-inner">
        <Reveal className="eyebrow-rule" aria-hidden="true">
          <span />
        </Reveal>
        <Reveal as="h2" className="rsvp-heading">
          RSVP
        </Reveal>
        <Reveal as="p" className="rsvp-sub" delay={80}>
          Kindly respond by the date on your invitation
        </Reveal>

        <Reveal as="form" className="rsvp-form" delay={150} onSubmit={handleSubmit}>
          <label className="rsvp-field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </label>

          <label className="rsvp-field">
            <span>Will you attend?</span>
            <select
              name="attending"
              required
              value={form.attending}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="yes">Yes, I'll be there</option>
              <option value="no">Sorry, I can't make it</option>
            </select>
          </label>

          <label className="rsvp-field">
            <span>Number of Guests</span>
            <input
              type="number"
              name="guests"
              min="1"
              max="10"
              value={form.guests}
              onChange={handleChange}
            />
          </label>

          <label className="rsvp-field">
            <span>Message</span>
            <textarea
              name="message"
              rows="3"
              value={form.message}
              onChange={handleChange}
              placeholder="Leave a note for the couple (optional)"
            />
          </label>

          <button type="submit" className="rsvp-submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send RSVP with Love"}
          </button>

          {status === "error" && (
            <p className="rsvp-error">
              Something went wrong sending that — please try again in a moment.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
