import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

export const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({ message: 'OctoFit Tracker API', endpoints: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'] });
});

apiRouter.get('/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ displayName: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('user').sort({ rank: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().populate('recommendedFor').sort({ difficulty: 1, title: 1 }));
  } catch (error) {
    next(error);
  }
});