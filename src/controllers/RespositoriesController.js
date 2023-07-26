import Respositorie from '../models/Repository';
import User from '../models/User';

class RespositoriesController {
  async create(req, res) {
    try {
      const { user_id } = req.params;
      const { name, url } = req.body;

      const user = await User.findById(user_id);

      if (!user) {
        return res.status(404).json({ error: `User not found.` });
      }

      const repository = await Respositorie.findOne({ userId: user_id, url });

      if (repository) {
        return res.status(422).json({ error: `Repository already exists.` });
      }

      const newRepository = await Respositorie.create({
        name,
        url,
        userId: user_id,
      });

      return res.status(201).json(newRepository);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async index(req, res) {
    try {
      const { user_id } = req.params;
      const { q } = req.query;

      const users = await User.findById(user_id);

      if (!users) {
        return res.status(404).json({ error: `User not found.` });
      }

      let query = {};

      if (q) {
        query = { url: { $regex: q, $options: 'i' } };
      }

      const repositories = await Respositorie.find({
        userId: user_id,
        ...query,
      });

      return res.status(200).json(repositories);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { user_id, id } = req.params;

      const user = await User.findById(user_id);

      if (!user) {
        return res.status(404).json({ error: `User not found.` });
      }

      const repository = await Respositorie.findOne({
        userId: user_id,
        _id: id,
      });

      return res.status(200).json(repository);
    } catch (err) {}
  }

  async update(req, res) {
    try {
      const { user_id, id } = req.params;
      const { name, url } = req.body;

      const user = await User.findById(user_id);

      if (!user) {
        return res.status(404).json({ error: `User not found.` });
      }

      const repository = await Respositorie.findOne({
        userId: user_id,
        _id: id,
      });

      if (!repository) {
        return res.status(404).json({ error: `Repository not found.` });
      }

      const repositoryUpdated = await repository.updateOne({
        name,
        url,
      });

      return res.status(200).json();
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async delete(req, res) {
    try {
      const { user_id, id } = req.params;

      if (!user) {
        return res.status(404).json({ error: `User not found.` });
      }

      const repository = await Respositorie.findOne({
        userId: user_id,
        _id: id,
      });

      if (!repository) {
        return res.status(404).json({ error: `Repository not found.` });
      }

      await repository.deleteOne();

      return res.status(204).json();
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new RespositoriesController();
