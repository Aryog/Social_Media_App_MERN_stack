import React,{useEffect} from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { getTimelinePosts } from '../../actions/postAction'
// import { PostsData } from '../../Data/PostsData'
import { useDispatch, useSelector } from 'react-redux'
const Posts = () => {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.authReducer.authData);
  const {posts , loading} = useSelector((state)=> state.postReducer);
  console.log(posts);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])
  
  return (
    <div className="Posts">
        {loading ? "Fetching Posts...":posts.map((post,id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts