// Copyright 2021 kms
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
// sql import
import { insertSql,deleteSql, selectSql } from "../database/sql";
const router = express.Router();

router.get('/', async function (req, res) {
    if (req.cookies.cssn) {
        // 불러온 cssn 정보 같이 넘겨주기
            // 차 정보 불러오기
        const userinfo=await selectSql.getcustomer(req.cookies.cssn);
        const reservelist=await selectSql.getreserve(req.cookies.cssn);
        const availablecars= await selectSql.getavailablecars();
        res.render('reserve',{ availablecars,userinfo,reservelist, 'cssn': req.cookies.cssn });
    }   
    else{
        res.redirect('/');
        res.render('login'); 
        }
    
  
});
router.post('/delete/:r_vin',async(req,res)=>{ 
    const r_vin=req.params.r_vin;
    // const cssn=req.params.cssn;
    console.log(r_vin,req.cookies.cssn);
    deleteSql.deletereserve(r_vin,req.cookies.cssn);
    res.redirect('/reserve');
});
router.post('/:r_vin',async(req,res)=>{ 
    const r_vin=req.params.r_vin;
    const date=req.body.reservedate;
    // const cssn=req.params.cssn;
    console.log(r_vin,req.cookies.cssn);
    insertSql.insertreserve(r_vin,req.cookies.cssn,date);
    res.redirect('/reserve');
});

module.exports = router;