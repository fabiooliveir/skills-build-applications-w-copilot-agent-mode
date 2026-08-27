import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Alice Johnson', email: 'alice@example.com', fitnessLevel: 'advanced' },
      { name: 'Marco Silva', email: 'marco@example.com', fitnessLevel: 'intermediate' },
      { name: 'Priya Patel', email: 'priya@example.com', fitnessLevel: 'beginner' },
    ]);

    await Team.insertMany([
      { name: 'Power Squad', members: [users[0]._id, users[1]._id], goal: 'Strength' },
      { name: 'Cardio Crew', members: [users[1]._id, users[2]._id], goal: 'Endurance' },
    ]);
    await Activity.insertMany([
      { userId: users[0]._id, type: 'run', duration: 35, calories: 420, date: new Date('2026-08-27') },
      { userId: users[1]._id, type: 'cycle', duration: 50, calories: 560, date: new Date('2026-08-27') },
      { userId: users[2]._id, type: 'yoga', duration: 25, calories: 110, date: new Date('2026-08-26') },
    ]);
    await Leaderboard.insertMany([
      { userId: users[0]._id, score: 980, rank: 1 },
      { userId: users[1]._id, score: 910, rank: 2 },
      { userId: users[2]._id, score: 760, rank: 3 },
    ]);
    await Workout.insertMany([
      { name: 'HIIT Blast', focus: 'strength', difficulty: 'moderate', durationMinutes: 30 },
      { name: 'Recovery Mobility', focus: 'mobility', difficulty: 'easy', durationMinutes: 20 },
      { name: 'Steady State Run', focus: 'endurance', difficulty: 'moderate', durationMinutes: 40 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
