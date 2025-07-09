import { CSSProperties } from "react";
import { ApproveHazardousDocButton } from "./ApproveHazardousDocButton";

const style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "solid 2px",
  padding: "1rem",
  maxWidth: "25vw",
  minWidth: "300px",
} satisfies CSSProperties;

export default function page() {
  return (
    <>
      <div style={style}>
        <p>Document 1</p>
        <ApproveHazardousDocButton />
      </div>
      <noscript>Javascript is disabled</noscript>
    </>
  );
}
