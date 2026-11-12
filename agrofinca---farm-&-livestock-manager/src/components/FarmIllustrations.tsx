import React from 'react';

// ============================================================================
// 1. IMPROVED HIGH-DEFINITION GOLD FARM MEDALLION LOGO
// ============================================================================
export const GoldFarmEmblem: React.FC<{ size?: number; className?: string }> = ({
  size = 68,
  className = ''
}) => (
  <div
    style={{ width: size, height: size }}
    className={`relative rounded-full flex items-center justify-center shrink-0 select-none ${className}`}
  >
    {/* Outer rich gold metallic bevel rim with ambient shadow */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffe599] via-[#d49e38] to-[#6d4608] p-[3px] shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
      {/* Mid ring */}
      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#996a1a] via-[#5a3a0a] to-[#261803] p-[2.5px] flex items-center justify-center">
        {/* Inner satin gold disc with subtle radial sheen */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#f8d888] via-[#cf9b33] to-[#8f5d0e] flex items-center justify-center shadow-inner relative overflow-hidden">
          {/* Subtle light sweep */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent rotate-45 pointer-events-none" />

          {/* High-Definition Cow Head & Leaf Sprout Artwork */}
          <svg viewBox="0 0 100 100" className="w-[82%] h-[82%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.65)] relative z-10" fill="none">
            {/* Curved Golden Horns */}
            <path
              d="M30 38 C20 22 10 24 8 28 C12 36 24 40 28 42 Z"
              fill="#fff2cc"
              stroke="#b58728"
              strokeWidth="1.2"
            />
            <path
              d="M70 38 C80 22 90 24 92 28 C88 36 76 40 72 42 Z"
              fill="#fff2cc"
              stroke="#b58728"
              strokeWidth="1.2"
            />

            {/* Bull/Cow Ears */}
            <path
              d="M26 44 C16 42 12 50 16 54 C22 56 28 50 30 46 Z"
              fill="#3a2510"
              stroke="#e5b85e"
              strokeWidth="1"
            />
            <path
              d="M74 44 C84 42 88 50 84 54 C78 56 72 50 70 46 Z"
              fill="#3a2510"
              stroke="#e5b85e"
              strokeWidth="1"
            />

            {/* Cow Head Body */}
            <path
              d="M30 38 C34 32 42 29 50 29 C58 29 66 32 70 38 C72 46 71 62 67 72 C63 80 57 84 50 84 C43 84 37 80 33 72 C29 62 28 46 30 38 Z"
              fill="#261708"
            />

            {/* White/Cream Forehead Blaze */}
            <path
              d="M46 31 C48 31 52 31 54 31 C55 38 52 46 52 54 C54 57 56 59 56 61 C56 63 53 64 50 64 C47 64 44 63 44 61 C44 59 46 57 48 54 C48 46 45 38 46 31 Z"
              fill="#fefefe"
            />

            {/* Wide Friendly Muzzle */}
            <path
              d="M36 65 C36 61 42 59 50 59 C58 59 64 61 64 65 C65 72 61 78 50 78 C39 78 35 72 36 65 Z"
              fill="#df9d82"
              stroke="#733b1e"
              strokeWidth="1.2"
            />

            {/* Nostrils */}
            <ellipse cx="44" cy="68" rx="2.8" ry="2" fill="#2d1607" />
            <ellipse cx="56" cy="68" rx="2.8" ry="2" fill="#2d1607" />

            {/* Kind Eyes */}
            <ellipse cx="38" cy="48" rx="3.5" ry="3.8" fill="#140a02" />
            <ellipse cx="62" cy="48" rx="3.5" ry="3.8" fill="#140a02" />
            <circle cx="39" cy="47" r="1.3" fill="#ffffff" />
            <circle cx="63" cy="47" r="1.3" fill="#ffffff" />

            {/* Vibrant Emerald Leaf Sprout on Horn/Head */}
            <g transform="translate(4, -4)">
              <path
                d="M62 30 C72 16 86 18 89 26 C82 32 72 34 62 30 Z"
                fill="#4ade80"
                stroke="#15803d"
                strokeWidth="1.5"
              />
              <path
                d="M66 28 Q75 24 84 25"
                stroke="#166534"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M59 34 C63 26 73 28 73 34 C69 37 63 37 59 34 Z"
                fill="#86efac"
                stroke="#16a34a"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// 2. FULL COLOR ILLUSTRATED MENU ICONS (HOMOGENEOUS 3D/SOFT BADGES)
// ============================================================================

export const MenuIconBadge: React.FC<{
  type:
    | 'dashboard'
    | 'lots'
    | 'dairy'
    | 'beef'
    | 'horses'
    | 'laying_hens'
    | 'broilers'
    | 'goats'
    | 'pigs'
    | 'catalog'
    | 'crops'
    | 'calendar'
    | 'inventory'
    | 'business'
    | 'operators';
  size?: number;
}> = ({ type, size = 32 }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'dashboard':
        return {
          bg: 'from-amber-400 to-amber-600',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.6 20.6 21 20 21H15V14H9V21H4C3.4 21 3 20.6 3 20V9.5Z" fill="#fff" />
              <path d="M9 14H15V21H9V14Z" fill="#e5b85e" />
              <circle cx="12" cy="8" r="2" fill="#d97706" />
            </svg>
          )
        };
      case 'lots':
        return {
          bg: 'from-emerald-400 to-emerald-600',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="4" fill="#a7f3d0" />
              <path d="M2 12C6 10 10 14 14 11C18 8 20 12 22 10V20H2V12Z" fill="#10b981" />
              <line x1="4" y1="8" x2="20" y2="8" stroke="#047857" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="18" cy="7" r="1.5" fill="#fef08a" />
            </svg>
          )
        };
      case 'dairy':
        return {
          bg: 'from-sky-400 to-blue-600',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              <rect x="6" y="8" width="12" height="13" rx="3" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
              <path d="M8 8L9 3H15L16 8Z" fill="#bfdbfe" />
              <ellipse cx="12" cy="14" rx="3.5" ry="3" fill="#1e3a8a" />
              <path d="M12 11C10 11 9 13 9 15C9 17 12 18 12 18C12 18 15 17 15 15C15 13 14 11 12 11Z" fill="#60a5fa" />
            </svg>
          )
        };
      case 'horses':
        return {
          bg: 'from-purple-400 to-indigo-600',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              <path d="M5 20C6 17 6 12 8 9C9 7.5 12 6 15 7C17 7.5 19 9 19 12C19 14 17 15 16 16C15 17 15 20 15 20L5 20Z" fill="#fde047" />
              <path d="M8 9C9 6 13 4 17 5L15 8L18 9L16 12" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              <circle cx="15" cy="10" r="1" fill="#78350f" />
              {/* Horseshoe */}
              <path d="M8 15C6 15 5 17 5 19" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )
        };
      case 'laying_hens':
        return {
          bg: 'from-amber-300 to-yellow-600',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              {/* Woven Nest */}
              <path d="M4 14C4 18 8 20 12 20C16 20 20 18 20 14H4Z" fill="#b45309" />
              {/* Golden Eggs in nest */}
              <ellipse cx="9" cy="13" rx="3" ry="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
              <ellipse cx="14" cy="12" rx="3" ry="4" fill="#ffffff" stroke="#f59e0b" strokeWidth="1" />
              <ellipse cx="12" cy="14" rx="2.5" ry="3.5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
              {/* Hen head */}
              <circle cx="17" cy="8" r="3" fill="#dc2626" />
              <path d="M19 8L22 9L19 10Z" fill="#f59e0b" />
            </svg>
          )
        };
      case 'broilers':
        return {
          bg: 'from-emerald-400 to-teal-600',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              {/* Plump chicken body */}
              <path d="M6 14C6 9 10 7 15 8C19 9 20 13 19 16C18 19 14 20 10 20C7 20 6 17 6 14Z" fill="#ffffff" />
              {/* Comb & beak */}
              <path d="M15 6C16 4 18 5 18 7" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
              <path d="M19 10L22 11L19 12Z" fill="#f59e0b" />
              {/* Wing */}
              <path d="M10 14C11 12 14 12 15 15C14 17 11 17 10 14Z" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
            </svg>
          )
        };
      case 'goats':
        return {
          bg: 'from-cyan-400 to-teal-700',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              {/* Goat horns */}
              <path d="M9 7C7 4 4 4 3 6" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
              <path d="M15 7C17 4 20 4 21 6" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
              {/* Goat Head */}
              <path d="M8 8C7 11 8 16 12 18C16 16 17 11 16 8C14 7 10 7 8 8Z" fill="#ffffff" />
              {/* Beard */}
              <path d="M12 18L11 21L13 21Z" fill="#e2e8f0" />
              <ellipse cx="10" cy="11" rx="1" ry="1.5" fill="#1e293b" />
              <ellipse cx="14" cy="11" rx="1" ry="1.5" fill="#1e293b" />
            </svg>
          )
        };
      case 'pigs':
        return {
          bg: 'from-rose-400 to-pink-600',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              {/* Pig Ears */}
              <path d="M5 6L8 9L5 10Z" fill="#f43f5e" />
              <path d="M19 6L16 9L19 10Z" fill="#f43f5e" />
              {/* Pig Face */}
              <circle cx="12" cy="13" r="7" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
              {/* Snout */}
              <ellipse cx="12" cy="14" rx="3.5" ry="2.5" fill="#f472b6" />
              <circle cx="10.8" cy="14" r="0.8" fill="#881337" />
              <circle cx="13.2" cy="14" r="0.8" fill="#881337" />
              {/* Eyes */}
              <circle cx="9.5" cy="10.5" r="1" fill="#4c0519" />
              <circle cx="14.5" cy="10.5" r="1" fill="#4c0519" />
            </svg>
          )
        };
      case 'catalog':
        return {
          bg: 'from-orange-400 to-amber-700',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              <rect x="4" y="3" width="16" height="18" rx="3" fill="#ffffff" />
              <path d="M7 7H17M7 11H17M7 15H13" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 13L17 16L21 12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )
        };
      case 'crops':
        return {
          bg: 'from-lime-400 to-emerald-700',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              {/* Tomato */}
              <circle cx="10" cy="14" r="5" fill="#ef4444" />
              <path d="M10 9L9 7M10 9L12 7M10 9L10 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
              {/* Corn spike */}
              <path d="M16 8C18 10 18 14 15 17L19 19C21 16 20 11 18 7L16 8Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            </svg>
          )
        };
      case 'calendar':
        return {
          bg: 'from-emerald-400 to-teal-800',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              <rect x="3" y="4" width="18" height="17" rx="3" fill="#ffffff" />
              <path d="M3 8H21V5C21 4.4 20.6 4 20 4H4C3.4 4 3 4.4 3 5V8Z" fill="#10b981" />
              <circle cx="8" cy="13" r="1.5" fill="#047857" />
              <circle cx="12" cy="13" r="1.5" fill="#047857" />
              <circle cx="16" cy="13" r="1.5" fill="#047857" />
              <circle cx="8" cy="17" r="1.5" fill="#047857" />
              <circle cx="12" cy="17" r="1.5" fill="#e11d48" />
            </svg>
          )
        };
      case 'inventory':
        return {
          bg: 'from-violet-400 to-purple-700',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              <rect x="3" y="8" width="18" height="12" rx="2" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
              <path d="M8 8V5C8 4.4 8.4 4 9 4H15C15.6 4 16 4.4 16 5V8" stroke="#ea580c" strokeWidth="1.5" />
              <line x1="12" y1="12" x2="12" y2="16" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="14" r="3" fill="#ffffff" stroke="#9a3412" strokeWidth="1" />
            </svg>
          )
        };
      case 'business':
        return {
          bg: 'from-amber-400 to-emerald-600',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              {/* Money pouch */}
              <circle cx="10" cy="14" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              <text x="10" y="17" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">
                $
              </text>
              {/* Growth arrow */}
              <path d="M13 11L18 6M18 6H14M18 6V10" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )
        };
      case 'operators':
        return {
          bg: 'from-blue-400 to-slate-700',
          svg: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-xs" fill="none">
              <circle cx="12" cy="8" r="4" fill="#fed7aa" />
              <path d="M8 5C9 3 15 3 16 5L18 6H6L8 5Z" fill="#b45309" />
              <path d="M5 20C5 16 8 15 12 15C16 15 19 16 19 20H5Z" fill="#1e3a8a" />
            </svg>
          )
        };
      default:
        return {
          bg: 'from-stone-400 to-stone-600',
          svg: <circle cx="12" cy="12" r="6" fill="#fff" />
        };
    }
  };

  const badge = getBadgeStyle();

  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-xl bg-gradient-to-br ${badge.bg} flex items-center justify-center shadow-md p-1 shrink-0 border border-white/20`}
    >
      {badge.svg}
    </div>
  );
};

// ============================================================================
// 3. ENHANCED DASHBOARD KPI CARD ILLUSTRATIONS (HIGH CONTRAST & ARTFUL)
// ============================================================================

// Card 1: Cow Petting
export const CowPettingIllustration: React.FC<{ className?: string }> = ({ className = 'w-22 h-18' }) => (
  <svg viewBox="0 0 130 100" className={className} fill="none">
    {/* Human caring hand */}
    <g transform="translate(18, -4)">
      <path
        d="M92 12 C82 14 72 22 62 30 C56 35 48 40 42 42 C37 44 34 40 36 36 C38 32 44 26 52 20 C62 13 74 8 86 6 L92 12 Z"
        fill="#fed7aa"
        stroke="#ea580c"
        strokeWidth="1.2"
      />
      <path d="M38 38 C34 38 32 42 35 45 C38 48 44 46 47 42 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
      <path d="M43 43 C40 45 38 49 42 52 C46 54 50 49 50 45 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
    </g>

    {/* Holstein Cow Head */}
    <path
      d="M32 46 C28 36 18 38 16 43 C14 48 22 53 28 56 C26 66 26 78 34 88 C40 95 50 97 64 97 C78 97 88 95 94 88 C102 78 102 66 100 56 C106 53 114 48 112 43 C110 38 100 36 96 46 C90 40 80 38 64 38 C48 38 38 40 32 46 Z"
      fill="#452a16"
      stroke="#26170d"
      strokeWidth="1.5"
    />
    {/* Black & White Spots */}
    <path d="M56 40 C54 48 48 58 48 70 C48 75 56 76 64 76 C72 76 80 75 80 70 C80 58 74 48 72 40 Z" fill="#ffffff" />
    <circle cx="44" cy="52" r="6" fill="#1c1109" />
    <circle cx="84" cy="52" r="7" fill="#1c1109" />

    {/* Muzzle */}
    <ellipse cx="64" cy="85" rx="20" ry="11" fill="#fbcfe8" stroke="#be185d" strokeWidth="1" />
    <ellipse cx="56" cy="85" rx="3" ry="2.2" fill="#500724" />
    <ellipse cx="72" cy="85" rx="3" ry="2.2" fill="#500724" />

    {/* Big gentle eyes */}
    <ellipse cx="46" cy="62" rx="4.2" ry="4.5" fill="#1e1b18" />
    <ellipse cx="82" cy="62" rx="4.2" ry="4.5" fill="#1e1b18" />
    <circle cx="47" cy="60" r="1.5" fill="#ffffff" />
    <circle cx="83" cy="60" r="1.5" fill="#ffffff" />

    {/* Polished horns */}
    <path d="M30 44 C24 32 16 34 14 36 C16 40 24 43 29 45 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
    <path d="M98 44 C104 32 112 34 114 36 C112 40 104 43 99 45 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
  </svg>
);

// Card 2: Muscular Beef Bull
export const BeefBullIllustration: React.FC<{ className?: string }> = ({ className = 'w-26 h-18' }) => (
  <svg viewBox="0 0 150 100" className={className} fill="none">
    {/* Muscular body of beef steer */}
    <path
      d="M32 44 C36 34 46 28 60 30 C72 32 90 30 108 34 C120 36 130 32 136 37 C139 40 138 48 134 52 C130 57 124 62 122 72 L118 92 L108 92 L110 68 L82 68 L80 92 L70 92 L74 64 L50 64 L48 92 L38 92 L40 58 C34 56 28 50 24 44 C22 38 28 36 32 44 Z"
      fill="#b45309"
      stroke="#78350f"
      strokeWidth="1.5"
    />
    {/* Muscle shading & Zebu hump */}
    <path d="M46 31 C52 20 64 20 70 30 Z" fill="#92400e" stroke="#78350f" strokeWidth="1" />
    <path d="M26 48 C28 60 38 62 42 56 Z" fill="#92400e" />
    {/* Horns */}
    <path d="M26 36 C20 28 24 24 28 27 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
    {/* Tail */}
    <path d="M134 50 C138 58 141 72 142 82" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Card 3: Milk Jug with rich splashing milk
export const MilkJugIllustration: React.FC<{ className?: string }> = ({ className = 'w-22 h-18' }) => (
  <svg viewBox="0 0 110 100" className={className} fill="none">
    {/* Blue Glass Milk Jug */}
    <path
      d="M52 22 L78 15 C83 14 88 18 86 23 L76 40 C83 48 85 60 83 72 C80 84 68 92 54 92 C40 92 28 83 26 70 C24 57 28 46 38 38 L52 22 Z"
      fill="#60a5fa"
      stroke="#2563eb"
      strokeWidth="1.5"
    />
    <path
      d="M78 28 C90 32 92 50 82 60"
      stroke="#1d4ed8"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Splashing Milk Wave */}
    <path
      d="M50 24 C36 30 20 40 14 54 C10 63 12 74 20 78 C28 82 34 76 34 68 C34 58 42 48 52 44 Z"
      fill="#ffffff"
      stroke="#bfdbfe"
      strokeWidth="1.8"
    />
    {/* Cream drops */}
    <circle cx="16" cy="42" r="3.5" fill="#ffffff" stroke="#93c5fd" strokeWidth="0.8" />
    <circle cx="26" cy="32" r="2.5" fill="#ffffff" />
    <ellipse cx="12" cy="60" rx="4" ry="7" fill="#ffffff" />
  </svg>
);

// Card 4: Inventory Silo / Canister with Sprout
export const InventoryCanisterIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-18' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Steel can body */}
    <rect x="26" y="34" width="48" height="52" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
    {/* Lid & collar */}
    <path d="M32 34 L38 22 L62 22 L68 34 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="42" y="15" width="16" height="8" rx="2.5" fill="#94a3b8" />
    {/* Latches */}
    <path d="M26 44 C18 44 18 55 26 55" stroke="#64748b" strokeWidth="2.5" fill="none" />
    <path d="M74 44 C82 44 82 55 74 55" stroke="#64748b" strokeWidth="2.5" fill="none" />
    {/* Green Organic Sprout Shield */}
    <circle cx="50" cy="60" r="13" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
    <path d="M50 67 L50 56 M50 56 C45 51 40 55 43 60 C46 62 50 59 50 56 Z M50 56 C55 51 60 55 57 60 C54 62 50 59 50 56 Z" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Card 5: Hand Holding Money Bag
export const MoneyGainIllustration: React.FC<{ className?: string }> = ({ className = 'w-22 h-18' }) => (
  <svg viewBox="0 0 110 100" className={className} fill="none">
    {/* Green canvas sack */}
    <path
      d="M52 26 C48 24 48 18 54 18 C60 18 60 24 56 26 C68 28 82 40 80 60 C78 76 64 82 50 82 C36 82 24 74 24 58 C24 42 38 28 52 26 Z"
      fill="#10b981"
      stroke="#047857"
      strokeWidth="2"
    />
    <path d="M46 28 L62 28" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
    {/* Golden dollar symbol */}
    <circle cx="50" cy="56" r="11" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
    <text x="50" y="61" textAnchor="middle" fill="#854d0e" fontSize="15" fontWeight="extrabold" fontFamily="system-ui">
      $
    </text>
    {/* Supporting hand */}
    <path
      d="M96 68 C86 68 76 72 64 76 C54 80 48 78 46 75 C44 72 48 68 54 66 C64 64 74 62 84 62 L96 68 Z"
      fill="#fed7aa"
      stroke="#ea580c"
      strokeWidth="1.5"
    />
  </svg>
);

// Card 6: Brown Standing Cattle Silhouette
export const CattleProfileIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-18' }) => (
  <svg viewBox="0 0 140 100" className={className} fill="none">
    <path
      d="M28 48 C32 38 42 36 56 38 C72 40 88 38 104 40 C112 42 120 38 124 43 C128 47 126 56 122 61 C120 65 118 72 116 86 L108 86 L110 64 L86 64 L84 86 L76 86 L78 62 L54 62 L52 86 L44 86 L46 60 C38 60 32 55 28 50 Z"
      fill="#b45309"
      stroke="#78350f"
      strokeWidth="1.5"
    />
    <path d="M124 49 C128 57 131 70 131 78" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
    <circle cx="34" cy="45" r="1.5" fill="#fef08a" />
  </svg>
);
