import { DataTypes } from 'sequelize';
import sequelize from '@/db/sequelize'

const CategorizedEvent = sequelize.define('CategorizedEvent', {
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'events',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'eventcategories',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'categorizedevents',
  timestamps: true,
})

export default CategorizedEvent;
