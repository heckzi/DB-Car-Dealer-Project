import express from "express";
// sql import
import { deleteSql, insertSql, selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.cookies.sssn) {
    const reservelist=await selectSql.getallreserve();
    const soldcar=await selectSql.getsoldcar(req.cookies.sssn);
    const allsoldcar=await selectSql.getallsoldcar();
        res.render('sale',{ allsoldcar,soldcar, reservelist, sssn: req.cookies.sssn });
    } else {
        res.redirect('/');
        res.render('/login')
    }

});
router.post('/:r_vin',async(req,res)=>{
    const r_vin=req.params.r_vin;
    let date=new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'); //오늘날짜 받기
    const sssn=req.body.sssn;
    const cssn=await selectSql.getcssn(r_vin);
    await insertSql.insertsale(r_vin, sssn, cssn[0].rc_ssn,date);
    res.redirect('/sale');
});
router.post('/delete/:r_vin',async(req,res)=>{ //예약취소
    const r_vin=req.params.r_vin;
    await deleteSql.deletereserve(r_vin);
    res.redirect('/sale');
});

module.exports = router;