// pages/dashboard.tsx
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <p>読み込み中...</p>;
  if (!user) return <p>未ログインです</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">ようこそ、{user.displayName} さん！</h1>
      <p>メールアドレス: {user.email}</p>
    </div>
  );
}
