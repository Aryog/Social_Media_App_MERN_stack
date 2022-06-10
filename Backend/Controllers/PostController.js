import PostModel from "../Modals/PostModel.js";


//Create new Post

export const createPost = async(req,res)=>{
    const newPost = new PostModel(req.body)
    try {
        await newPost.save();
        res.status(200).json("Post Created");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get a post

export const getPost = async(req,res)=>{
    const id = req.params.id;
    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Update a post
export const updatePost = async(req,res)=>{
    const postId = req.params.id;
    const {userId} =req.body
    try {
        const post = await PostModel.findById(postId);
        if(post.userId === userId)
        {
            await post.updateOne({$set : req.body})
            res.status(200).json("Post Updated")
        }
        else{
            res.status(403).json("Action forbidden!");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Delete a Post

export const deletePost = async(req,res)=>{
    const postId = req.params.id;
    const {userId}= req.body;
    try {
        const post = await PostModel.findById(postId);
        if(post.userId === userId)
        {
            await post.deleteOne();
            res.status(200).json("Post Deleted Successfully!");

        }
        else{
            res.status(403).json("Action forbidden!");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// like/dislike a post

export const likePost = async(req,res)=>{
    const id = req.params.id;
    const {userId} = req.body;
    try {
        const post = await PostModel.findById(id)
        if(!post.likes.includes(userId))
        {
            // If not liked!
            await post.updateOne({$push: {likes:userId}});
            res.status(200).json("Post Liked");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
