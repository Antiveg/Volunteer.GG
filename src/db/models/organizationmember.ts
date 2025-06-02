import { DataTypes } from 'sequelize';
import sequelize from '@/db/sequelize'
import Organization from './organization';
import EventParticipant from './eventparticipant';
import User from './user';

const OrganizationMember = sequelize.define('OrganizationMember', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'organizations',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'organizationmembers',
  timestamps: true,
})

export default OrganizationMember;
