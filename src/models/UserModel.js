const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },  //required password
  email: { type: String, required: true },
  description: String,
  ownedCourses: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
        completedVideos: [String], // chứa danh sách videoId đã học
        enrolledAt: { type: Date, default: Date.now }
      }
    ],
  createdCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  cart: Array,
});

UserSchema.statics.findByUserId = function (userId) {
  return this.findOne({ _id: userId });
};

module.exports = mongoose.model("user", UserSchema, "Users");