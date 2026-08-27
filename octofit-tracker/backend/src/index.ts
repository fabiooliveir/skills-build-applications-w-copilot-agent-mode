import express from 'express';
import mongoose from 'mongoose';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

const createListResponse = <T>(resource: string, results: T[]) => ({
  resource,
  count: results.length,
  baseUrl,
  results,
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_request, response) => {
  response.json(createListResponse('users', await User.find().lean()));
});

app.post('/api/users/', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json({ message: 'User created', user, baseUrl });
});

app.get('/api/teams/', async (_request, response) => {
  response.json(createListResponse('teams', await Team.find().populate('members').lean()));
});

app.post('/api/teams/', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json({ message: 'Team created', team, baseUrl });
});

app.get('/api/activities/', async (_request, response) => {
  response.json(createListResponse('activities', await Activity.find().populate('userId').lean()));
});

app.post('/api/activities/', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json({ message: 'Activity created', activity, baseUrl });
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(createListResponse('leaderboard', await Leaderboard.find().sort({ rank: 1 }).populate('userId').lean()));
});

app.post('/api/leaderboard/', async (request, response) => {
  const entry = await Leaderboard.create(request.body);
  response.status(201).json({ message: 'Leaderboard entry created', entry, baseUrl });
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(createListResponse('workouts', await Workout.find().lean()));
});

app.post('/api/workouts/', async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json({ message: 'Workout created', workout, baseUrl });
});

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db')
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });