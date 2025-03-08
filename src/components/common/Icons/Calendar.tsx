export const Calendar = ({
  currentColor = "#12B76A",
  width = 32,
  height = 32,
}: {
  currentColor?: string;
  width?: number | string;
  height?: number | string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 9C5 7.89543 5.89543 7 7 7H25C26.1046 7 27 7.89543 27 9V11H5V9Z"
        fill={currentColor}
      />
      <path
        d="M5 24C5 25.1046 5.89543 26 7 26H25C26.1046 26 27 25.1046 27 24V12H5V24Z"
        fill="#CDD1D5"
      />
      <rect x="19.6665" y="18.6667" width="5.5" height="5.5" rx="1" fill={currentColor} />
      <path
        d="M9 6C9 5.44772 9.44772 5 10 5H12C12.5523 5 13 5.44772 13 6V8H9V6Z"
        fill={currentColor}
      />
      <path
        d="M19 6C19 5.44772 19.4477 5 20 5H22C22.5523 5 23 5.44772 23 6V8H19V6Z"
        fill={currentColor}
      />
    </svg>
  );
};
