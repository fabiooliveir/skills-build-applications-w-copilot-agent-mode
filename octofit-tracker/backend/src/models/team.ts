import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    goal: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);