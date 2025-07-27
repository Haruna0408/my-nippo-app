// 20250727 app/dashboard/page.tsxへ構成変更 ダッシュボード
'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebaseのユーザー状態を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login'); // 未ログインならloginページへ
      }
      setLoading(false);
    });

    // クリーンアップ
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <main>
      <h1>ダッシュボード</h1>
      <p>こんにちは、{user?.displayName}さん</p>
      <button onClick={handleLogout}>ログアウト</button>
    </main>
  );
}

