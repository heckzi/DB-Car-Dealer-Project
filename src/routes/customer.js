import express from "express";
// sql import
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    // 차 정보 불러오기
    var offset=0;
    var limit=offset+50;
    if(req.query.page){   
        var offset=50*Number(req.query.page);
        var limit=50
    }
    const availablecars= await selectSql.getavailablecars(offset,limit);
    if (req.cookies.cssn) {
        
        // 불러온 user 정보 같이 넘겨주기
        const userinfo=await selectSql.getcustomer(req.cookies.cssn);
        res.render('customer',{ availablecars,userinfo,
                                 cssn: req.cookies.cssn});
    }
    else {
        res.render('login');
        res.redirect('/');
    }
});
router.post('/',async(_req,res)=>{ 
    res.redirect('/reserve');
});

module.exports = router;