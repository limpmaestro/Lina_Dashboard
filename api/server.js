import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Mock-databas - ersätt med riktig databas senare
let calls = [];
let bookings = [];

// Hämta alla samtal
app.get('/api/calls', (req, res) => {
  res.json(calls);
});

// Hämta specifikt samtal
app.get('/api/calls/:id', (req, res) => {
  const call = calls.find(c => c.id === req.params.id);
  if (call) {
    res.json(call);
  } else {
    res.status(404).json({ error: 'Samtal hittades inte' });
  }
});

// Lägg till nytt samtal (anropas från din Twilio-server)
app.post('/api/calls', async (req, res) => {
  const callData = {
    id: Date.now().toString(),
    timestamp: new Date(),
    ...req.body
  };
  calls.unshift(callData);
  
  // Spara till fil (ersätt med databas)
  try {
    await fs.writeFile(
      path.join(__dirname, '../data/calls.json'), 
      JSON.stringify(calls, null, 2)
    );
  } catch (err) {
    console.error('Kunde inte spara samtal:', err);
  }
  
  res.status(201).json(callData);
});

// Hämta alla bokningar
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Lägg till ny bokning
app.post('/api/bookings', async (req, res) => {
  const bookingData = {
    id: Date.now().toString(),
    createdAt: new Date(),
    status: 'pending',
    ...req.body
  };
  bookings.push(bookingData);
  
  try {
    await fs.writeFile(
      path.join(__dirname, '../data/bookings.json'),
      JSON.stringify(bookings, null, 2)
    );
  } catch (err) {
    console.error('Kunde inte spara bokning:', err);
  }
  
  res.status(201).json(bookingData);
});

// Uppdatera bokning
app.patch('/api/bookings/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...req.body };
    res.json(bookings[index]);
  } else {
    res.status(404).json({ error: 'Bokning hittades inte' });
  }
});

// Hämta statistik
app.get('/api/statistics', (req, res) => {
  const stats = {
    totalCalls: calls.length,
    totalBookings: bookings.length,
    conversionRate: calls.length > 0 ? Math.round((bookings.length / calls.length) * 100) : 0,
    byTrade: {
      VVS: calls.filter(c => c.trade_type === 'VVS').length,
      EL: calls.filter(c => c.trade_type === 'EL').length,
      BYGG: calls.filter(c => c.trade_type === 'BYGG').length,
      SNICKERI: calls.filter(c => c.trade_type === 'SNICKERI').length,
    },
    urgentCalls: calls.filter(c => c.urgency === 'high').length
  };
  res.json(stats);
});

// Hämta inspelning
app.get('/api/recordings/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../recordings', req.params.filename);
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Dashboard API server körs på port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
});

export default app;