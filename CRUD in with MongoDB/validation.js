const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.log('Cannot connect to MongoDb...', err.message));

//Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'desktop'],
        lowercase: true,
        // uppercase: true,
        trim: true

    },
    author: String,
    //custom validation for tag
    tags: {
        type: Array,
        validate: {
            isAsync: true, //Async validator
            validator: function (v) {

                return new Promise(resolve => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        resolve(result);
                    }, 1000);
                });

            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

//Model

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Tailwind',
        category: 'Mobile',
        author: 'Girma',
        tags: 'WEB',
        isPublished: true,
        price: 15.49
    });
    try {
        // const result = await course.validate();
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {

        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }


}

createCourse();