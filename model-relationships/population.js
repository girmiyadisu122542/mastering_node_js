const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/relationships')
        .then(() => console.log('Mongodb Connected...'))
        .catch(err => console.log('Could not connect to the Database...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
     name: String,
     bio: String,
     website: String
}));    
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    let author = new Author({
        name,
        bio,
        website
    });
    const result = await author.save();
    console.log(result);
    
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
}
 async function listCourses() {
    const courses = await Course
    .find()
    .populate('author','name -_id')
    .select('name author');
    console.log(courses);
    
 }   

//  createAuthor('Mule', 'node js developer', 'https:google.com/girmay');
 createCourse('Laravel', '671f943e1df6505a5105f66e');


  listCourses();