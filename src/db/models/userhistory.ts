import { DataTypes } from 'sequelize';
import sequelize from '@/db/sequelize';

const UserHistory = sequelize.define('UserHistory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  point_change: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  history_origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'events',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  purchase_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'userpurchases', 
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'userhistories',
  timestamps: true,
});

export default UserHistory;
