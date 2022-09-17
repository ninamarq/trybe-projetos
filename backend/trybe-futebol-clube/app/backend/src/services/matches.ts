import { Matches, Teams } from '../database/models';

interface NewMatch {
  homeTeam: string;
  awayTeam: string;
  homeTeamGoals: string;
  awayTeamGoals: string;
  inProgress: boolean;
}

class MatchesClass {
  public static async getMatches() {
    try {
      const allMatches = await Matches.findAll({
        include: [
          {
            model: Teams,
            as: 'teamHome',
            attributes: { exclude: ['id'] },
          },
          {
            model: Teams,
            as: 'teamAway',
            attributes: { exclude: ['id'] },
          },
        ],
      });
      return allMatches;
    } catch (error) {
      console.log(error);
    }
  }

  public static async createMatch(newMatch: NewMatch) {
    try {
      const createdMatch = await Matches.create({
        homeTeam: newMatch.homeTeam,
        awayTeam: newMatch.awayTeam,
        homeTeamGoals: newMatch.homeTeamGoals,
        awayTeamGoals: newMatch.awayTeamGoals,
        inProgress: true,
      });

      return createdMatch;
    } catch (error) {
      console.log(error);
    }
  }

  public static async finishMatch(id: number) {
    try {
      const finishedMatch = await Matches.update({
        inProgress: false,
      },
        {
          where: { id },
      });

      return finishedMatch;
    } catch (error) {
      console.log(error);
    }
  }

  public static async editMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    try {
      const editedMatch = await Matches.update({
        homeTeamGoals,
        awayTeamGoals,
       },
        { where: { id },
      });

      return editedMatch;
    } catch (error) {
      console.log(error);
    }
  }
}

export default MatchesClass;
