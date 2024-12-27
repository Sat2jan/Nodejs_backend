import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from  "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinaryservice.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username or email
  // check for images, check for avatar
  // upload them  to cloudinary, avtar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  
  const {fullName, email, username, password} = req.body
  console.log("email: ", email);

  // if (fullName) {
  //   throw new ApiError(400, "fullname is required")
  // }


  // get user details from frontend
  if (
    [fullName, email, username, password].some((field) => field?.trim()== "")
  ) {
      throw new ApiError(400, "All field are required")
  }

   // validation - not empty
  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })

  // check if user already exists: username or email
  if (existedUser) {  
    throw new ApiError(409, "User with email or username already exists")
  }

    // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new  ApiError(400, "Avatar file is required")
  }


} )

  // upload them  to cloudinary, avtar
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverIamge = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required")
  }

    // create user object - create entry in db
    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverIamge?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })

      // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )

      // check for user creation
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
    }

      // return res

    return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully")
    )

export {
  registerUser,
}