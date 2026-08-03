import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import InventoryItem from './models/InventoryItem';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://')
  .then(() => console.log('Connected to Spoiler Alert DB'))
  .catch(err => console.error(err));

app.get('/api/inventory', async (req: Request, res: Response) => {
  const items = await InventoryItem.find();
  res.json(items);
});

app.post('/api/inventory', async (req: Request, res: Response) => {
  const newItem = new InventoryItem(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

app.listen(5000, () => console.log('Server running on port 5000'));