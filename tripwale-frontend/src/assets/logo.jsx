const Logo = ({ size = 40 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none"
      className="logo-svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066CC" />
          <stop offset="100%" stopColor="#00A896" />
        </linearGradient>
      </defs>
      
      {/* Background Circle */}
      <circle cx="20" cy="20" r="20" fill="url(#logoGradient)" />
      
      {/* Compass Icon */}
      <path 
        d="M20 8L28 15L25 25L15 25L12 15L20 8Z" 
        fill="white" 
        stroke="white" 
        strokeWidth="1"
      />
      
      {/* Center Circle */}
      <circle cx="20" cy="20" r="4" fill="#0066CC" />
      
      {/* Direction Lines */}
      <path 
        d="M20 16L20 24M16 20L24 20" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Travel Markers */}
      <circle cx="14" cy="14" r="1.5" fill="#FF6B35" />
      <circle cx="26" cy="14" r="1.5" fill="#FF6B35" />
      <circle cx="26" cy="26" r="1.5" fill="#FF6B35" />
      <circle cx="14" cy="26" r="1.5" fill="#FF6B35" />
    </svg>
  );
};

export default Logo;