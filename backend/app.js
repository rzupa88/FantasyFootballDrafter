const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Root route
app.get('/', (req, res) => {
  res.send('Fantasy Football Drafter Backend is running!');
});

// Temporary mock data route for players
app.get('/players', (req, res) => {
  const mockPlayers = [
    { id: 1, name: 'Patrick Mahomes', position: 'QB', team: 'Chiefs' },
    { id: 2, name: 'Justin Jefferson', position: 'WR', team: 'Vikings' },
    { id: 3, name: 'Christian McCaffrey', position: 'RB', team: '49ers' },
    { id: 4, name: 'Davante Adams', position: 'WR', team: 'Raiders' },
    { id: 5, name: 'Travis Kelce', position: 'TE', team: 'Chiefs' },
  ];

  const { position, team } = req.query;

  // Filter by position or team if query parameters are provided
  const filteredPlayers = mockPlayers.filter(player => {
    return (!position || player.position === position) &&
           (!team || player.team === team);
  });

  res.json(filteredPlayers);
});

// Route: Simulate a mock draft
app.post('/mock-draft', (req, res) => {
  const { numberOfTeams, rounds } = req.body;

  if (!numberOfTeams || !rounds) {
    return res.status(400).json({ error: 'Please provide numberOfTeams and rounds' });
  }

  // Sample player pool
  const playerPool = [
    'Patrick Mahomes', 'Justin Jefferson', 'Christian McCaffrey',
    'Josh Allen', 'Cooper Kupp', 'Derrick Henry',
    'Tyreek Hill', 'Travis Kelce', 'Nick Chubb',
  ];

  const draftResults = [];

  for (let round = 1; round <= rounds; round++) {
    const roundPicks = [];
    for (let team = 1; team <= numberOfTeams; team++) {
      const randomIndex = Math.floor(Math.random() * playerPool.length);
      const player = playerPool.splice(randomIndex, 1)[0]; // Remove picked player
      roundPicks.push({ round, team, player });
    }
    draftResults.push(roundPicks);
  }

  res.json({ draftResults });
});

// Route: Get a user's team
app.get('/team', (req, res) => {
  const team = [
    { name: 'Player 1', position: 'RB' },
    { name: 'Player 2', position: 'WR' },
  ];
  res.json(team);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
