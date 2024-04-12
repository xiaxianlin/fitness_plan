import Dexie, { Table } from 'dexie';
import { Plan } from '@struct/model';

class Database extends Dexie {
  plans!: Table<Plan>;

  constructor() {
    super('fitness_plan');
    this.version(1.1).stores({ plans: '++id, uid' });
  }
}

export const db = new Database();
