const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
	config.database, config.username, config.password, config,
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

// 1:N relation
db.User.hasMany(db.Post); 
db.Post.belongsTo(db.User); // sequelize will add column 'userId' to model 'Post'

// N:M relation ; need a relation table(PostHashtag; Post + Hashtag - postId, hashTagId colums)
// sequelize will add some methods (getHashtags, addHashtags, getPosts, addPosts etc.)
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });

// N:M realtion with the same table, ex) following function
// if both are the same table -> need to define model's name & columns in that model(relation table) 
db.User.belongsToMany(db.User, {
	foreignKey: 'followingId',
	as: 'Followers', // the name used when the sequelize do join operation ; getFollowings, getFollowers, addFollowing, addFollower
	through: 'Follow',
});
db.User.belongsToMany(db.User, {
	foreignKey: 'followerid',
	as: 'Followings',
	through: 'Follow',
});

module.exports = db;


