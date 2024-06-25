import { Model, QueryBuilder, TransactionOrKnex } from 'objection';

class BaseRepository<T extends Model> {
  protected modelClass: typeof Model;

  constructor(modelClass: typeof Model) {
    this.modelClass = modelClass;
  }

  findById(id: number): Promise<T> {
    return this.modelClass.query().findById(id) as unknown as Promise<T>;
  }

  findAll(): Promise<T[]> {
    return this.modelClass.query() as unknown as Promise<T[]>;
  }

  create(data: Partial<T>): Promise<T> {
    return this.modelClass.query().insert(data) as unknown as Promise<T>;
  }

  updateById(id: number, data: Partial<T>): Promise<T> {
    return this.modelClass.query().patchAndFetchById(id, data) as unknown as Promise<T>;
  }

  deleteById(id: string): Promise<number> {
    return this.modelClass.query().deleteById(id) as unknown as Promise<number>;
  }

  transaction(trx: TransactionOrKnex): QueryBuilder<T, T> {
    return this.modelClass.query(trx) as unknown as QueryBuilder<T, T>;
  }
}

export default BaseRepository;
