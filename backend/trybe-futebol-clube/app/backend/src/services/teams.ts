import { Teams } from '../database/models';

export interface ITeams {
  id?: number;
  teamName: string;
}

class TeamsClass {
  public static async getTeams() {
    try {
      const allTeams = await Teams.findAll();
      return allTeams;
    } catch (error) {
      console.log(error);
    }
  }

  public static async getTeamById(id: number) {
    try {
      const team = await Teams.findOne({
        where: { id },
      });
      return team;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TeamsClass;
