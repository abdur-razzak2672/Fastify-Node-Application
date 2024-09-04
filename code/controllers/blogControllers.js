const blogService = require('../services/blogServices');

async function getBlogs(request, reply) {
    try {
        const blogs = await blogService.getAllBlogs();
        reply.status(200).send({
            status: 'success',
            statusCode: 200,
            message: 'Blogs fetched successfully',
            data: blogs
        });
    } catch (error) {
        reply.status(500).send({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
}

async function createBlogs(request, reply) {
    try {
        await blogService.uploadImage(request, reply);
    } catch (error) {
        console.error(error);
        reply.status(500).send({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
}


module.exports = {
    getBlogs,
    createBlogs
};