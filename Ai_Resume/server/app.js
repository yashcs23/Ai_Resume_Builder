const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const resumeRoutes = require('./src/routes/resumeRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const ApiError = require('./src/utils/ApiError');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AI Resume Builder API root'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AI Resume Builder backend is running'
  });
});

app.use('/api/resumes', resumeRoutes);

app.use((req, _res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use(errorHandler);

module.exports = app;
