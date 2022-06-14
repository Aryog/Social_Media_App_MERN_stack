import React,{useState} from 'react'
import './InfoCard.css'
import ProfileModal from '../ProfileModal/ProfileModal'
const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="InfoCard">
        <div className="infoHead">
            <h4>
                Your Info
            </h4>
            <div>
                <i class="fa-solid fa-user-pen" onClick={()=>{setModalOpened(true)}}></i>
                <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
            </div>
        </div>
        <div className="info">
            <span><b>Status</b></span>
            <span> In Relationship</span>
        </div>
        <div className="info">
            <span><b>Lives in</b></span>
            <span> Kathmandu, Nepal</span>
        </div>
        <div className="info">
            <span><b>Works at</b></span>
            <span> Student</span>
        </div>

        <button className="button logout-button">Logout</button>
    </div>
  )
}

export default InfoCard