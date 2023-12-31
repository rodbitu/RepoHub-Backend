import User from '../models/User';
import { createPasswordHash } from '../services/auth';

class UsersController {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        return res.status(422).json({ error: `User already exists.` });
      }

      const hashedPassword = await createPasswordHash(password);

      const newUser = await User.create({ email, password: hashedPassword });
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async index(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: `User not found.` });
      }

      return res.status(200).json(user);
    } catch (err) {}
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: `User not found.` });
      }

      const hashedPassword = await createPasswordHash(password);

      await user.updateOne({ email, password: hashedPassword });

      return res.status(200).json();
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: `User not found.` });
      }

      await user.deleteOne();
      return res.status(204).json();
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new UsersController();
