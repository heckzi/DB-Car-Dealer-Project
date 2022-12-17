import express from "express";
// sql import
import { insertSql,deleteSql, selectSql } from "../database/sql";
const router = express.Router();

router.get('/', async function (req, res) {
    if (req.cookies.cssn) {
        // 불러온 cssn 정보 같이 넘겨주기
            // 차 정보 불러오기
        const userinfo=await selectSql.getcustomer(req.cookies.cssn);
        const reservelist=await selectSql.getreserve();
        const availablecars= await selectSql.getavailablecars();
        res.render('reserve',{ availablecars,userinfo,reservelist, 'cssn': req.cookies.cssn });
    }   
    else{
        res.redirect('/');
        res.render('login'); 
        }
    
  
});
router.post('/delete/:r_vin',async(req,res)=>{ //예약취소 버튼
    const r_vin=req.params.r_vin;
    // const cssn=req.params.cssn;
    console.log(r_vin,req.cookies.cssn);
    await deleteSql.deletereserve(r_vin,req.cookies.cssn);
    res.redirect('/reserve');
});
router.post('/:r_vin',async(req,res)=>{ //예약버튼
    const r_vin=req.params.r_vin;
    const date=req.body.reservedate;
    const sssn=req.body.sssn;
    await insertSql.insertreserve(r_vin,req.cookies.cssn,date);
    res.redirect('/reserve');
});

module.exports = router;