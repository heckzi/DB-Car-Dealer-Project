import express from "express";
// sql import
import { selectSql } from "../database/sql";
const router = express.Router();

router.get('/:r_vin', async (req, res) => {
    // 차 세부정보 불러오기
    const data = req.params.r_vin;
    const cardetail = await selectSql.getcarinfo(data);
    console.log(cardetail)
    if (req.cookies.cssn||req.cookies.sssn) {
        res.render('detail',{cardetail});
    }
    else {
        res.render('login');
        res.redirect('/');
    }
});
router.post('/',async(req,res)=>{ 
    res.redirect('/detail'); //위에 get 요청으로 간다 
});

module.exports = router;