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
import { insertSql, selectSql } from "../database/sql";
const router = express.Router();

router.get('/:r_vin', async (req, res) => {
    // 차 세부정보 불러오기
    // const data2 = req.body.detail;
    const data = req.params.r_vin;
    const cardetail = await selectSql.getcarinfo(data);
    if (req.cookies.cssn) {
        // 불러온 user 정보 같이 넘겨주기
        res.render('detail',{ cardetail,user: req.cookies.user});
    }
    else {
        res.render('login');
        res.redirect('/');
    }
});
router.post('/',async(req,res)=>{ 
    // const data = req.params.r_vin;
    res.redirect('/detail'); //위에 get 요청으로 간다 
});

module.exports = router;