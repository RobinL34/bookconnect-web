"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setStatus("success");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  if (status === "loading") return <p>Vérification en cours...</p>;
  if (status === "success") return <p>Email vérifié avec succès ✅</p>;
  return <p>Lien invalide ou expiré ❌</p>;
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}