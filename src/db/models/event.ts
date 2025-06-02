import { DataTypes } from 'sequelize'
import sequelize from '@/db/sequelize'

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  base_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  final_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  start_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  certificate_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'events',
  timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
});

export default Event;
