import { TestingModule } from '@nestjs/testing';
import { User } from './../Shared/Entities/User.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createConn } from '../../test/CreateTestDB';
let repository: Repository<User>;
let app: INestApplication;
let CreateDBModule: TestingModule;

beforeAll(async () => {
    CreateDBModule = await createConn();
    app = CreateDBModule.createNestApplication();
    await app.init();
    repository = CreateDBModule.get('UserRepository');
});

afterEach(async () => {
    await repository.count();
});

it('setting up test', () => {
    console.log('working');
});

afterAll(async () => {
    await app.close();
});
