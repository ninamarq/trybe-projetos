import { Matches } from "../database/models";
import { Teams } from "../database/models";

export interface IMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface ITeamStatus {
  id: number,
  teamName: string,
  homeMatches: IMatch[],
}

export interface ITeamsLeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsBalance: number;
  efficiency: number;
};

class Leaderboard {
  public static totalPoints = (team: ITeamStatus) => team.homeMatches.reduce((acc, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
    if (curr.homeTeamGoals < curr.awayTeamGoals) return acc;
    return acc + 1;
  }, 0);
  
  public static totalVictories = (team: ITeamStatus) => team.homeMatches.reduce((acc, cur) => {
    if (cur.homeTeamGoals > cur.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  
  public static totalDraws = (team: ITeamStatus) => team.homeMatches.reduce((acc, cur) => {
    if (cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  
  public static totalGoalsFavor = (team: ITeamStatus) => team.homeMatches
    .reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
  
  public static totalGoalsOwn = (team: ITeamStatus) => team.homeMatches
    .reduce((acc, cur) => acc + cur.awayTeamGoals, 0);

  public static createTeamLeaderboard = (team: ITeamStatus) => ({
    name: team.teamName,
    totalPoints: this.totalPoints(team),
    totalGames: team.homeMatches.length,
    totalVictories: this.totalVictories(team),
    totalDraws: this.totalDraws(team),
    totalLosses: team.homeMatches.length - (this.totalVictories(team) + this.totalDraws(team)),
    goalsFavor: this.totalGoalsFavor(team),
    goalsOwn: this.totalGoalsOwn(team),
    goalsBalance: this.totalGoalsFavor(team) - this.totalGoalsOwn(team),
    efficiency: Number(((this.totalPoints(team) / (team.homeMatches.length * 3)) * 100).toFixed(2)),
  });

  private static classifyLeaderboard(array: ITeamsLeaderBoard[]) {
    return array.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      return 0;
    });
  }

  public static async getHome() {
    const allMatches = await Matches.findAll();
    const allTeams = await Teams.findAll();

    const leaderboard: ITeamsLeaderBoard[] = [];

    allTeams.forEach((team) => {
      // Recolhendo os gols a favor e gols tomados
      const homeMatches = allMatches.filter((match) => Number(match.homeTeam) === team.id && match.inProgress === false)
        .map((match) => ({ homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals }));
      
      const result = this.createTeamLeaderboard({ id: team.id, teamName: team.teamName, homeMatches });
      leaderboard.push(result);
    });

    return this.classifyLeaderboard(leaderboard);
  }
}

export default Leaderboard;