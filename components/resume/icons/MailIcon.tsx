import React from "react";
import { Svg, Path, Rect } from "@react-pdf/renderer";

const MailIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = "black",
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Rect width="20" height="16" x="2" y="4" rx="2" />
    <Path d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Svg>
);

export default MailIcon;
