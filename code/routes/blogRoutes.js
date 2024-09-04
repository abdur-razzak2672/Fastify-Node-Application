const blogController = require('../controllers/blogControllers');
async function blogRoutes(fastify,) {
    fastify.get('/blogs', blogController.getBlogs);
    fastify.post('/blogs', blogController.createBlogs);
    // fastify.put('/blogs/:id', blogController.updateBlog);
    // fastify.delete('/blogs/:id', blogController.deleteBlog);    
    // fastify.get('/blogs/:id', blogController.getBlogById);
}
module.exports = blogRoutes;