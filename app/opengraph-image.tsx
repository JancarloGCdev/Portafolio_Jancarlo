import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/data";

export const alt = `${PROFILE.name} — Portafolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #050913 0%, #0c1828 50%, #050913 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 18% 18%, rgba(34,211,238,0.14), transparent 42%), radial-gradient(circle at 88% 12%, rgba(74,222,128,0.1), transparent 38%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 920,
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(34, 211, 238, 0.9)",
              fontWeight: 600,
            }}
          >
            Portafolio interactivo
          </span>
          <span
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.12,
            }}
          >
            {PROFILE.name}
          </span>
          <span
            style={{
              fontSize: 24,
              color: "rgba(228, 228, 231, 0.95)",
              lineHeight: 1.45,
              maxWidth: 780,
            }}
          >
            {PROFILE.role}
          </span>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 14,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: 999,
                background: "#4ade80",
                boxShadow: "0 0 18px rgba(74,222,128,0.55)",
              }}
            />
            <span style={{ fontSize: 19, color: "#a1a1aa" }}>{PROFILE.status}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
