import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { UserCreateCommand, UserRoleImpl, UserUpdateCommand, UserCreateCommandImpl } from './interfaces/users';


export class AppServer {
  private readonly app = express();
  private db = new JsonDB(new Config("db", true, false, '/'));

  constructor(private port: number = 3000) {
    this.setupServer();
    this.initRoutes();
  }

  protected setupServer(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private initRoutes(): void {
    this.app.get('/api/users', (req, res) => {
      const data = this.db.getData("/users");
      const roles = this.db.getData("/roles");

      /** implement interface CollectionImpl<UserViewModel> */
      res.json({
        total: data.length,
        collection: data.map((el: UserCreateCommand) => {
          const [role] = roles.filter((r: UserRoleImpl) => r.id === el.roleId);
          const {roleId, ...newItem} = el;
          return { ...newItem, role };
        }),
      })
    });

    this.app.get('/api/roles', (req, res) => {
      const roles = this.db.getData("/roles");

      /** implement interface CollectionImpl<UserRoleImpl> */
      res.json({
        total: roles.length,
        collection: roles,
      })
    });

    this.app.post('/api/users', (req, res) => {
      const body: UserCreateCommand = new UserCreateCommand(req.body);
      this.db.push('/users', [body], false);
      res.json({ status: 200, message: 'Successfully added!' });
    });

    this.app.put('/api/users/:id', (req, res) => {
      const { id } = req.params;
      const body: UserUpdateCommand = new UserUpdateCommand({ ...req.body, id });
      const data = this.db.getData("/users");
      const index = data.findIndex((el: UserCreateCommandImpl) => el.id === id);
      if (index > -1) {
        data[index] = body;
      }
      this.db.push('/users', data);
      res.json({ status: 200, message: 'Successfully updated!' });
    });

    this.app.delete('/api/users/:id', (req, res) => {
      const { id } = req.params;
      const data = this.db.getData("/users");
      const result = data.filter((el: UserCreateCommandImpl) => el.id !== id);
      this.db.push('/users', result);
      res.json({ status: 200, message: 'Successfully removed!' });
    });
  }

  public start(): void {
    console.log(`Server started at port ${this.port}`);
    this.app.listen(this.port);
  };
}
