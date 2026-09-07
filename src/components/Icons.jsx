const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function CalendarIcon(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v3.2M16 3v3.2" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 21s-6.75-6.06-6.75-11.25a6.75 6.75 0 0 1 13.5 0C18.75 14.94 12 21 12 21Z" />
      <circle cx="12" cy="9.75" r="2.25" />
    </svg>
  );
}
