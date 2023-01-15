import React,{useState,useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import './PostShare.css'
import { uploadImage,uploadPost } from '../../actions/uploadAction';
function PostShare() {
    // eslint-disable-next-line
    const serverPublic = process.env.REACT_APP_UPLOAD_FOLDER
    const loading = useSelector((state)=>state.postReducer.uploading)
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    const {user} = useSelector((state)=>state.authReducer.authData)
    const onImageChange = (e)=>{
        if(e.target.files && e.target.files[0])
        {
            let img = e.target.files[0];
            setImage(img);
        }
    }
    const reset = ()=>{
        setImage(null);
        desc.current.value=""
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if(image)
        {
            const data= new FormData();
            const filename = Date.now() + image.name;
            data.append("name",filename)
            data.append("myfile",image)
            newPost.image = filename;
            console.log(newPost);
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error);   
            }
        }
        dispatch(uploadPost(newPost))
        reset()
    }
  return (
    <div className="PostShare">
       <img src={user.profilePicture? serverPublic+user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
    <div>
        <input type="text" placeholder="What's happening" ref={desc} required/>
    
    <div className="postOptions">
        <div className="option" style={{color:"var(--photo)"}} onClick={()=>imageRef.current.click()}>
        <i class="fa-solid fa-2x fa-image" ></i>
        &nbsp;Photo
        </div>
        <div className="option" style={{color:"var(--video)"}}>
        <i class="fa-solid fa-2x fa-circle-play"></i>
        &nbsp;Video
        </div>
        <div className="option" style={{color:"var(--location)"}}>
        <i class="fa-solid fa-2x fa-location-dot"></i>
        &nbsp;Location
        </div>
        <div className="option" style={{color:"var(--shedule)"}}>
        <i class="fa-solid fa-2x fa-calendar-days"></i>
        &nbsp;Schedule
        </div>
        <button className='ps-button button' onClick={handleSubmit} disabled={loading}>
            {loading?"Uploading...":"Share"}
        </button>
        <div style={{display:'none'}}>
            <input type="file" name='myfile' ref={imageRef} onChange={onImageChange}/>
        </div>
    </div>
    {
    image && <div className="previewImage">
        <i class="fa-solid fa-xmark" onClick={()=>setImage(null)}></i>
        <img src={URL.createObjectURL(image)} alt="" />
    </div> 
    }
    </div>
    </div>
  )
}

export default PostShare