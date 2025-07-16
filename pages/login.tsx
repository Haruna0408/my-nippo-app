// pages/login.tsx
import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import app from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      // 自動で useAuth が反応して画面遷移
    } catch (err) {
      console.error("ログインエラー:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">ログイン</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Googleでログイン
        </button>
      </div>
    </div>
  );
}
