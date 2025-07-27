// app/new/page.tsx 日報登録ページ
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth } from 'firebase/auth'
import { db } from '@/lib/firebase' // ← firebaseConfigの初期化をここでやってる想定
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function NewReport() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const auth = getAuth()
    const user = auth.currentUser
    if (!user) {
      alert('ログインしてください')
      return
    }

    try {
      await addDoc(collection(db, 'reports'), {
        title,
        content,
        userId: user.uid,
        createdAt: serverTimestamp(),
      })

      router.push('/dashboard') // 登録後にダッシュボードへ移動
    } catch (error) {
      console.error('送信エラー:', error)
      alert('送信に失敗しました')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">日報を登録</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded h-40"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          登録する
        </button>
      </form>
    </div>
  )
}
