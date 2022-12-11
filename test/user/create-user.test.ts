import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
import * as _ from 'lodash';

import { AppModule } from '../../src/app.module';

jest.setTimeout(45000);

describe('Creat user as an admin', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;

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
  });

  it("POST '/user' Unauthorized without token", async () => {
    return request.post('/user').send(mockUser).set('Accept', 'application/json').expect(401).expect({ statusCode: 401, message: 'Unauthorized' });
  });

  it("POST '/user' Unauthorized without bearer", async () => {
    const loginResponse = await request.post('/login').send(mockAdminUser).set('Accept', 'application/json');
    const token = _.get(loginResponse, 'body.access_token', '');

    return request.post('/user').send(mockUser).set('Authorization', token).set('Accept', 'application/json').expect(401).expect({ statusCode: 401, message: 'Unauthorized' });
  });

  afterAll(async () => {
    await app.close();
  });
});
