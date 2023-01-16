import axios from 'axios'
const API = axios.create({baseURL:"http://localhost:5000"})

export const getMessages = (chatid)=>API.get(`/message/${chatid}`);

export const addMessage = (data)=>API.post('/message/',data);