import db from "./db.js"
class userModel {
    constructor(db) {
        this.db = db; // Use the pool instance from `pg`
      }
          // check email existance
    async checkEmailExists(email){
        try {
          const query = "SELECT 1 FROM users WHERE email = $1";    
          const result = await this.db.query(query, [email]);
      
          if (result.rows.length > 0) {
            console.log("Email exists in the database.");
            return true;
          } else {
            console.log("Email does not exist in the database.");
            return false;
          }
        } catch (error) {
          console.error("Error checking email existence:", error.message);
          throw error; 
        }
      };
    async registerUser(email, password,name) {
        try {
          const query = "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING uuid";
          const result = await this.db.query(query, [email, password, name]);
          const userUuid = result.rows[0]?.uuid;
          console.log("User registered successfully");
          return userUuid;
        } catch (error) {
          console.error("Error registering user:", error.message);
          throw error;
        }
      }
    async getUserByEmail(email) {
      try {
        const query = "SELECT * FROM users WHERE email = $1";
        const result = await this.db.query(query, [email]);
        return result.rows[0];
      } catch (error) {
        console.error("Error getting user by email:", error.message);
        throw error;
      }
    }
    async getUserByUuid(uuid) {
      try {
        const query = "SELECT * FROM users WHERE uuid = $1";
        const result = await this.db.query(query, [uuid]);
        return result.rows[0];
      } catch (error) {
        console.error("Error getting user by uuid:", error.message);
        throw error;
      }
    }
    async setVerificationCode(email, code, expiresAt) {
      try {
        const query = "UPDATE users SET verification_code = $1, verification_expires = $2 WHERE email = $3 RETURNING uuid";
        const result = await this.db.query(query, [code, expiresAt, email]);
        return result.rows[0];
      } catch (error) {
        console.error("Error setting verification code:", error.message);
        throw error;
      }
    }
    async verifyCodeAndPromote(email, code) {
      try {
        const query = `
          UPDATE users
          SET role = 'customer', verification_code = NULL, verification_expires = NULL
          WHERE email = $1
          AND verification_code = $2
          AND verification_expires > NOW()
          RETURNING uuid, role, email
        `;
        const result = await this.db.query(query, [email, code]);
        return result.rows[0];
      } catch (error) {
        console.error("Error verifying code:", error.message);
        throw error;
      }
    }
    async updateRole(uuid, role) {
      try {
        const query = "UPDATE users SET role = $1 WHERE uuid = $2";
        await this.db.query(query, [role, uuid]);
        console.log("User role updated successfully");
      } catch (error) {
        console.error("Error updating user role:", error.message);
        throw error;
      }
    }
    async getAllUsers() {
      try {
        const query = "SELECT * FROM users";
        const result = await this.db.query(query);
        return result.rows.map(row => ({
          uuid: row.uuid,
          email: row.email,
          name: row.name,
          birthdate: row.birthdate,
          role: row.role
        }));
      } catch (error) {
        console.error("Error getting all users:", error.message);
        throw error;
      }
    }
    async getCustomerCount() {
      try {
        const query = "SELECT COUNT(*) FROM users WHERE role = 'customer'";
        const result = await this.db.query(query);
        return parseInt(result.rows[0].count, 10);
      } catch (error) {
        console.error("Error getting customer count:", error.message);
        throw error;
      }
    }
    async getAdminCount() {
      try {
        const query = "SELECT COUNT(*) FROM users WHERE role = 'admin'";
        const result = await this.db.query(query);
        return parseInt(result.rows[0].count, 10);
      } catch (error) {
        console.error("Error getting admin count:", error.message);
        throw error;
      }
    }
    async deleteUser(id){
      try {
        const query = "DELETE FROM users WHERE uuid = $1";
        await this.db.query(query, [id]);
        console.log("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error.message);
        throw error;
      }
    }
    async findByProviderId(provider, providerId) {
      try {
        const query = "SELECT * FROM users WHERE provider = $1 AND provider_id = $2";
        const result = await this.db.query(query, [provider, providerId]);
        return result.rows[0];
      } catch (error) {
        console.error("Error finding user by provider ID:", error.message);
        throw error;
      }
    }
    async createOAuthUser(email, name, provider, providerId) {
      try {
        const query = "INSERT INTO users (email, name, provider, provider_id, role, password) VALUES ($1, $2, $3, $4, 'customer', $5) RETURNING uuid";
        const result = await this.db.query(query, [email, name, provider, providerId, '']);
        const userUuid = result.rows[0]?.uuid;
        console.log("OAuth user created successfully");
        return userUuid;
      } catch (error) {
        console.error("Error creating OAuth user:", error.message);
        throw error;
      }
    }
    async changeUserPassword(email, newPassword) {
      try {
        const query = "UPDATE users SET password = $1 WHERE email = $2";
        await this.db.query(query, [newPassword, email]);
        console.log("User password changed successfully");
      }
      catch (error) {
        console.error("Error changing user password:", error.message);
        throw error;
      }
    }
    async updateName(uuid, name) {
      try {
        const query = "UPDATE users SET name = $1 WHERE uuid = $2";
        await this.db.query(query, [name, uuid]);
        console.log("User name updated successfully");
      } catch (error) {
        console.error("Error updating user name:", error.message);
        throw error;
      }
    }
    async updateEmail(uuid, email) {
      try {
        const query = "UPDATE users SET email = $1 WHERE uuid = $2";
        await this.db.query(query, [email, uuid]);
        console.log("User email updated successfully");
      } catch (error) {
        console.error("Error updating user email:", error.message);
        throw error;
      } 
    }
    async GetUserPhoto(uuid){
      try{
        const query = "Select image_url FROM users WHERE uuid= $1";
        const result=await this.db.query(query,[uuid]);
        const photo =  result.rows[0].image_url;
        return photo;
      }
      catch(error){
        console.error("Error getting user photo", error.message);
        throw error;
    }
  }
}
export default new userModel(db);