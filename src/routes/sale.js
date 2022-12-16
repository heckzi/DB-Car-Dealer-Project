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
import { deleteSql, insertSql, selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.cookies.sssn) {
    const reservelist=await selectSql.getreserve();
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
    const sssn=await selectSql.getsssn(req.body.sname);
    await insertSql.insertsale(r_vin,sssn[0].s_ssn,req.cookies.sssn,date);
    res.redirect('/sale');
});
router.post('/delete/:r_vin',async(req,res)=>{ //예약취소
    const r_vin=req.params.r_vin;
    const sssn=req.cookies.sssn;
    await deleteSql.deletereserve(r_vin);
    res.redirect('/sale');
});

module.exports = router;