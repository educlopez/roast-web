type CursorLabelProps = {
  label: string;
  color: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
};

export function CursorLabel({
  label,
  color,
  backgroundColor,
  textColor = "text-light-primary",
  className = "",
}: CursorLabelProps) {
  const bgColor = backgroundColor ?? color;
  const isTailwindClass = textColor.startsWith("text-");
  const textColorStyle = isTailwindClass ? undefined : { color: textColor };
  const textColorClass = isTailwindClass ? textColor : "";

  return (
    <div className={`relative flex items-center gap-1 ${className}`}>
      <svg
        className="-top-4 -left-4 absolute"
        fill="none"
        height="32"
        viewBox="0 0 33 32"
        width="33"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>LCursor</title>
        <g filter="url(#filter0_d_2399_8896)">
          <path
            clipRule="evenodd"
            d="M3.43938 2.93938C3.85531 2.52345 4.47597 2.38901 5.02673 2.59555L16.0267 6.72055C16.6416 6.95111 17.035 7.55477 16.9976 8.21034C16.9603 8.86592 16.5009 9.421 15.8638 9.58026L11.237 10.737L10.0803 15.3638C9.921 16.0009 9.36592 16.4603 8.71034 16.4976C8.05477 16.535 7.45111 16.1416 7.22055 15.5267L3.09555 4.52673C2.88901 3.97597 3.02345 3.35531 3.43938 2.93938Z"
            fill="white"
            fillRule="evenodd"
          />
        </g>
        <path
          clipRule="evenodd"
          d="M4.67561 3.53185C4.49202 3.463 4.28514 3.50782 4.14649 3.64646C4.00785 3.7851 3.96303 3.99199 4.03188 4.17558L8.15688 15.1756C8.23373 15.3805 8.43495 15.5117 8.65348 15.4992C8.872 15.4868 9.05703 15.3336 9.11012 15.1213L10.4124 9.91232L15.6213 8.61009C15.8337 8.557 15.9868 8.37197 15.9992 8.15345C16.0117 7.93492 15.8805 7.7337 15.6756 7.65685L4.67561 3.53185Z"
          fill={color}
          fillRule="evenodd"
        />
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="20"
            id="filter0_d_2399_8896"
            width="20.0001"
            x="0"
            y="0.5"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
            />
            <feBlend
              in2="BackgroundImageFix"
              mode="normal"
              result="effect1_dropShadow_2399_8896"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_2399_8896"
              mode="normal"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`h-[18px] rounded-[2px] px-1 py-[1px] font-medium text-xs ${textColorClass}`}
        style={{
          backgroundColor: bgColor,
          ...(textColorStyle || {}),
        }}
      >
        {label}
      </div>
    </div>
  );
}
