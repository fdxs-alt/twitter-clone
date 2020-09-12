import { TestingModule } from '@nestjs/testing';
import { User } from './../Shared/Entities/User.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createConn } from '../../test/CreateTestDB';
import supertest from 'supertest';
let repository: Repository<User>;
let app: INestApplication;
let CreateDBModule: TestingModule;

beforeAll(async () => {
    CreateDBModule = await createConn();
    app = CreateDBModule.createNestApplication();
    await app.init();
    repository = CreateDBModule.get('UserRepository');
});

describe('User routes testing', () => {
    it('Should return empty array', async () => {
        const { body } = await supertest
            .agent(app.getHttpServer())
            .get('/auth')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).toEqual([]);
    });

    it('Should return array of users', async () => {
        const newUser = repository.create({
            email: 'kuba1207@gmail.com',
            password: 'wojownik1234',
            name: 'Jakub',
            surname: 'string',
            phone: 123456789,
            userName: 'H',
        });

        await newUser.save();

        const { body } = await supertest
            .agent(app.getHttpServer())
            .get('/auth')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body).toHaveLength(1);
    });

    describe('register route', () => {
        it('Should create new user', async () => {
            const { text } = await supertest
                .agent(app.getHttpServer())
                .post('/auth/register')
                .send({
                    email: 'kuba1207710@gmail.com',
                    password: 'wojownik1234',
                    name: 'Jakubs',
                    surname: 'strings',
                    phone: 123456781,
                    username: 'Hm',
                })
                .set('Accept', 'application/json')
                .expect(201);

            expect(text).toEqual('true');
        });

        it('Should throw an error because user already exists in DB', async () => {
            const { body } = await supertest
                .agent(app.getHttpServer())
                .post('/auth/register')
                .send({
                    email: 'kuba1207710@gmail.com',
                    password: 'wojownik1234',
                    name: 'Jakubs',
                    surname: 'strings',
                    phone: 123456781,
                    username: 'Hm',
                })
                .set('Accept', 'application/json')
                .expect(400);
            expect(body).toMatchObject({ message: 'User already exists' });
        });

        it('Should throw an error because given data was wrong', async () => {
            const { body } = await supertest
                .agent(app.getHttpServer())
                .post('/auth/register')
                .send({
                    email: 'kuba1207710',
                    password: 'wojownik1234',
                    name: 'Jakubs',
                    surname: 'strings',
                    phone: 123456781,
                    username: 'Hm',
                })
                .set('Accept', 'application/json')
                .expect(400);
            expect(body).toMatchObject({
                message: 'Given value is not an email',
            });
        });
    });
    describe('Login route', () => {
        it('Throws validation error', async () => {
            const { body } = await supertest
                .agent(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'kuba1207710',
                    password: 'wojownik1234',
                })
                .set('Accept', 'application/json')
                .expect(400);
            expect(body).toMatchObject({
                message: 'Given value is not an email',
            });
        });

        it('Throws validation error: email does not exist', async () => {
            const { body } = await supertest
                .agent(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'kuba120771000000@gmail.com',
                    password: 'wojownik1234',
                })
                .set('Accept', 'application/json')
                .expect(401);
            expect(body).toMatchObject({
                message: 'Email or password is wrong',
            });
        });

        it('Throws validation error: password is wrong', async () => {
            const { body } = await supertest
                .agent(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'kuba1207710@gmail.com',
                    password: 'wojownssssik1234',
                })
                .set('Accept', 'application/json')
                .expect(401);
            expect(body).toMatchObject({
                message: 'Email or password is wrong',
            });
        });

        it('Return user and jwt', async () => {
            const { body } = await supertest
                .agent(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'kuba1207710@gmail.com',
                    password: 'wojownik1234',
                })
                .set('Accept', 'application/json')
                .expect(401);
            expect(body).toMatchObject({
                message: 'To log in, email confirmation is required',
            });
        });
    });
});

afterAll(async () => {
    await app.close();
});
