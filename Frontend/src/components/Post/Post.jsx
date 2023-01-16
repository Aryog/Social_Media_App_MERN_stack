import React,{useState,useMemo} from 'react'
import './Post.css'

import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'
import { getUser } from '../../api/UserRequest'
import moment from 'moment'
const Post = ({data}) => {
  const serverPublic = process.env.REACT_APP_UPLOAD_FOLDER
  const {user} = useSelector((state)=> state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [firstname, setFirstname] = useState("Unknown")
  const [lastname, setLastname] = useState("")
  const [profilePic, setProfilePic] = useState("")
  // useEffect(() => {
    //   async function getPostUsername(){
      //     console.log(id)
      //     const{data}= getUser(data.userId);
      //       setFirstname(data.firstname);
      //       setLastname(data.lastname);
      //     }
      //     getPostUsername();
      // }, [id])
    let id = data.userId;
    useMemo(()=>{
    console.log(id);
    async function getPostUsername(){

      const {data} =await getUser(id);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setProfilePic(data.profilePicture);
    }
    getPostUsername();
  },[id])
  
  const handleLike = ()=>{
    setLiked((prev)=>!prev)
    likePost(data._id,user._id)
    liked? setLikes((prev)=> prev-1) : setLikes((prev)=> prev+1)
  }
  return (
    <div className="Post">
        <img className='timeline-image' src={data.image ? process.env.REACT_APP_UPLOAD_FOLDER+data.image:""} alt="" />
        <div className="postReact">
            <img src={liked?Heart: NotLike} alt="" style={{cursor: "pointer"}} onClick={handleLike}/>
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>
        <span style={{color:"var(--gray)",fontSize:'12px'}}>{likes} likes</span>
        <div className="detail">
          <div className='time'>{moment(data.createdAt).format('MMM Do, YYYY')}</div>
          <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <img src={profilePic.length!==0? serverPublic+profilePic : serverPublic + "defaultProfile.png"} alt="" className='followerImage'/>
            &nbsp;&nbsp;<span><b>{firstname} {lastname}</b></span>
          </div>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post