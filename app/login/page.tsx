//20250727 app/login/page.tsxへ変更
'use client';

import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      console.error('ログインエラー:', err);
    }
  };

  return (
    <div>
      <h1>ログインページ</h1>
      <button onClick={handleLogin}>Googleでログイン</button>
    </div>
  );
}
