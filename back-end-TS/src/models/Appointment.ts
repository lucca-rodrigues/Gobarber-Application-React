import { v4 as uuid } from 'uuid';
class Appointment {
  id: string;

  provider: string;

  date: Date;

  // Ommit oculta um campo do data
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
