import { asyncHandler } from "../utils/AsyncHandler.js";

const registerUser = asyncHandler( async (requestAnimationFrame, res) => {
  res.status(200).json({
    message: "Chai aur backend"
  })
} )



export {
  registerUser,
}