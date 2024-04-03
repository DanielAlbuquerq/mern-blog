import { TextInput, Select, Button } from "flowbite-react"
import {useEffect, useState} from "react"
import RecentArticle from "../components/RecentArticle"
import {useLocation, useNavigate} from 'react-router-dom'

export default function Search() {
     const navigate = useNavigate()
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    })

    console.log(sidebarData)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const location = useLocation();

    useEffect(() => {
        console.log("useEffect activate")
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('sort')
        const categoryFromUrl = urlParams.get('category')

        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl
            })
        }
        
        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString()
            console.log("SearchQuery: " + searchQuery)

            const res = await fetch(`/api/post/getposts?${searchQuery}`)
                if(!res.ok){
                    console.log("res not OK")
                    setLoading(false)
                    return;
                }
                if(res.ok){
                const data = await res.json();
                setPosts(data.posts)
                setLoading(false)
                if(data.posts.length === 9){
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
            }
        }
            fetchPosts();
    },[location.search]);

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }
        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSidebarData({...sidebarData, sort: order})
        }
        if(e.target.id === 'category'){
            const category = e.target.value || 'uncategorized'
            setSidebarData({...sidebarData, category})
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('category', sidebarData.category)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    const handleShowMore = async () => {
        console.log('handleshowmore')
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex', startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data = await res.json();
            setPosts([...posts, ...data.posts])
            if(data.posts.length === 9){
                setShowMore(true)
            } else {
                setShowMore(false)
            }
        }
    }

  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 w-full border-b md:border-r md:min-h-screen md:w-6/12 lg:w-4/12 dark:bg-transparent bg-amber-100 border-gray-500">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="flex items-center gap-4">
                    <label className='whitespace-nowrap font-semibold'>Search Term: </label>
                    <TextInput placeholder='Search...'
                        id="searchTerm"
                        type="text"
                        value={sidebarData.searchTerm}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">Sort:</label>
                    <Select onChange={handleChange} defaultValue={sidebarData.sort} id='sort'>
                        <option value='desc'>Latest</option>
                        <option value='asc'>Oldest</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">Category:</label>
                    <Select onChange={handleChange} value={sidebarData.category} id='category'>
                        <option value='uncategorized'>uncategorized</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                        <option value='javascript'>JavaScript</option>
                    </Select>
                </div>
                <Button className="w-fit px-4" type='submit' outline gradientDuoTone='purpleToPink'>
                    Apply Filters
                </Button>
            </form>
        </div>
        <div className="flex flex-col w-full">
                <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Posts results</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {
                        !loading && posts.length === 0 && 
                            <p className='text-xl text-gray-500'>No posts found.</p>
                    }
                    {loading && <p className="text-xl text-gray-500">Loading...</p>}
                    {!loading && posts && posts.map((post) => (
                        <RecentArticle key={post._id} post={post}/>
                    ))}
                </div>
                {showMore && <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline"> Show More </button>}
        </div>
    </div>
  )
}
