import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import * as supertest from 'supertest';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';

import { AppModule } from '../../src/app.module';
import { User, UserDocument } from '../../src/db/index';

jest.setTimeout(45000);

describe('Creat user as an admin', () => {
	let app: INestApplication;
	let request: supertest.SuperTest<supertest.Test>;
	let UserModel: mongoose.Model<UserDocument>;
	const mockUser: object = { email: 'user@gmail.com', password: 'Пошта' };

	beforeAll(async () => {
		jest.spyOn(console, 'log').mockImplementation(() => {}); // eslint-disable-line
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [
				{
					provide: getModelToken(User.name),
					useValue: mongoose.Model, // <-- Use the Model Class from Mongoose
				},
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		request = supertest(app.getHttpServer());

		UserModel = moduleFixture.get<mongoose.Model<UserDocument>>(getModelToken(User.name));
	});

	it("POST '/registration' Create user bedrequest", () => {
		const mockUser = {};
		return request
			.post('/registration')
			.send(mockUser)
			.set('Accept', 'application/json')
			.expect(400)
			.then(response => {
				const resData = _.get(response, 'body', []);
				const chekedData = ['email - Некоректний email, Повинно бути рядком, Введіть email, Має бути лише @gmail.com', 'password - Не менше 2 и не більше 5, Повинно бути рядком, Введіть пароль'];

				resData.forEach((item, index) => {
					expect(item).toBe(chekedData[index]);
				});
			});
	});

	it("POST '/registration' Create user success", async () => {
		return request
			.post('/registration')
			.send(mockUser)
			.set('Accept', 'application/json')
			.expect(201)
			.then(response => {
				const resData = _.get(response, 'body', {});
				expect(resData.access_token).toBeDefined();
				expect(resData.access_token.length).toBeGreaterThan(0);
			});
	});

	it("POST '/registration' Create user success", async () => {
		return request.post('/registration').send(mockUser).set('Accept', 'application/json').expect(400).expect({ statusCode: 400, message: 'Користувач з таким email існує' });
	});

	it("POST '/login' Check password hash", async () => {
		const user = await UserModel.findOne({ email: mockUser['email'] }).exec();
		expect(user.password).not.toBe(mockUser['password']);
	});

	it("POST '/login' Login user unauthorized", async () => {
		const mockUser = { email: '', password: '' };
		return request
			.post('/login')
			.send(mockUser)
			.set('Accept', 'application/json')
			.expect(401)
			.then(response => {
				const resData = _.get(response, 'body', {});
				expect(resData.message).toBe('Unauthorized');
			});
	});

	it("POST '/login' Login user success", async () => {
		return request
			.post('/login')
			.send(mockUser)
			.set('Accept', 'application/json')
			.expect(200)
			.then(response => {
				const resData = _.get(response, 'body', {});
				expect(resData.access_token).toBeDefined();
				expect(resData.access_token.length).toBeGreaterThan(0);
			});
	});

	it("POST '/login' Login user incorect email", async () => {
		return request
			.post('/login')
			.send({ ...mockUser, password: 'Поштаc' })
			.set('Accept', 'application/json')
			.expect(401)
			.then(res => {
				expect(res.body.message).toBe('Некоректний email або пароль');
			});
	});

	it("POST '/login' Login user success", async () => {
		await UserModel.deleteOne({ email: mockUser['email'] });
		return request
			.post('/login')
			.send(mockUser)
			.set('Accept', 'application/json')
			.expect(401)
			.then(res => {
				expect(res.body.message).toBe('Некоректний email або пароль');
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
