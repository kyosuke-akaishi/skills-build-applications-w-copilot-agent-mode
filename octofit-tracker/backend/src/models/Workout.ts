import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export const Workout = model('Workout', workoutSchema);