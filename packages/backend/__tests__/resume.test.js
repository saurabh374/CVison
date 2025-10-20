const request = require('supertest');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Resume = require('../models/resumeModel');
const userRoutes = require('../routes/userRoutes');
const resumeRoutes = require('../routes/resumeRoutes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Resume.deleteMany({});

  const res = await request(app).post('/api/users').send({
    username: 'testuser',
    password: 'password',
  });
  token = res.body.token;
  userId = res.body._id;
});

describe('Resume Routes', () => {
  it('should create a new resume', async () => {
    const res = await request(app)
      .post('/api/resumes')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.user).toEqual(userId);
  });

  it('should get all resumes for a user', async () => {
    await request(app)
      .post('/api/resumes')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const res = await request(app)
      .get('/api/resumes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });

  it('should not get resumes for another user', async () => {
    const otherUserRes = await request(app).post('/api/users').send({
      username: 'otheruser',
      password: 'password',
    });
    const otherToken = otherUserRes.body.token;

    await request(app)
      .post('/api/resumes')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const res = await request(app)
      .get('/api/resumes')
      .set('Authorization', `Bearer ${otherToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(0);
  });
});
