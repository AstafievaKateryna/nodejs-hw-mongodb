import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';

import { getAllContcats, getContactById } from './services/contacts.js';
const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: { target: 'pino-pretty' },
  });

  app.use(cors());
  app.use(pinoHttp({ logger }));

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContcats();

    res.send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (!contact) {
      return res
        .status(404)
        .send({ status: 404, message: 'Contact not found' });
    }

    res.send({
      status: 200,
      message: `Successfully found contact with id: ${contactId}`,
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).send({ status: 404, message: 'Route not found' });
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send({ status: 500, message: 'Internal server error' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
