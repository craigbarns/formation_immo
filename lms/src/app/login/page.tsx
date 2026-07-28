import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre espace apprenant MonPassFormation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginSkeleton() {
  return (
    <div className="formation-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="w-full max-w-md animate-pulse">
        <div className="mb-8 flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-zinc-200" />
        </div>
        <div className="h-8 rounded bg-zinc-200" />
        <div className="mt-4 h-4 rounded bg-zinc-200" />
        <div className="mt-8 space-y-4">
          <div className="h-12 rounded-xl bg-zinc-200" />
          <div className="h-12 rounded-xl bg-zinc-200" />
          <div className="h-12 rounded-xl bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}
