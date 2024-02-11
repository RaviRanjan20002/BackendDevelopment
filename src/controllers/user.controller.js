import { asynchandler } from "../utils/asynchandler.js"

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



})
export {registerUser}