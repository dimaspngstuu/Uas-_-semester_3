const db = require("../config/database");

class Patient{
    static all(){
        return new Promise((resolve, reject)=>{
            const sql = "SELECT * FROM patients";
            db.query(sql,(err,results) =>{
                resolve (results);
            });
        });
    }

    static async create(data){
        const id = await new Promise((resolve, reject) => {
            const sql = "INSERT INTO patients SET ?";
            db.query(sql,data,(err,results)=>{
                resolve(results.insertId);
            });
        });
        const patient = this.find(id);
        return patient;
    }

    static find(id){
        return new Promise((resolve,reject) => {
            const sql = "SELECT * FROM patients WHERE id = ?";
            db.query(sql,id,(err,results) => {
                const [patient] = results;
                resolve(patient);
            });
        });
    }

    static async update(id,data){
        await new Promise((resolve, reject)=>{
            const sql = "UPDATE patients SET ? WHERE id = ?";
            db.query(sql,[data,id],(err,results) => {
                resolve(results);
            });
        });

        const patient = await this.find(id);
        return patient;
    }

    static delete(id){
        return new Promise((resolve,reject) => {
            const sql = "DELETE FROM patients WHERE id = ?";
            db.query(sql, id, (err,results) => {
                resolve(results);
            });
        }); 
    }

    static search(name){
      return new Promise((resolve,reject) => {
          const sql = `SELECT * FROM patients WHERE name like '%${name}%'`;
          db.query(sql,name,(err,results) => {
              const [patient] = results;
              resolve(patient);
          });
      });
    }

    static findByStatus(status){
      return new Promise((resolve,reject) => {
          const sql = `SELECT * FROM patients WHERE status = ?`;
          db.query(sql,status,(err,results) => {
              resolve(results);
          });
      });
    }
}

// export class patient
module.exports = Patient;