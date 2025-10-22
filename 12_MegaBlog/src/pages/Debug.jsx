import React, { useEffect, useState } from 'react'
import authService from '../appwrite/auth'
import appwriteService from '../appwrite/config'

export default function Debug() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const u = await authService.getCurrentUser()
        if (!mounted) return
        setUser(u || null)
      } catch (e) {
        if (!mounted) return
        setErr((prev) => `${prev || ''}\ngetCurrentUser error: ${e}`)
      }

      try {
        const res = await appwriteService.getPosts()
        if (!mounted) return
        setPosts(res || null)
      } catch (e) {
        if (!mounted) return
        setErr((prev) => `${prev || ''}\ngetPosts error: ${e}`)
      }
    })()

    return () => { mounted = false }
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Debug</h1>
      {err && <pre className="text-red-600">{String(err)}</pre>}
      <section className="mb-6">
        <h2 className="font-semibold">Current User</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </section>
      <section>
        <h2 className="font-semibold">getPosts()</h2>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </section>
    </div>
  )
}
