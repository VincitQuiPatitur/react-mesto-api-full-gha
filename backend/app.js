require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}); // за 15мин мах 100 запросов, потом выведется сообщение о превышении лимита

const app = express();

app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(cors);
app.disable('x-powered-by');

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
