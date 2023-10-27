import BASE_URL from "./baseUrl";
import { commonStructure } from "./commonStructure";



//user reg

export const RegApi=async(body)=>{
    return await commonStructure('POST',`${BASE_URL}/user/register`,body)
}


//user login
export const LoginApi=async(body)=>{
    return await commonStructure('POST',`${BASE_URL}/user/login`,body)
}

//add image
export const addImageApi=async(body,header)=>{
    return await commonStructure('PATCH',`${BASE_URL}/user/image/add`,body,header)
}

//get image
export const getImageApi=async(body)=>{
    return await commonStructure('POST',`${BASE_URL}/get/image`,body)
}