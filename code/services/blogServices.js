const { v4: uuidv4 } = require('uuid');
const Blog   = require('../models/blogModel');
const fs = require('fs');
const path = require('path');


exports.getAllBlogs= async()=>{
    const blogs = await Blog.findAll();
    return blogs;
}

// exports.createBlog = async({image, title, description})=>{

//     image : ? 


//     const newBlog = await Blog.create({image, title, description});
//     return newBlog;
// }

exports.uploadImage = async (request, reply) => {
    try {
      if (!request.isMultipart()) {
        reply.status(400).send({
          status: 'error',
          statusCode: 400,
          message: 'Request must be multipart',
        });
        return;
      }
      const parts = request.parts();
      let fields = {};
      let file = null;
      for await (const part of parts) {
        if (part.file) {
          file = part;
        } else {
          fields[part.fieldname] = part.value;
        }
      }
      if (!file) {
        reply.status(400).send({
          status: 'error',
          statusCode: 400,
          message: 'Image file is required',
        });
        return;
      }
      const { title, description } = fields;
      const filename = uuidv4() + path.extname(file.filename);
      const uploadPath = path.join(__dirname, '..', 'uploads', filename);
       const writeStream = fs.createWriteStream(uploadPath);
      await new Promise((resolve, reject) => {
        file.file.pipe(writeStream);
        file.file.on('end', resolve);
        file.file.on('error', reject);
      });
  
      const newBlog = await Blog.create({
        image: uploadPath,
        title: title,
        description: description,
        author: "Abdur",
        views: 10,
      });
  
      reply.status(201).send({
        status: 'success',
        statusCode: 201,
        message: 'Blog created successfully',
        data: newBlog,
      });
    } catch (error) {
      console.error(error);
      reply.status(500).send({
        status: 'error',
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  };