const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}
exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm
    // });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1) check if email and password exists
    if (!email || !password) return next(new AppError('Enter email or password', 400));

    //2, check if the user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Invalid email or password', 401));
    }

    //3 if everything is ok

    const token = signToken(user.id);

    res.status(200).json({
        status: 'success',
        token
    });
});

exports.protect = catchAsync(async (req, res, next) => {

    //1) Getting token and check of it's there
    let token;
    const header = req.headers.authorization
    if (header && header.startsWith('Bearer')) {
        token = header.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('Your are not logged in. Please login to get access', 401));
    }
    //2) verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3) check is user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belongs to this token does not longer exist.'), 401);
    }
    //4)check if the user is changed after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed the password! Please try again.', 401));
    }
    req.user = currentUser;

    next();
});