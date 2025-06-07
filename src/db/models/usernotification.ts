import { DataTypes } from 'sequelize';
import sequelize from '@/db/sequelize';

const UserNotification = sequelize.define('UserNotification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  redirect_to: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'usernotifications',
  timestamps: true,
});

export default UserNotification;
