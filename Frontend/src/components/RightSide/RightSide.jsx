import React,{useState} from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="RightSide">
        <div className="navIcons">
            <img src={Home} alt="" />
            <i class="fa-solid fa-2x fa-gear"></i>
            <img src={Noti} alt="" />
            <img src={Comment} alt="" />
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