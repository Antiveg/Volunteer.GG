import { DataTypes } from 'sequelize';
import sequelize from '@/db/sequelize';

const OrganizationFollower = sequelize.define('OrganizationFollower', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'organizations',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'organizationfollowers',
  timestamps: true, // or false, depending on your schema needs
});

export default OrganizationFollower
