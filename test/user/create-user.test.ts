import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import supertest from 'supertest';
import _ from 'lodash';
import mongoose from 'mongoose';

import { AppModule } from '../../src/app.module';
import { User, UserDocument } from '../../src/db/index';

import { USER_ROLES } from './../../src/constants';

jest.setTimeout(45000);

describe('Create user', () => {
	let app: INestApplication;
	let request: supertest.SuperTest<supertest.Test>;

	let UserModel: mongoose.Model<UserDocument>;

	const mockUser: object = { email: 'user@gmail.com', password: 'Пошта' };
	const mockAdminUser: object = { email: 'admin@gmail.com', password: 'Пошта' };

	beforeAll(async () => {
		jest.spyOn(console, 'log').mockImplementation(() => {}); // eslint-disable-line
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		request = supertest(app.getHttpServer());

		UserModel = moduleFixture.get<mongoose.Model<UserDocument>>(getModelToken(User.name));

		await UserModel.create({ ...mockAdminUser, roles: [USER_ROLES.ADMIN] });
	});

	it("POST '/user' Unauthorized without token", async () => {
		return request.post('/user').send(mockUser).set('Accept', 'application/json').expect(401).expect({ statusCode: 401, message: 'Unauthorized' });
	});

	it("POST '/user' Unauthorized without bearer", async () => {
		const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
		const token = _.get(loginResponse, 'body.access_token', '');

		return request.post('/user').send(mockUser).set('Authorization', token).set('Accept', 'application/json').expect(401).expect({ statusCode: 401, message: 'Unauthorized' });
	});

	it("POST '/user' Creating a user", async () => {
		const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
		const token = _.get(loginResponse, 'body.access_token', '');

		return request
			.post('/user')
			.send(mockUser)
			.set('Authorization', `Bearer ${token}`)
			.set('Accept', 'application/json')
			.expect(201)
			.then(res => {
				const body = _.get(res, 'body', {});

				expect(body.email).toBe(mockUser['email']);
			});
	});

	it("POST '/user' When user role was not found", async () => {
		const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
		const token = _.get(loginResponse, 'body.access_token', '');
		await UserModel.updateOne({ email: mockAdminUser['email'] }, { $set: { roles: [] } });

		return request.post('/user').send(mockUser).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(403).expect({ statusCode: 403, message: 'Немає доступу' });
	});

	it("POST '/user' When user was removed", async () => {
		const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
		const token = _.get(loginResponse, 'body.access_token', '');
		await UserModel.deleteOne({ email: mockAdminUser['email'] });

		return request.post('/user').send(mockUser).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(401).expect({ message: 'Ви не авторизовані' });
	});

	afterAll(async () => {
		await app.close();
	});
});
