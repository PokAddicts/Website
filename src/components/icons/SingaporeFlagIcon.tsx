export default function SingaporeFlagIcon({ className = "" }: { className?: string }) {
  const starPoints = "0,-2.1 0.49,-0.65 2.0,-0.65 0.78,0.25 1.24,1.7 0,0.8 -1.24,1.7 -0.78,0.25 -2.0,-0.65 -0.49,-0.65";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 20"
      className={className}
      role="img"
      aria-label="Singapore flag"
    >
      <rect width="30" height="20" rx="2" fill="#ffffff" />
      <path d="M2 0h26a2 2 0 012 2v8H0V2a2 2 0 012-2z" fill="#ED2939" />
      <circle cx="8" cy="5.6" r="3.4" fill="#ffffff" />
      <circle cx="9.6" cy="5.6" r="2.8" fill="#ED2939" />
      <g fill="#ffffff">
        {[
          [13.2, 3.2],
          [16.6, 3.2],
          [17.8, 5.6],
          [16.6, 8],
          [13.2, 8],
        ].map(([cx, cy]) => (
          <polygon key={`${cx}-${cy}`} points={starPoints} transform={`translate(${cx} ${cy}) scale(0.55)`} />
        ))}
      </g>
    </svg>
  );
}
