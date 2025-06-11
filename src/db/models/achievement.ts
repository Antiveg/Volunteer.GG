import { Model, DataTypes } from 'sequelize';
import sequelize from '@/db/sequelize';

class Achievement extends Model {
  static associate(models: any) {
    Achievement.hasMany(models.UserAchievement, { foreignKey: 'achievement_id' });
  }
}

Achievement.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  min_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Achievement',
  tableName: 'achievements',
  timestamps: true,
});

export default Achievement;
