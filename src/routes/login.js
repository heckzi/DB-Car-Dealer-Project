import cookieParser from "cookie-parser";
import express from "express";
import { selectSql } from "../database/sql";

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
    let checkLogin = false;
    var checkrole = '';
    var cssn='';
    var sssn='';
    users.map((user) => { // for 루프라고 생각하면 됨
        //for(let i =0; i<users.length; i++);{users}
        //각 user의 수마다 루프가 돈다고 생각
        //console.log(user)
        if (vars.id == user.id && vars.password == user.password) {
            // user 다음엔 대문자를 구분한다!! sql에서 불러오지만 js는 대문자 구분함.
            checkLogin = true;
            cssn=user.uc_ssn;
            sssn=user.us_ssn;
            if(user.role=='admin'){
                checkrole='admin';
            }
            if(user.role=='customer'){
                checkrole='customer';
            }
        }
     })
    if (checkLogin&&checkrole=='customer') { // 고객일때
        res.cookie('cssn',cssn,{
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            //쿠키가 유효한 시간
            httpOnly: true,
        })
        res.redirect('/customer'); //redirect는 get요청
    }   
    else if (checkLogin&&checkrole=='admin') { //관리자일때
        res.cookie('sssn',sssn,{
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
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