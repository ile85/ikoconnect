import { ImageResponse } from "@vercel/og";

export default function generateOgImage({ title }) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d6efd",
          color: "white",
          width: "100%",
          height: "100%",
          padding: "4rem",
          fontSize: 48,
          fontFamily: "sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
