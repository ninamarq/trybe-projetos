import { DataTypes, Model } from 'sequelize';
import connection from '.';
import Teams from './Teams';

class Matches extends Model {
  public readonly id: number;

  public readonly homeTeam: string;

  public readonly homeTeamGoals: number;

  public readonly awayTeam: string;

  public readonly awayTeamGoals: number;

  public readonly inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: connection,
  tableName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'home_matches' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'away_matches' });

export default Matches;
