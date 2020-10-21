import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../Models/User';
import File from '../Models/File';
import authConfig from '../../Config/Auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação com erro de sessão' });
    }

    const { email, password } = req.body;

    // Verifica se o e-mail existe
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário inexistente!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const { id, name, avatar, provider } = user;
    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
