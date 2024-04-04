import { Spinner, Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CallToAction from "../components/CallToAction"
import CommentSection from "../components/CommentSection"
import RecentArticle from "../components/RecentArticle"

export default function PostPage() {
  const { postSlug } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(null)
  const [recentPost, setRecentPosts] = useState(null)

  useEffect(() => {
    const fetchPostBySlug = async () => {
      try {
        setLoading(true)
        console.log(postSlug)
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
        const data = await res.json()
        console.log(data)
        console.log("fetchSlug")

        if (!res.ok) {
          setError(true)
          setLoading(false)
          return
        }

        if (res.ok) {
          console.log("Data received")
          setLoading(false)
          setPost(data.posts[0])
          setError(false)
        }
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log(error)
      }
    }
    fetchPostBySlug()
  }, [postSlug])

  useEffect(() => {
    try {
        const fetchRecentPost = async () => {
        const res = await fetch('/api/post/getposts?limit=3');
        const data = await res.json()
          if (res.ok) {
            setRecentPosts(data.posts)
            console.log(recentPost)
          }
        }
          fetchRecentPost()
        } catch (error) {
          console.log(error.message);
      }
  },[])

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    )

  console.log(post)
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen items-center '>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='md'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-[44em] object-cover '
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <div className="flex flex-col justify-center items-center mb-5">
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {recentPost && recentPost.map((recentpost, index) => (
                <RecentArticle key={index} post={recentpost} />
              ))}
            </div>
      </div>

    </main>
  )
}
