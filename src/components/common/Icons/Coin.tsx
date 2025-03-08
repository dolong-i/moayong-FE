export const Coin = ({
  width = 23,
  height = 23,
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="&#235;&#143;&#153;&#236;&#160;&#132;">
        <ellipse id="Ellipse 7483" cx="11.3175" cy="11.5" rx="11.3175" ry="11.5" fill="#F9BB00" />
        <g id="Mask group">
          <mask
            id="mask0_4001_1238"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="23"
            height="23"
          >
            <ellipse
              id="Ellipse 7485"
              cx="11.3175"
              cy="11.5"
              rx="11.3175"
              ry="11.5"
              fill="#F9BB00"
            />
          </mask>
          <g mask="url(#mask0_4001_1238)">
            <g id="Group 1597880569">
              <path
                id="Vector 974"
                d="M11.5 0V22.5"
                stroke="#FFCB2E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                id="Vector 975"
                d="M5.875 1.50732L17.125 20.9929"
                stroke="#FFCB2E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                id="Vector 976"
                d="M1.75684 5.625L21.2424 16.875"
                stroke="#FFCB2E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                id="Vector 977"
                d="M0.25 11.25L22.75 11.25"
                stroke="#FFCB2E"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                id="Vector 978"
                d="M1.75732 16.875L21.2429 5.625"
                stroke="#FFCB2E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                id="Vector 979"
                d="M5.875 20.9927L17.125 1.50711"
                stroke="#FFCB2E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
        <ellipse id="Ellipse 7484" cx="11.3183" cy="11.5008" rx="6.79048" ry="6.9" fill="#FFD861" />
      </g>
    </svg>
  );
};
