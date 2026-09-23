import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.create([
      { username: 'maya.runner', email: 'maya@example.com', displayName: 'Maya Chen', grade: 10 },
      { username: 'liam.lifts', email: 'liam@example.com', displayName: 'Liam Brooks', grade: 11 },
      { username: 'sofia.steps', email: 'sofia@example.com', displayName: 'Sofia Ramirez', grade: 9 }
    ]);

    await Team.create([
      { name: 'Sunrise Sprinters', color: '#e76f51', members: [users[0]._id, users[2]._id] },
      { name: 'Peak Performers', color: '#2a9d8f', members: [users[1]._id] }
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 28, distanceMiles: 2.7, points: 54, completedAt: new Date('2026-09-20') },
      { user: users[1]._id, type: 'strength', durationMinutes: 35, points: 70, completedAt: new Date('2026-09-21') },
      { user: users[2]._id, type: 'walking', durationMinutes: 42, distanceMiles: 2.1, points: 42, completedAt: new Date('2026-09-22') }
    ]);

    await Leaderboard.create([
      { user: users[1]._id, points: 310, workoutsCompleted: 8, rank: 1 },
      { user: users[0]._id, points: 275, workoutsCompleted: 7, rank: 2 },
      { user: users[2]._id, points: 220, workoutsCompleted: 6, rank: 3 }
    ]);

    await Workout.create([
      { title: 'After-School Tempo Run', type: 'running', difficulty: 'intermediate', durationMinutes: 30, description: 'Alternate a comfortable pace with short faster intervals.', recommendedFor: [users[0]._id] },
      { title: 'Foundations Strength Circuit', type: 'strength', difficulty: 'beginner', durationMinutes: 25, description: 'Build full-body strength with controlled bodyweight movements.', recommendedFor: [users[1]._id, users[2]._id] }
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 2 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
