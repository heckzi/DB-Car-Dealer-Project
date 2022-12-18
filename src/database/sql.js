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
  getallcar:async(offset,limit)=>{
    const [rows]=await promisePool.query(`select * from vehicle limit ${offset},${limit}`);
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
  getavailablecars: async (offset,limit) => {
    const [rows]=await promisePool.query(`select * from vehicle where vin not in((select vin from vehicle,sale where s_vin=vin) union (select vin from vehicle,reservation where r_vin=vehicle.vin)) limit ${offset},${limit}`);
    return rows;
  },
  getcssn: async(r_vin)=>{
    const sql =`select rc_ssn from reservation where r_vin='${r_vin}'`;
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
  updatevin:async(u_vin,vin)=>{
    const sql=`update vehicle set vin='${u_vin}' where vin='${vin}'`
    await promisePool.query(sql);
    console.log(sql)
  },
  updatemodel:async(model,vin)=>{
    const sql=`update vehicle set model='${model}' where vin='${vin}'`
    await promisePool.query(sql);
    console.log(sql)
  },
  updatecolor:async(color,vin)=>{
    const sql=`update vehicle set vin='${color}' where vin='${vin}'`
    await promisePool.query(sql);
    console.log(sql)
  },
  updateproductionyear:async(productionyear,vin)=>{
    const sql=`update vehicle set vin='${productionyear}' where vin='${vin}'`
    await promisePool.query(sql);
    console.log(sql)
  },
  updateprice:async(price,vin)=>{
    const sql=`update vehicle set vin='${price}' where vin='${vin}'`
    await promisePool.query(sql);
    console.log(sql)
  },
  updatecategory:async(category,vin)=>{
    const sql=`update vehicle set vin='${category}' where vin='${vin}'`
    await promisePool.query(sql);
    console.log(sql)
  },

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
  },
  insertcar:async(vin, model, color, productionyear, price, category,uvin)=>{
    const sql=`insert into vehicle (vin, model, color, productionyear, price, category) values ('${vin}','${model}','${color}','${productionyear}','${price}','${category}') on duplicate key update vin='${uvin}'`
    await promisePool.query(sql);
  }
}
