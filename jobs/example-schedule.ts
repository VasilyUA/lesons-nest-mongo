import schedule from 'node-schedule';

export default function exampleSchedule(): void {
	const arr = [];

	let i: number = 0;

	const job = schedule.scheduleJob('*/1 * * * * *', function () {
		if (i < 5) {
			console.log('Work!'); // eslint-disable-line
			arr.push(i);
			i++;
		} else {
			console.log('Exit!'); // eslint-disable-line
			job.cancel();
		}
	});

	process.on('SIGINT', function () {
		schedule.gracefulShutdown().then(() => process.exit(0));
	});
}
