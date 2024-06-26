//I created an object of styles (homeStyles) only to practice another way to style a component.
import { homeStyles } from "../../public/styles"
import { Link } from "react-router-dom"
import CallToAction from "../components/CallToAction"
import { useEffect, useState } from "react"
import RecentArticle from "../components/RecentArticle"

export default function Home() {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchPost()
  },[])

  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 max-w-6xl mx-auto">
        <h3 className={homeStyles.h3Tag}>Welcome to Stacks Blog</h3>
        <p className={homeStyles.pTag}>Here you'll find a variety of articles and tutorials on topics such as
           web development, software engineering,
            and programming languages. </p>
        <Link to="/search" className={homeStyles.linkTag}>View all posts</Link>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div  className="flex flex-wrap gap-4 ">
              {posts.map((post, index) => (
                <RecentArticle key={index} post={post} />
                ))}
            </div>
            <Link to="/search" className="text-lg text-teal-500 hover:underline text-center">
              View all post
            </Link>
          </div>
          )}
      </div>

      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>


    </div>
  )
}
