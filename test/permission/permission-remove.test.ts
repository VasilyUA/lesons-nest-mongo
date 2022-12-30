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
import { User, UserDocument, Permission, PermissionDocument } from '../../src/db/index';

// constants
import { USER_ROLES, PERMISSIONS } from '../../src/constants';

jest.setTimeout(45000);

describe('Get permissions for role', () => {
	let app: INestApplication;
	let request: supertest.SuperTest<supertest.Test>;

	let UserModel: mongoose.Model<UserDocument>;
	let PermissionModel: mongoose.Model<PermissionDocument>;

	const role: string = 'test-role_1';

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
		PermissionModel = moduleFixture.get<mongoose.Model<PermissionDocument>>(getModelToken(Permission.name));

		await UserModel.create({ ...mockAdminUser, roles: [USER_ROLES.ADMIN] });
		await PermissionModel.create({ roleName: role, permissions: [...Object.values(PERMISSIONS)] });
	});

	it("DELETE '/permission' Remove permissions by role name", async () => {
		const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
		const token = _.get(loginResponse, 'body.access_token', '');

		return request.delete(`/permission/${role}`).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).expect({ acknowledged: true, deletedCount: 1 });
	});

	afterAll(async () => {
		await app.close();
	});
});
