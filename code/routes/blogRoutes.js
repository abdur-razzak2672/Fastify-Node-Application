const blogController = require('../controllers/blogControllers');


async function blogRoutes(fastify, options){
    fastify.get('/blogs', blogController.getBlogs);
    // fastify.get('/blogs/:id', blogController.getBlogById);
     fastify.post('/blogs', blogController.createBlogs);
    // fastify.put('/blogs/:id', blogController.updateBlog);
    // fastify.delete('/blogs/:id', blogController.deleteBlog);
}
module.exports = blogRoutes;