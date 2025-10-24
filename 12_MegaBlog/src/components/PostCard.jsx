import React, { useState } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import { ImageCal } from './index'
import parse from 'html-react-parser'

function stripHtml(html = '') {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function PostCard({ $id, title, featuredImage, slug, content }) {
  const to = slug ? `/post/${slug}` : `/post/${$id}`
  const src = featuredImage ? appwriteService.getFilePreview(featuredImage) : null
  const [expanded, setExpanded] = useState(false)

  const plain = stripHtml(content || '')
  const EXCERPT_LENGTH = 150
  const excerpt = plain.length > EXCERPT_LENGTH ? plain.slice(0, EXCERPT_LENGTH).trim() + '...' : plain

  return (
    <div className="w-full">
      <Link
        to={to}
        className="block p-0 w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
        aria-label={title}
      >
        <div className="w-full h-48 md:h-56 lg:h-64 bg-gray-100 overflow-hidden">
          {src ? (
            <img src={ImageCal} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 truncate">{title}</h2>
          <div className="mt-2 text-sm md:text-base text-gray-700">
            {/* Excerpt hidden on small if needed */}
          </div>
        </div>
      </Link>

      {/* {plain && plain.length > EXCERPT_LENGTH && (
        <div className="mt-2 flex items-center px-1">
          <button
            onClick={() => setExpanded((s) => !s)}
            className="text-sm text-blue-600 hover:underline ml-2"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        </div>
      )} */}
    </div>
  )
}

export default PostCard