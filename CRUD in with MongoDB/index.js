const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.log('Cannot connect to MongoDb...', err.message));

//Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

//Model

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Tailwind',
        author: 'Girma',
        tags: ['tailwind', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);

}
async function getCourses() {
    //Comparision query operators

    // eq(equal)
    // ne(not equal)
    // lt(less than)
    // lte(less than or equal)
    // gt(greater than)
    // gte(greater than or equal)
    // in
    // nin (not in)
    //Logical Operators

    // or
    // and
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        //comparision

        // .find({ price: { $gt: 10, $lte: 20}})
        // .find({price: {in: [10, 15, 20]}})

        //logical

        //  .find()
        //  .or([ { author: 'Mosh'}, { isPublished: true}])
        //  .and([ { author: 'Mosh'}, { isPublished: true}])

        //Regular Expresions

        // Starts with Girma
        // .find({ author: /^Girma/})

        //ends with Addisu
        //    .find( { author: /Addisu$/})  //case sensitive
        //  .find( { author: /addisu$/i})  // case insensitve
        
        // contains 
        // .find( { author:/.*mosh.*/i})

        //Pagination
  
         .find({ author: 'Mosh', isPublished: true })
        //  .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tag: 1 })
        // .countDocuments();
    console.log(courses);
}

async function updateCourse(id) {
    
    // Qeury First Approach
    // const course = await  Course.findById(id);
    // if(!course) return;
    // first approach
    
    // course.isPublished = true;
    // course.author = 'Another Author';
    //second approach
    // course.set({
    //     name: 'Javascript',
    //     isPublished: false,
    //     tags: ['javascript', 'FrontEnd']
    // });
    // const result = await course.save();
    // console.log(result);

    //With out Query 

    // const result = await Course.updateOne({_id: id},{
    //     $set: {
    //         author: 'Jonalden',
    //         isPublished: false
    //     }
    // });
   
    // IF we want to see the updated document

    const course = await Course.findByIdAndUpdate(id,{
        $set: {
            author: 'Fikad Addisu',
            isPublished: false
        }
    }, { new: true});
    console.log(course);
    
    
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({_id: id});  // deleting one data
       const  result = await Course.deleteMany({isPublished: false})
    //    const course = await Course.findByIdAndDelete(id); //to fetch the deleted Data retruns null
    console.log(result);
    
}
removeCourse('5a68fdc3615eda645bc6bdec');