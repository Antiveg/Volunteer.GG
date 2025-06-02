import { DataTypes } from 'sequelize';
import sequelize from '@/db/sequelize'

const EventParticipant = sequelize.define('EventParticipant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_verified: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  proof_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'eventparticipants',
  timestamps: true, // manages createdAt and updatedAt
});

export default EventParticipant;
