const express = require('express');
const cors = require('cors');
require('dotenv').config();

const activitiesRouter = require('./routes/activities-api');
const authRouter = require('./routes/auth');

const setupServer = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/activities', activitiesRouter);
  app.use('/api/auth', authRouter);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
  });

  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });

  return app;
};

module.exports = setupServer;
