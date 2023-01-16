import React, { useState,useRef } from 'react'
import { useMemo,useEffect } from 'react';
import { addMessage, getMessages } from '../../api/MessageRequest';
import { getUser } from '../../api/UserRequest';
import EmojiPicker from 'emoji-picker-react';
// import EmojiSelector from '../../img/globalemoji.png'
// import {InputEmoji} from 'react-input-emoji'
import './ChatBox.css'
import moment from 'moment'
const ChatBox = ({ chat, currentUserId,setSendMessage,receiveMessage }) => {
    const [userData, setUserData] = useState({});
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const [isEmojiActive, setIsEmojiActive] = useState(false);
    const scroll = useRef()
    // receiving
    useEffect(()=>{
        if(receiveMessage!==null && receiveMessage.chatId===chat._id){
            setMessages([...messages,receiveMessage])
        }
    },[receiveMessage])
    // fetching
    useMemo(() => {
        const getUserData = async () => {
            try {
                const userId = chat.members.find((id) => id !== currentUserId)
                const { data } = await getUser(userId)
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) getUserData()
    }, [chat, currentUserId]);

    useEffect(() => {
      const fetchMessages = async()=>{
        try {
            const {data} = await getMessages(chat._id);
            setMessages(data);
        } catch (error) {
            console.log(error);
        }
      }
      if(chat!==null) fetchMessages();
    }, [chat])
    
    const handleChange = (e)=>{
        setNewMessage(e.target.value);
        setIsEmojiActive(false);
    }
    const handleSend = async (e)=>{
        e.preventDefault();
        const message = {
            senderId: currentUserId,
            text: newMessage,
            chatId: chat._id,
        }

        // send message to the database
        try {
            const {data}= await addMessage(message);
            // if message add was successfull appends to the state
            setMessages([...messages,data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }

        // send message to socket server
        const receiverId = chat.members.find((id)=>id!==currentUserId);
        // sending what is the recieverId to socket server
        // if the recieverId is in the array of active users in socket then
        // need to send the message
        setSendMessage({...message,receiverId})

    }

    // always scroll to the end of the chat
    useEffect(()=>{
        if(scroll.current!==undefined)
        scroll.current.scrollIntoView({behavior: "smooth"})
    },[messages])
    return (
        <>
            <div className="ChatBox-container">
                {chat ?
                <>
                    <div className="chat-header">
                        <div className="follower">
                            <div>
                                <img src={userData.profilePicture ? process.env.REACT_APP_UPLOAD_FOLDER + userData.profilePicture : process.env.REACT_APP_UPLOAD_FOLDER + "defaultProfile.jpg"}
                                    alt={process.env.REACT_APP_UPLOAD_FOLDER + "defaultProfile.png"} className='followerImage' style={{ width: '50px', height: '50px' }} />
                                <div className="name" style={{ fontSize: "0.8rem" }}>
                                    <span>{userData.firstname} {userData.lastname}</span>
                                </div>
                            </div>
                        </div>
                        <hr style={{width: '85%',border:'0.1px solid #ececec'}}/>
                    </div>
                    {/* Chatbox messages*/}
                    <div className="chat-body">
                        {messages.map((message)=>
                        (<>
                            <div ref = {scroll}
                            className={message.senderId === currentUserId?"message own":"message"}>
                                <span>{message.text}</span>
                                <span>{moment(message.createdAt).fromNow()}</span>
                            </div>
                        </>)
                        )}
                    </div>
                    {/** chat-sender */}
                    <div className="chat-sender">
                        <div>+</div>
                        {/* <InputEmoji value ={newMessage} onChange={handleChange}/> */}
                        <input type="text" name="message" value={newMessage} onChange= {handleChange} onClick={()=>setIsEmojiActive(false)}/>
                        {isEmojiActive && <EmojiPicker onEmojiClick={({emoji})=>{console.log(emoji);setNewMessage(`${newMessage}${emoji}`)}}/>}
                        <div style={{display:'flex',alignItems:'center',cursor:'pointer'}} onClick={()=>setIsEmojiActive((prev)=>!prev)}>🙂</div>
                        <div className="send-button button" onClick={handleSend}>Send</div>
                    </div>
                </>:<span className='chatbox-empty-message'>
                    Tap on a Chat to start Conversation...
                </span>
                }
            </div>
        </>
    )
}

export default ChatBox