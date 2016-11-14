const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Comment = db.define('Comment', {
    comment: Sequelize.STRING
});

module.exports = Comment;