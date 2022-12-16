import async from "hbs/lib/async";
import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'car',
    password: '309581',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// select query
export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`select * from user`);
    return rows
  },
  getcustomer:async(cssn)=>{
    const [rows]=await promisePool.query(`select * from customer where c_ssn=${cssn}`);
    return rows;
  },
  getallcustomer:async()=>{
    const [rows]=await promisePool.query(`select * from customer`);
  },
   getreserve:async()=>{
    const [rows]=await promisePool.query(`select * from reservation`);
    return rows;
  },
  getcarinfo:async(vin)=>{
    const [rows]=await promisePool.query(`select * from vehicle where vin='${vin}'`);
    return rows;
  },
  getsoldcar: async (sssn) => {
    const [rows]=await promisePool.query(`select * from sale where ss_ssn=${sssn}`);
    return rows;
  },
  getallsoldcar: async () => {
    const [rows]=await promisePool.query(`select * from sale`);
    return rows;
  },
  getavailablecars: async () => {
    const [rows]=await promisePool.query(`select * from vehicle where not exists (select * from reservation where vin=r_vin)`);
    return rows;
  },
  getsssn: async(sname)=>{
    const sql =`select s_ssn from salesman where s_name='${sname}'`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getsname: async(scssn)=>{
    const sql =`select s_name from salesman where s_ssn='${scssn}'`;
    const [result] = await promisePool.query(sql);
    return result;
  }
}

export const deleteSql ={
  deletereserve:async(r_vin)=>{
    const sql = `delete from reservation where r_vin='${r_vin}'`
    await promisePool.query(sql);
  },
  deletevehicle:async(vin)=>{
    const sql=`delete from vehicle where vin='${vin}'`
    await promisePool.query(sql);
  }
}

export const updateSql ={
  updateCar:async()=>{
    const sql='update '
  }
}
export const insertSql ={
  insertreserve:async(r_vin,cssn,date)=>{
    console.log(r_vin,cssn,date)
    const sql = `insert into reservation(rc_ssn, r_vin, r_date) values ('${cssn}','${r_vin}','${date}')`;
    await promisePool.query(sql);
  },
  insertsale:async(s_vin,sssn,cssn,date)=>{
    console.log(s_vin,sssn,cssn,date)
    const sql = `insert into sale(s_vin, ss_ssn, sc_ssn,s_date) values ('${s_vin}',${sssn},${cssn},'${date}')on duplicate key update s_vin='${s_vin}', ss_ssn=${sssn},sc_ssn=${cssn};`
    const sql2 = `delete from reservation where r_vin='${s_vin}' and rc_ssn='${cssn}'`
    await promisePool.query(sql);
    await promisePool.query(sql2);
  }
}
