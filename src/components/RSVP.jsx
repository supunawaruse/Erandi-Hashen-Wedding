import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";
import "./RSVP.css";

const initialForm = {
  name: "",
  attending: "",
  guests: "1",
  message: "",
};

const ATTENDING_OPTIONS = [
  { value: "yes", label: "Yes, I'll be there" },
  { value: "no", label: "Sorry, I can't make it" },
];

// Set in .env as VITE_RSVP_SCRIPT_URL — see apps-script/README.md for setup.
const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_SCRIPT_URL;

export default function RSVP() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownError, setDropdownError] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSelectAttending(val) {
    setForm((f) => ({ ...f, attending: val }));
    setDropdownOpen(false);
    setDropdownError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.attending) {
      setDropdownError(true);
      setDropdownOpen(true);
      return;
    }

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
          <h2 className="rsvp-heading gold-foil-heading">Thank You</h2>
          <p className="rsvp-sub">
            Your RSVP has been recorded with love. We can't wait to celebrate with you!
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
        <Reveal as="h2" className="rsvp-heading gold-foil-heading">
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

          <div className="rsvp-field">
            <span>Will you attend?</span>
            <div
              className={`rsvp-custom-select ${dropdownError ? "has-error" : ""}`}
              ref={dropdownRef}
            >
              <button
                type="button"
                className={`rsvp-select-trigger ${form.attending ? "has-value" : ""} ${
                  dropdownOpen ? "is-open" : ""
                }`}
                onClick={() => setDropdownOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span className="rsvp-select-text">
                  {form.attending
                    ? ATTENDING_OPTIONS.find((o) => o.value === form.attending)?.label
                    : "Select your response"}
                </span>
                <svg
                  className={`rsvp-select-chevron ${dropdownOpen ? "chevron-open" : ""}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <ul className="rsvp-dropdown-menu" role="listbox">
                  {ATTENDING_OPTIONS.map((opt) => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={form.attending === opt.value}
                      className={`rsvp-dropdown-item ${
                        form.attending === opt.value ? "is-selected" : ""
                      }`}
                      onClick={() => handleSelectAttending(opt.value)}
                    >
                      <span>{opt.label}</span>
                      {form.attending === opt.value && (
                        <span className="rsvp-item-check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {dropdownError && !form.attending && (
              <span className="rsvp-field-hint">
                Please select whether you will attend
              </span>
            )}
          </div>

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
