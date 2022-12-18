import express from "express";
// sql import
import { insertSql,deleteSql, selectSql } from "../database/sql";
const router = express.Router();

router.get('/', async function (req, res) {
    if (req.cookies.cssn) {
            // 차 정보 불러오기
        var offset=0;
        var limit=offset+50;
        if(req.query.page){   
            var offset=50*Number(req.query.page);
            var limit=50
        }
        var today=new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
        var maxday=new Date();
        maxday.setMonth(maxday.getMonth()+1);
        maxday=maxday.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
        const userinfo=await selectSql.getcustomer(req.cookies.cssn);
        const reservelist=await selectSql.getreserve(req.cookies.cssn);
        const availablecars= await selectSql.getavailablecars(offset,limit);
        res.render('reserve',{min:today,max:maxday, availablecars,userinfo,reservelist, 'cssn': req.cookies.cssn });
    }   
    else{
        res.redirect('/');
        res.render('login');
        }  
});

router.post('/delete/:r_vin',async(req,res)=>{ //예약취소 버튼
    const r_vin=req.params.r_vin;
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