import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import supertest from 'supertest';
import _ from 'lodash';
import mongoose from 'mongoose';

import { AppModule } from '../../src/app.module';
import { User, UserDocument } from '../../src/db/index';

import { USER_ROLES } from '../../src/constants';

jest.setTimeout(45000);

describe('Update user', () => {
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

		await UserModel.create(mockUser);
		await UserModel.create({ ...mockAdminUser, roles: [USER_ROLES.ADMIN] });
	});

	it("GET '/user' update user", async () => {
		const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
		const token = _.get(loginResponse, 'body.access_token', '');
		const user = await UserModel.findOne({ email: mockUser['email'] });
		const newEmail = mockUser['email'] + '1';

		return request
			.put(`/user/${user['_id']}`)
			.send({ ...mockUser, email: newEmail })
			.set('Authorization', `Bearer ${token}`)
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				const body = _.get(res, 'body');
				expect(body['email']).toBe(newEmail);
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
