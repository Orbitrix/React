import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, slug }) {
  const to = slug ? `/post/${slug}` : `/post/${$id}`
  const src = featuredImage ? appwriteService.getFilePreview(featuredImage) : null

  return (
    <Link to={to} className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {src ? (
            <img src={src} alt={title} className='rounded-xl' />
          ) : (
            <div className='h-40 w-full bg-gray-200 rounded-xl flex items-center justify-center'>No image</div>
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
    </Link>
  )
}

export default PostCard