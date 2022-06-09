import React,{useState,useRef} from 'react'
import ProfileImage from '../../img/profileImg.jpg'
import './PostShare.css'
function PostShare() {
    // eslint-disable-next-line
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const onImageChange = (e)=>{
        if(e.target.files && e.target.files[0])
        {
            let img = e.target.files[0];
            setImage(
                {image: URL.createObjectURL(img)}
            );
        }
    }
  return (
    <div className="PostShare">
       <img src={ProfileImage} alt="" />
    <div>
        <input type="text" placeholder="What's happening" />
    
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
        <button className='ps-button button'>
            Share
        </button>
        <div style={{display:'none'}}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}/>
        </div>
    </div>
    {
    image && <div className="previewImage">
        <i class="fa-solid fa-xmark" onClick={()=>setImage(null)}></i>
        <img src={image.image} alt="" />
    </div> 
    }
    </div>
    </div>
  )
}

export default PostShare