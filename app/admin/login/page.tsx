import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-5 py-20">
      <div className="w-full max-w-sm bg-pine border border-ember/30 p-8">
        <div className="text-ember text-xs tracking-[0.4em] font-display mb-3">ADMIN</div>
        <h1 className="font-display text-4xl tracking-wider mb-6">SIGN IN</h1>
        <LoginForm />
        <p className="mt-6 text-xs text-mist/70">
          Forgot the password? Reset <code className="text-ember">ADMIN_PASSWORD</code> in Netlify environment variables.
        </p>
      </div>
    </section>
  );
}
