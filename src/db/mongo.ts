import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

const mongoMemoryConnection = async () => {
	const replset = await MongoMemoryReplSet.create({
		replSet: { storageEngine: 'wiredTiger' },
		binary: {
			version: '4.2.0',
		},
	});
	await replset.waitUntilRunning();
	const uri = await replset.getUri();
	return {
		uri: uri,
	};
};

const mongodb = [];

if (process.env.NODE_ENV === 'test') {
	mongodb.push(
		MongooseModule.forRootAsync({
			useFactory: mongoMemoryConnection,
		}),
	);
} else {
	console.log('process.env.MONGO_URI', process.env.MONGO_URI);
	mongodb.push(MongooseModule.forRoot(process.env.MONGO_URI));
}

export { mongodb };
