require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const habitLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  sleep: Number,
  water: Number,
  exercise: Number,
  score: Number,
  status: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }
});

const challengeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  joined: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }
});

const badgeSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }
});

const userSchema = new mongoose.Schema({
  username: String,
  habitLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HabitLog' }],
  challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }]
});

const HabitLog = mongoose.model('HabitLog', habitLogSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
const Badge = mongoose.model('Badge', badgeSchema);
const User = mongoose.model('User ', userSchema);

const initialChallenges = [
  { id: 1, title: "Drink 2L Water Daily for 7 Days" },
  { id: 2, title: "Exercise 30 Minutes for 5 Days" }
];

app.post('/api/users', async (req, res) => {
  const { username } = req.body;
  const user = new User({ username });
  await user.save();
  
  await Challenge.insertMany(initialChallenges.map(challenge => ({ ...challenge, user: user._id })));
  
  res.json(user);
});

app.get('/api/habitlogs/:userId', async (req, res) => {
  const logs = await HabitLog.find({ user: req.params.userId }).sort({ date: -1 }).limit(30);
  res.json(logs);
});

app.post('/api/habitlogs/:userId', async (req, res) => {
  const { sleep, water, exercise, score, status } = req.body;
  const log = new HabitLog({ sleep, water, exercise, score, status, user: req.params.userId });
  await log.save();
  res.json(log);
});

app.get('/api/challenges/:userId', async (req, res) => {
  const challenges = await Challenge.find({ user: req.params.userId });
  res.json(challenges);
});

app.post('/api/challenges/join/:userId/:id', async (req, res) => {
  const id = req.params.id;
  const challenge = await Challenge.findOne({ id, user: req.params.userId });
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
  challenge.joined = true;
  await challenge.save();
  res.json(challenge);
});

app.post('/api/challenges/complete/:userId/:id', async (req, res) => {
  const id = req.params.id;
  const challenge = await Challenge.findOne({ id, user: req.params.userId });
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
  challenge.completed = true;
  challenge.joined = false;
  await challenge.save();

  let badgeName = '';
  if (id == 1) badgeName = 'Water Warrior';
  if (id == 2) badgeName = 'Exercise Enthusiast';
  if (badgeName) {
    const badgeExists = await Badge.findOne({ name: badgeName, user: req.params.userId });
    if (!badgeExists) {
      const badge = new Badge({ name: badgeName, user: req.params.userId });
      await badge.save();
    }
  }

  res.json(challenge);
});

app.get('/api/badges/:userId', async (req, res) => {
  const badges = await Badge.find({ user: req.params.userId });
  res.json(badges);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
