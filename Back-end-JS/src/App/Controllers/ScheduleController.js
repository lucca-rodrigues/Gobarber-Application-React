import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import User from '../Models/User';
import Appointment from '../Models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'user is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      // Faz uma lista com todos os agendamentos
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          // Pega uma data e horário inicial e final dos agendamentos selecionados
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      // Include  serve para pegar o dado de um Relacionamento
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });
    return res.json(appointments);
  }
}

export default new ScheduleController();
