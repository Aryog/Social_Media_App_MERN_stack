import React,{useState} from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import { Link } from 'react-router-dom'
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="RightSide">
        <div className="navIcons">
            <Link to='../home'><img src={Home} alt="" /></Link>
            <i className="fa-solid fa-2x fa-gear"></i>
            <img src={Noti} alt="" />
            <Link to="../chat"><img src={Comment} alt="" /></Link>
            
        </div>
        <TrendCard/>

        <button className="button r-button" onClick={()=>setModalOpened(true)}>
            Share
        </button>
            <ShareModal setModalOpened={setModalOpened} modalOpened={modalOpened}/>
    </div>
  )
}

export default RightSide