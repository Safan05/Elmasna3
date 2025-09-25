import db from './db.js';
class productModel {
  constructor(db) {
    this.db = db; // Use the pool instance from `pg`
  }
  
}

export default new productModel(db);