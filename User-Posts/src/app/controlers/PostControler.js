const Post = require('../models/Post.js');
class PostConrtoler {

    // [GET] /api/post
    // @des red post
    // @access private
    async getPostOfUser(req, res){
        try {
            //Populate tham số 1 : bảng model, tham số 2: giá trị muốn lấy ra
            const posts = await Post.find({ user : req.userId}).populate('user', ['username']);
            res.json({success: true , posts})
        }
        catch(err) {
            console.log(err);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    // [POST] /api/post
    // @desc create post with user access
    // @access private
    async createPost(req, res) {
        const { title, description, url, status } = req.body;

        //Simple validation
        if(!title) return res.status(400).json({success: false, message:'Title is required'});

        try{
            const newPost = new Post({
                title: title,
                description,
                url : url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            });

            await newPost.save();
            
            res.json({success: true, message: 'Happy learning!', post : newPost});
        }catch(err) {
            console.log(err);
            res.status(500).json({success: false, message: 'Internal server error'})
        }

    }

    // [PUT] /api/post/:id
    // @desc Update Post with user asscess
    // @access private
    async updatePostOfUser(req, res) {
        const { title, description, url, status } = req.body;

        if(!title)
        return res.status(400).json({success: false, message: 'Title is required'});

        try{
            let updatePost = {
                title: title,
                description: description || '',
                url : ( url.startsWith('https://') ? url : `https://${url}`) || '',
                status: status || 'TO LEARN'
            }
            const postUpdateCondition = { _id: req.params.id, user: req.userId };
            
            //Tham số 1: điều kiện update
            //Tham số 2: Dữ liệu cần update
            //{new : true} : trả về cho hàm với data vừa update
            updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new : true});
    
            //User not authorised to update post or post not found
            if(!updatePost)
                return res.status(401).json({success: false, message: 'Post not found or user not authorized'});
    
            res.json({success: true, message:'Excellent progess!', post: updatePost})
        }catch(err) {
            console.log(err);
            res.status(500).json({success:false, message: 'Internal server error'})
        }
       
    }
    // [DELETE] /api/post/:id
    // @desc Delete post with user access
    // @access private
    async deletePost(req, res) {
        try{
            const postDeleteCondition = { _id: req.params.id , user: req.userId };
            const deletePost = await Post.findOneAndDelete(postDeleteCondition);

            if(!deletePost)
            return res.status(400).json({success: false, message: 'Post not found or user not authorized'});

            res.json({success: true, postDelte : deletePost})

        }catch(err) {
            console.log(err);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = new PostConrtoler();