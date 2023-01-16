import React,{useState,useMemo} from 'react'
import { getUser } from '../../api/UserRequest'

const Conversation = ({data,currentUserId,online}) => {
    // user to whom we have to chat
    const [userData, setUserData] = useState({})
    useMemo(() => {
        const userId = data.members.find((id)=>id!==currentUserId)
        const getUserData = async()=>{
            try {
                const {data} = await getUser(userId)
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    },[]);
    
  return (
    <>
    <div className="follower conversation">
        <div>
            {online && <div className="online-dot"></div>}
            <img src={userData.profilePicture ? process.env.REACT_APP_UPLOAD_FOLDER + userData.profilePicture:process.env.REACT_APP_UPLOAD_FOLDER+"defaultProfile.png" }
             alt="" className='followerImage' style={{width:'50px',height:'50px'}}/>
            <div className="name" style={{fontSize: "0.8rem"}}>
                <span>{userData.firstname} {userData.lastname}</span>
                {online?<span>Online</span>:<span>Offline</span>}
            </div>
        </div>
    </div>
    <hr style={{width: '85%',border:'0.1px solid #ececec'}}/>
    </>
  )
}

export default Conversation