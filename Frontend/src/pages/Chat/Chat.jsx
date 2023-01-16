import React, { useState, useEffect,useRef,useMemo } from 'react'
import { useSelector } from 'react-redux'
import './Chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import { Link } from 'react-router-dom'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import ChatBox from '../../components/ChatBox/ChatBox'
import {io} from 'socket.io-client'
const Chat = () => {

    const { user } = useSelector((state) => state.authReducer.authData)
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const socket = useRef()

    // send message to the socket server
    useEffect(()=>{
        if(sendMessage!==null){
            socket.current.emit('send-message',sendMessage);
        }
    },[sendMessage])

    

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data);
            } catch (error) {
                console.log(error)
            }
        }
        getChats();
    }, [user])

    useEffect(()=>{
        socket.current = io('http://localhost:8800')
        socket.current.emit("new-user-add",user._id)
        socket.current.on('get-users',(users)=>{
            setOnlineUsers(users);
            console.log(onlineUsers);
        })
    },[chats])


    // receive message from the socket server
    useEffect(()=>{
        socket.current.on("receive-message",(data)=>{
            setReceiveMessage(data)
        })
    },[])

    const checkOnlineStatus=(chat)=>{
        // finding if the chat member in my chat list
        const chatMembers = chat.members.find((member)=>member!==user._id)
        // checking the chat member on socket if present
        const online = onlineUsers.find((user)=>user.userId === chatMembers)
        return online?true:false
    }
    return (
        <div className="Chat">
            {/*Left side */}
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">

                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => {
                            return (<div onClick={()=> setCurrentChat(chat)}>
                                <Conversation online={checkOnlineStatus(chat)} data={chat} currentUserId={user._id} />
                            </div>)
                        })}
                    </div>
                </div>
            </div>
            <div className="Right-side-chat">
                <div style={{ width: '20rem',alignSelf:'flex-end'}}>
                    <div className="navIcons">
                        <Link to='../home'><img src={Home} alt="" /></Link>
                        <i className="fa-solid fa-2x fa-gear"></i>
                        <img src={Noti} alt="" />
                        <Link to="../chat"><img src={Comment} alt="" /></Link>

                    </div>
                    {/* Chat body */}
                </div>
                {/**this componenet returns on conversation tap with the currentchat or current user */}
                    <ChatBox chat={currentChat} currentUserId = {user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
            </div>
        </div>
    )
}

export default Chat