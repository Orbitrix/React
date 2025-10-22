import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function Home() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const res = await appwriteService.getPosts()
                console.log('getPosts response', res)
                if (!mounted) return
                if (res && res.documents) setPosts(res.documents)
                else setError('No documents returned')
            } catch (err) {
                console.error('getPosts error', err)
                if (mounted) setError(String(err))
            } finally {
                if (mounted) setLoading(false)
            }
        })()

        return () => { mounted = false }
    }, [])

    if (loading) return <div className='w-full py-8 text-center'>Loading posts...</div>
    if (error) return <div className='w-full py-8 text-center text-white'>Login to read posts <div className='w-full py-8 text-center text-red-600'>{error}</div></div>
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available yet
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/3'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home