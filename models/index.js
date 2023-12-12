const User = require('./User');
const VideoPost = require('./videoPost');
const Comment = require('./Comment');

User.hasMany(VideoPost, {
    foreignKey: 'user_id'
});

VideoPost.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

VideoPost.hasMany(Comment, {
    foreignKey: 'video_id'
});

Comment.belongsTo(VideoPost, {
    foreignKey: 'video_id'
});

module.exports = { User, VideoPost, Comment };