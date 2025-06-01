import { DataTypes, Optional, Model, Sequelize } from 'sequelize';
import sequelize from '../sequelize'
import { UserAttributes } from '@/types'
import EventParticipant from './eventparticipant';

const User = sequelize.define('User', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'you can write anything...'
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  monthly_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  usable_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Active',
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users',   // match migration table name exactly
  timestamps: true,     // createdAt and updatedAt handled automatically
});

// User.hasMany(EventParticipant, { foreignKey: 'user_id' })

export default User;
