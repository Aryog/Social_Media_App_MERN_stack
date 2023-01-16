import React,{useState,useEffect} from 'react'
import './InfoCard.css'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest.js'
import { logOut } from '../../actions/AuthAction'
const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false)

    const dispatch = useDispatch()
    const params = useParams();

    const profileUserId = params.id
    // profile can be of the same user or another user
    const [profileUser, setProfileUser] = useState({})
    const {user} = useSelector((state)=>state.authReducer.authData)

    useEffect(() => {
        const fetchProfileUser = async()=>{
            if(profileUserId === user._id){
                setProfileUser(user)
            } else {
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser);
            }
        }
        fetchProfileUser();
    }, [user])
    
    const handleLogOut = ()=>{
        dispatch(logOut())
    }
    return (
    <div className="InfoCard">
        <div className="infoHead">
            <h4>
                Profile Info
            </h4>
            {user._id===profileUserId?(<div>
                <i className="fa-solid fa-user-pen" onClick={()=>{setModalOpened(true)}}></i>
                <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user}/>
            </div>):""}
            
        </div>
        <div className="info">
            <span><b>Status</b></span>
            <span> {profileUser.relationship}</span>
        </div>
        <div className="info">
            <span><b>Lives in</b></span>
            <span> {profileUser.livesIn}, {profileUser.country}</span>
        </div>
        <div className="info">
            <span><b>Works at</b></span>
            <span> {profileUser.worksAt}</span>
        </div>

        <button className="button logout-button" onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default InfoCard