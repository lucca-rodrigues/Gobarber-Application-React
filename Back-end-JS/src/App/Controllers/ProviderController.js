import User from '../Models/User';
import File from '../Models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(providers);
  }
}

// as = Renomeia o File para "Avatar";
// attributes = Faz a desesruturação dos dados para trazer apenas as informações necessárias

export default new ProviderController();
