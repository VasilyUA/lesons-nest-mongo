import inquirer from 'inquirer';
import exampleSchedule from './example-schedule';

const JOBS = {
	'test-schedule': exampleSchedule,
};

const CHOICES = Object.keys(JOBS);

try {
	const { jobs } = await inquirer.prompt([
		{
			type: 'list',
			name: 'jobs',
			message: 'What job do you want to run?',
			choices: CHOICES,
		},
	]);

	JOBS[jobs]();
} catch (e) {
	console.log('error', e); // eslint-disable-line
	throw new Error('Sorry, something went wrong');
}
