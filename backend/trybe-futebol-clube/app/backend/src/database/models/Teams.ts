import { DataTypes, Model } from 'sequelize';
import connection from '.';

class Teams extends Model {
  public readonly id: number;

  public readonly teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: connection,
  tableName: 'teams',
  timestamps: false,
});

export default Teams;
