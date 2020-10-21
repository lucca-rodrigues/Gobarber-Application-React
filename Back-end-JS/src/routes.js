import { Router } from 'express';
import multer from 'multer';
import MulterConfig from './Config/Multer';

import UserController from './App/Controllers/UserController';
import SessionController from './App/Controllers/SessionController';
import FileController from './App/Controllers/FileController';
import ProviderController from './App/Controllers/ProviderController';
import AppointmentController from './App/Controllers/AppointmentController';
import AvailableController from './App/Controllers/AvailableController';
import ScheduleController from './App/Controllers/ScheduleController';
import NotificationController from './App/Controllers/NotificationController';
import AuthMiddleware from './App/Middlewares/Auth';

const routes = new Router();
const upload = multer(MulterConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware); // Aplica o Token aos elementos abaixo da lista de rotas
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
