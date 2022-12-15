import async from "hbs/lib/async";
import mysql from "mysql2";
// import {returnCssn} from "../routes/login"//login.js 의 C_ssn 얻어오기
// import {returnSssn} from "../routes/login"//login.js 의 S_ssn 얻어오기
// 데이터베이스 연결
// var cssn,sssn; //전역변수 생성
// function savecssn(){ // 다른 함수에서 접근하도록 return 하는 함수 
//   return cssn;
// }
// function savesssn(){ // 다른 함수에서 접근하도록 return 하는 함수 
//   return sssn;
// }
// function savevin(){
//   return vin;
// }

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
   getreserve:async(cssn)=>{
    const [rows]=await promisePool.query(`select * from reservation where rc_ssn=${cssn}`);
    return rows;
  },
  getcarinfo:async()=>{
    console.log(vin);
    const [rows]=await promisePool.query(`select * from vehicle where vin=${vin.r_vin}`);
    return rows;
  },
  
  getcars: async () => {
    const sql = `select * from vehicle `
    const [result] = await promisePool.query(sql);
    return result;
  },
  getrelatedcars: async(data)=>{ // 로그인한 id가 듣는 수업을 select하는 함수
    const sql =`select * from vehicle`
    const [result] = await promisePool.query(sql);
    return result;
  }
}
// export const insertSql ={
//   insertClass:async(data)=>{
//     const sql = `insert into cjoin(J_C_ID,J_SSN) value (${data.C_ID},${ssn})`
//     const sql2 = `update class set Remain_PART=Remain_PART-1 where C_ID=${data.C_ID}`
//     await promisePool.query(sql);
//     await promisePool.query(sql2);
//   }
// }l