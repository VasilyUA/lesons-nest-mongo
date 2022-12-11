import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
import * as _ from 'lodash';

import { AppModule } from '../src/app.module';

jest.setTimeout(45000);

describe('Main', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {}); // eslint-disable-line
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    request = supertest(app.getHttpServer());
  });

  it("GET '/' Home page", () => request.get('/').set('Accept', 'application/json').expect(200).expect('Hello NestJS!'));

  it("GET '/404'  Not found", () =>
    request
      .get('/404')
      .expect(404)
      .expect((res) => {
        const body = _.get(res, 'body');

        expect(body).not.toBe(undefined);
        expect(body.error).toBe('Not Found');
        expect(body.message).toBe('Cannot GET /404');
      }));

  afterAll(async () => {
    await app.close();
  });
});
