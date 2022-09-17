import express, { Router } from 'express';
import connectToDatabase from './connection';
import CarsRouter from './routes/cars';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public getApp() {
    return this.app;
  }

  private routes(): void {
    this.app.use('/cars', CarsRouter);
  }
}

export default App;

export const { app } = new App();
