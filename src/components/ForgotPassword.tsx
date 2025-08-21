import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="text-center">
      <Link
        href="/forgot-password"
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Forgot your password?
      </Link>
    </div>
  );
}
