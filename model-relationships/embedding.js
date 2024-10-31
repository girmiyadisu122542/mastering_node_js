const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/embedding-practice')
    .then(() => console.log('mongodb connected...'))
    .catch(err => console.log('Could not connect to db...', err));

const authorSchema = mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = new mongoose.model('Author', authorSchema);

// const Course = mongoose.model('Course', new mongoose.Schema({
//     name: String,
//     author: authorSchema
// }));



// async function createCourse(name, author) {
//     const course = new Course({
//         name,
//         author
//     });

//     const result = await course.save();
//     console.log(result);

// }

// async function updateCourse(id) {

//     // const course = await Course.findById(id);
//     // course.author.name = 'Girmay Addisu';
//     // course.save();

//     //   await Course.findByIdAndUpdate(id, {
//     //     $set: {
//     //         'author.name': 'Samuel Temsegen'
//     //     }
//     //   });
//      await Course.findByIdAndUpdate(id, {
//         $unset: {
//             'author': ''
//         }
//     })


// }

// // createCourse('Node js', new Author({name: 'Girmay'}));
// updateCourse('672077681b8630fc6ab22f1a')


// using Array

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {

    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);

}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    course.authors.pull(authorId);
    course.save();
}

// createCourse('Laravel Mastering', [
//     new Author({ name: 'Girmay Addisu'}),
//     new Author({ name: 'Samuel'})
// ]);

//  addAuthor('6720a36547d63884b1164b28', new Author({ name: 'Muluken Zemed' }));

removeAuthor('6720a36547d63884b1164b28', '6720a779383b7d8ccbdedac8');

