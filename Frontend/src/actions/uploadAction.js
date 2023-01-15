import * as UploadApi from '../api/UploadRequest'
export const uploadImage =(data)=>async(dispatch)=>{
    try {
        console.log("image upload started");
        const res = await UploadApi.uploadImage(data)
        console.log(res);
    } catch (error) {
        console.log(error)
    }
};