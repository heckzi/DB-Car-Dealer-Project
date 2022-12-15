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

import cookieParser from "cookie-parser";
import express from "express";
import { selectSql } from "../database/sql";
export var cssn,sssn; //sql.js에서 사용할 수 있도록 export
export function  returnCssn(){ //uc_id return하는 함수이고 sql.js에서 사용한다.
    return cssn;
}
export function  returnSssn(){ //uc_id return하는 함수이고 sql.js에서 사용한다.
    return sssn;
}
const router = express.Router();

// 쿠키 및 세션 설정
router.use(cookieParser());


router.get('/', (req, res) => {
    if (req.cookies.user) { 
        res.render('customer', { 'user': req.cookies.user }); //로그인을 했으면 customer.hbs 넘겨줌

    } else { // 위에 유저라는 변수에 '조조'가 넘어옴
        res.render('login'); //로그인 안했으면 login.hbs 를 넘겨줌
    }
});

router.post('/', async (req, res) => { //웹에서 폼으로 post 메소드로 넘어왔음
    const vars = req.body; //대소문자 구분함 , hbs의 name을 받아옴
   
    const users = await selectSql.getUsers(); //sql에서 불러온 user

    let whoAmI = '';
    let myssn='';
    let checkLogin = false;
    var checkrole = '';

    users.map((user) => { // for 루프라고 생각하면 됨
        //for(let i =0; i<users.length; i++);{users}
        //각 user의 수마다 루프가 돈다고 생각
        //console.log(user)
        if (vars.id == user.id && vars.password == user.password) {
            // user 다음엔 대문자를 구분한다!! sql에서 불러오지만 js는 대문자 구분함.
            checkLogin = true;
            whoAmI = user.id;
            cssn=user.uc_ssn;
            sssn=user.us_ssn;
            returnCssn();
            returnSssn();
            if(user.role=='admin'){
                checkrole='admin';
            }
            if(user.role=='customer'){
                checkrole='customer';
            }
        }
     })

    if (checkLogin&&checkrole=='customer') { // 고객일때
        res.cookie('user', whoAmI, 'cssn',cssn,{
            expires: new Date(Date.now() + 10000), // ms 단위 (3600000: 1시간 유효)
            //쿠키가 유효한 시간
            httpOnly: true,
        })
        res.redirect('/customer');
    }   
    else if (checkLogin&&checkrole=='admin') { //관리자일때
        res.cookie('user', whoAmI, 'sssn',sssn,{
            expires: new Date(Date.now() + 10000), // ms 단위 (3600000: 1시간 유효)
            //쿠키가 유효한 시간
            httpOnly: true,
        })
        res.redirect('/admin');
    } 
    else {
        res.redirect('/');
    }
    
    

})

module.exports = router;