import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0d1524 0%, #050913 100%)",
          borderRadius: 7,
          border: "2px solid rgba(34,211,238,0.45)",
        }}
      >
        <span style={{ color: "#22d3ee", fontSize: 17, fontWeight: 800, lineHeight: 1 }}>J</span>
      </div>
    ),
    { ...size },
  );
}
