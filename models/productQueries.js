import db from './db.js';
class productModel {
  constructor(db) {
    this.db = db; // Use the pool instance from `pg`
  }
  async getAllProducts (){
    try {
      const query = "SELECT * FROM products";
      const result = await this.db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
  }
}

export default new productModel(db);