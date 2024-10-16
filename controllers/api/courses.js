const Course = require('../../models/course');
const Application = require('../../models/application');
const User = require('../../models/user');

module.exports = {
    index,
    show,
    create,
    delete: deleteCourse
};

async function deleteCourse(req, res) {
    try {
        const applicationsDeleted = await Application.deleteMany({ course: req.params.id });
        const courseDeleted = await Course.findByIdAndDelete(req.params.id);
        console.log(`Deleted ${applicationsDeleted.deletedCount} applications related to course ${req.params.id}`);
        console.log(`Delete course ${courseDeleted}`);
        res.json({});
    } catch (err) {
        res.status(400).json(err);
    }
}

async function index(req, res) {
    const course = await Course.find({});
    if (!course) throw new Error();
    res.json(course);
}

async function show(req, res) {
    const course = await Course.findById(req.params.id);
    res.json(course);
}

async function create(req, res) {
    const { name, description, content, duration, skillLevel } = req.body;
    const creator = await User.findById(req.user.id);

    const course = new Course({
        name: name,
        description: description,
        content: content,
        duration: duration,
        skillLevel: skillLevel,
        createdBy: creator
    });

    const savedCourse = await course.save();
    res.json(savedCourse);
}