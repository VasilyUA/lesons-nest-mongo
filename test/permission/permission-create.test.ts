import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import supertest from 'supertest';
import _ from 'lodash';
import mongoose from 'mongoose';

// app module
import { AppModule } from '../../src/app.module';

// DB schemas user for registration
import { User, UserDocument } from '../../src/db/index';

// constants
import { USER_ROLES, PERMISSIONS } from '../../src/constants';

jest.setTimeout(45000);

describe('Create permissions for role', () => {
	let app: INestApplication;
	let request: supertest.SuperTest<supertest.Test>;

	let UserModel: mongoose.Model<UserDocument>;

	const roleName: string = 'support';

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

	it("POST '/permission' Creating permissions for role validation errors", async () => {
		const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
		const token = _.get(loginResponse, 'body.access_token', '');

		return request
			.post('/permission')
			.send({})
			.set('Authorization', `Bearer ${token}`)
			.set('Accept', 'application/json')
			.expect(400)
			.then(res => {
				const body = _.get(res, 'body', {});

				const errors = ['roleName - Повинно бути рядком, Введіть roleName', 'permissions - Масив не може бути порожнім, Повинно бути масивом, Введіть permissions'];

				body.forEach((error: any, index: number) => {
					expect(error).toBe(errors[index]);
				});
			});
	});

	it("POST '/permission' Creating permissions for role", async () => {
		const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
		const token = _.get(loginResponse, 'body.access_token', '');

		return request
			.post('/permission')
			.send({
				roleName,
				permissions: [...Object.values(PERMISSIONS)],
			})
			.set('Authorization', `Bearer ${token}`)
			.set('Accept', 'application/json')
			.expect(201)
			.then(res => {
				const body = _.get(res, 'body', {});

				const role = _.get(body, 'roleName');
				const permissions = _.get(body, 'permissions');

				expect(role).toBe(roleName);

				Object.values(PERMISSIONS).forEach((item: string) => {
					expect(permissions.includes(item)).toBeTruthy();
				});
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
