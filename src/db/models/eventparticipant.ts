import { DataTypes } from 'sequelize';
import sequelize from '@/db/sequelize'
import OrganizationMember from './organizationmember';
import Event from './event';
import User from './user';

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

// Link EventParticipant to OrganizationMember through user_id
EventParticipant.belongsTo(OrganizationMember, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
  as: 'organizationMember'  // optional alias to use in include
})
EventParticipant.belongsTo(User, { foreignKey: 'user_id' })

export default EventParticipant;
