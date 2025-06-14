// require('dotenv').config({ path: '.env.local' })

import { Sequelize } from 'sequelize'
import config from './config/config'
import pg from 'pg'

const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

const sequelize = new Sequelize(dbConfig.url, {
  dialectModule: pg,
})

export default sequelize
