import pkg from 'mongoose';
import role from './role.js';
const { connect } = pkg;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:mZqlup4PEAb%24ggZ@20.119.42.13:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';

connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Database connection successful');
	})
	.catch(err => {
		console.error(err);
	});
