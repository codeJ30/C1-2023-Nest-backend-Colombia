export abstract class BaseRepository<Entity> {
  protected readonly database: Array<Entity>;

  constructor() {
    this.database = new Array<Entity>();
  }
}
