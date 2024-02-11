import { asynchandler } from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser =asynchandler(async (req,res) => {
    // get user details from froentend
    // validation -not empty
    // check if already exist:username,email
    //check for images ,check for avatar
    // upload them to cloudinary,avatar
    // create user object - create entry in db
    // remove password and refeshtoken field from response
    //check for user connection
    //return res

    const { fullName,email,username,password } = req.body
    console.log("email: ", email);
    res.send("come")
    

    if (
        [fullName, email ,username,password].some((field) =>field?.trim() === "")
    
    ) {
        throw new ApiError(400," All fields are required")
    }

    const existedUser =User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"USER WITH EMAIL OR USERNAME ALREADY EXIST")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath) {
        throw new ApiError(409,"Avatar file iis required")
    }
    if(!avatarLocalPath) {
        throw new ApiError(409,"Avatar file iis required")
    }
  const avatar = await  uploadOnCloudinary(avatarLocalPath)
  const coverImage = await  uploadOnCloudinary(coverImageLocalPath) 
  if(!avatar) {
    throw new ApiError(409,"Avatar file iis required")
  }
 const user=await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })
 const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
 )
 if (!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
 }
 return res.status().json(
    new ApiResponse(200,createdUser,"User registerd successfully")   
 )

})
export {registerUser}