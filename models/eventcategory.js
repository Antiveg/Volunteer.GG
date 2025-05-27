import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize'; // adjust path as needed

const EventCategory = sequelize.define('EventCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'eventcategories',
  timestamps: true, 
});

export default EventCategory;
