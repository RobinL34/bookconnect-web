"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [valid, setValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setValid(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-reset-token?token=${token}`)
      .then((res) => res.json())
      .then((data) => setValid(data.result))
      .catch(() => setValid(false));
  }, [token]);

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword: password }),
    });

    const data = await res.json();

    if (data.result) setDone(true);
  };

  if (valid === null) return <p>Chargement...</p>;
  if (!valid) return <p>Lien invalide ou expiré ❌</p>;
  if (done) return <p>Mot de passe modifié ✅</p>;

  return (
    <div>
      <h2>Nouveau mot de passe</h2>
      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Valider</button>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ResetPasswordContent />
    </Suspense>
  );
}