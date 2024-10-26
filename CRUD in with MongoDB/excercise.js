const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('MongoDb conected...'))
    .catch(err => console.log('Could not connected...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    author: String,
    price: Number,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    //    return await Course
    //                     .find({ isPublished: true, tags: 'backend'})
    //                     .sort({name: 1})
    //                     .select('name author') 
          return await Course
                        .find({isPublished: true, tags: { $in: ['frontend', 'backend']}})
                        .or([{price: { $gte: 15}}, {name: /.*by.*/i}])
                        .sort({price: -1}) // or '-price'
                        .select({name: 1, author: 1, price: 1}) //'name author price'
}
async function run() {
    const courses = await getCourses();
    console.log(courses);

}
run();