import jwt from 'jsonwebtoken';
import User from '../models/User';

import { checkPasswordHash } from '../services/auth';
import authConfig from '../config/auth';

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User / Password invalid.' });
    }

    if (!checkPasswordHash(user, password)) {
      return res.status(401).json({ error: 'User / Password invalid.' });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
