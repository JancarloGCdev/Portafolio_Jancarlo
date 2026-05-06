import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0d1524 0%, #050913 100%)",
          borderRadius: 36,
          border: "4px solid rgba(34,211,238,0.4)",
        }}
      >
        <span style={{ color: "#22d3ee", fontSize: 96, fontWeight: 800, lineHeight: 1 }}>J</span>
        <span
          style={{
            marginTop: 4,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "rgba(244,244,245,0.92)",
          }}
        >
          JGC
        </span>
      </div>
    ),
    { ...size },
  );
}
