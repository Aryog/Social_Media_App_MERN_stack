import UserModel from "../Modals/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// get all user

export const getAllUsers = async(req,res)=>{
    try {
        let users = await UserModel.find();

        users = users.map((user)=>{
            const {password,...otherDetails} = user._doc
            return otherDetails
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error);
    }
}
// get a User

export const getUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if(user)
        {
            const {password, ...otherDetails}= user._doc
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json("No Such User Exists!");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// Update a user

export const updateUser = async(req,res)=>{
    const id = req.params.id;
    const {_id, currentUserAdminStatus, password} = req.body;
    if(id === _id)
    {
        try {
            if(password)
            {
                // User wants to update a password
                const salt = await bcrypt.genSalt(10);
                req.body.password =await  bcrypt.hash(password,salt)
            }
            // new: true for the updated data of the user.
            const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true})
            const token = jwt.sign({username: user.username,id:user._id},
                process.env.JWT_KEY,{expiresIn: "1h"})
            res.status(200).json({user,token});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    else {
        res.status(403).json("Access Denied! you can only update your own data");
    }
}

// Delete User

export const deleteUser = async( req, res)=>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus}= req.body;
    if(currentUserId===id || currentUserAdminStatus)
    {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json ("user Deleted Successfully");
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    else{
        res.status(403).json("You can only delete your own profile!");
    }
}

// Follow a User
export const followUser = async(req,res)=>{
    const id = req.params.id;
    const {_id} = req.body;
    // _id is the owners id
    if(_id === id)
    {
        res.status(403).json("Action forbidden");
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            // I am the following User
            const followingUser = await UserModel.findById(_id)
            
            if(!followUser.followers.includes(_id))
            {
                await followUser.updateOne({$push : {followers: _id}})
                await followingUser.updateOne({$push:{following: id}})
                res.status(200).json("User Followed!")
            }
            else
            {
                res.status(403).json("User is already followed by you!");
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}
// Unfollow a User
export const unfollowUser = async(req,res)=>{
    const id = req.params.id;
    const {_id} = req.body;
    if(_id === id)
    {
        res.status(403).json("Action forbidden");
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            // I am the following User
            const followingUser = await UserModel.findById(_id)
            
            if(followUser.followers.includes(_id))
            {
                await followUser.updateOne({$pull : {followers: _id}})
                await followingUser.updateOne({$pull:{following: id}})
                res.status(200).json("User UnFollowed!")
            }
            else
            {
                res.status(403).json("User is already unfollowed by you!");
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

