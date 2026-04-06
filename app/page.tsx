import Image from "next/image";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F3F4F6",
        padding: "24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <Image
          src="/logo-bookconnect.png"
          alt="Logo BookConnect"
          width={180}
          height={180}
          style={{
            margin: "0 auto 20px auto",
            height: "auto",
          }}
          priority
        />

        <h1
          style={{
            fontSize: "56px",
            lineHeight: 1,
            fontWeight: 500,
            color: "#5B2FD3",
            margin: "0 0 16px 0",
          }}
        >
          BookConnect
        </h1>

        <p
          style={{
            fontSize: "28px",
            lineHeight: 1.3,
            color: "#1E88E5",
            margin: 0,
            fontWeight: 400,
          }}
        >
          Share, discover, write
        </p>
      </div>
    </main>
  );
}