import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function RecentArticle({post}) {
    const [articles, setArticles] = useState([])

  return (
    <div className="w-full md:flex-1 sm:flex-1 overflow-hidden group relative border border-teal-500 h-[350px]
         hover:shadow-md hover:shadow-gray-500 dark:hover:shadow-md dark:hover:shadow-white 
         rounded-lg sm:w-[430px]">
        <Link to={`/postq/${post.slug}`}>
            <img  src={post.image} className="w-full h-[260px] object-cover group-hover:h-[200px] 
            transition-all duration-300 z-20" alt="post image" />
        </Link>
        <div className="p-3 flex flex-col gap-2">
            <p className="text-lg font-semibold truncate">DanielDDDDDDDDDDDDDDDDDDDDDDDDDDDDD</p>
            <span className="italic text-sm">{post.category}</span>
            <Link to={`/post/${post.slug}`} 
                className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 
                border border-teal-500 text-teal-500 hover:bg-teal-500
              hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2">
                Read article
            </Link>
        </div>
    </div>
  )
}
