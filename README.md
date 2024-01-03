
<a name="_top"></a>

1. **개요**
- CAR\_DEALER 데이터베이스 구현 및 Web 응용 작성
1. **상세 설계 내용**

각 코드들은 파일에 첨부할 것이며 반복적인 부분을 제외하고 핵심 부분만 이하 기술하겠습니다.

<ERD사상>

![image](https://github.com/heckzi/DB-Car-Dealer-Project/assets/110593187/1ba70b5d-19fd-4cc2-9187-024788e85993)

위와같이 ERD를 사상하였습니다.

User테이블은 각 Salesman(판매자)와 고객을 구분지어주는 역할을 합니다. 모든 판매자와 고객은 User테이블에 있어야 하므로 전체참여로 1대1 관계로 그려주었습니다.

Vehicle 테이블은 판매자가 판매도 할 수 있고 구매자는 구매를 하고 예약도 할 수 있기에 위와 같이 고객과 예약, 구매가 이어지도록 그렸습니다. 

차량은 한대당 판매가 되든 예약이 되고 고객과 판매자는 여러 개의 차량을 살 수 있기에 일대다 관계가 됩니다







<데이터베이스 테이블 스키마>
![image](https://github.com/heckzi/DB-Car-Dealer-Project/assets/110593187/51092508-8624-47d1-8b40-048fe285e4d0)


위의 ERD를 바탕으로 사상한 DB스키마 입니다. 이미 제3 정규형을 만족하는 스키마입니다.

각 테이블별로 PK를 노란색으로 표시해주었습니다. 또한 파란색은 Unique 속성을 뜻합니다.

그리고 FK – PK 관계를 화살표로 표시했습니다. 

처음에 s\_vin은 Vehicle.vin을 참조하게 했었지만 이후 판매한 차량을 DB에서 지워야하는 상황이 올 때 회사의 입장에서 판매기록은 따로 남겨져있어야 한다고 생각을 하여 참조를 지웠습니다.

C\_ssn, s\_ssn, salenum, reservenum은 auto increment 로 설정해 주었습니다.

Vehicle.Category는 차량의 종류가 세단인지, 트럭인지, SUV인지 구별하는 속성입니다.

이제 위의 스키마를 바탕으로 MySql에서 DB를 직접 설계하겠습니다.	 데이터 베이스 생성하는 Sql문은 CarProject.sql이라는 파일로 첨부하겠습니다.

car라는 Database를 사용하겠습니다.

현재 6개의 테이블이 존재합니다. 테이블 설명을 하겠습니다.

차량정보를 담는 vehicle 테이블입니다.

vin은 차량의 차대번호입니다.

![image](https://github.com/heckzi/DB-Car-Dealer-Project/assets/110593187/056e71c9-ff4f-4c72-b229-a30505edb5ad)

**그림 1 출처: [https://m.blog.naver.com/hwgi01/221183650544**](https://m.blog.naver.com/hwgi01/221183650544)**

vin은 17자리 varchar형입니다. 위 그림의 차대번호의 형식을 따라 설계했습니다. 하지만 이후 10만개의 차대번호 데이터를 생성할때엔 각 알파벳과 숫자가 뭘 의미하는지와 같은 세부적인 정보는 담아서 생성하지 못하고 숫자와 알파벳이 들어가야 할 위치만 맞춰 생성해주었습니다.

모든 어트리뷰트들은 not null이 되어야 합니다. category는 차량이 세단,트럭,suv인지 구별합니다.

고객 테이블입니다. c\_ssn은 고객을 관리하기 쉽게 번호를 매기는 어트리뷰트입니다. auto\_increment 속성을 가집니다.

이하 세개의 어트리뷰트는 varchar 형식을 가집니다. c\_phonenum은 휴대폰이 없는 사람도 있을 수 있으니 null 허용을 해주었습니다.

예약정보를 담는 reservation 테이블입니다. reservenum은 예약정보를 관리할 번호이며 auto\_increment 속성을 가집니다. rc\_ssn은 예약한 고객의 번호이고, r\_vin은 예약한 차량이며 r\_date는 차량예약을 한 날짜입니다.


판매정보를 담는 테이블입니다. salenum은 각 판매기록에 매겨지는 번호이며 auto\_increment입니다 s\_vin은 판매된 차량의 정보를 담습니다. 처음엔 FK로써 Vehicle.vin을 참조하였지만, 이후 참조 관계를 삭제했습니다. ss\_ssn은 판매자의 번호이고, sc\_ssn은 차량을 구매한 고객의 번호입니다. s\_date는 구매일자입니다.

판매자 정보를 가지는 테이블입니다. s\_ssn은 판매자의 번호이며 auto\_increment 입니다.

고객 테이블의 설명과 마찬가지로 s\_phonenum은 null허용입니다.

user 테이블입니다. 페이지에 로그인하기위해 필요한 id와 password를 가지며 role로 관리자(=판매자)인지 고객인지 구분시켜 주었습니다. uc\_ssn과 us\_ssn으로 로그인한 정보를 다른 테이블의 각 사람들과 설계과정에서 매칭시켜줍니다. 

![image](https://github.com/heckzi/DB-Car-Dealer-Project/assets/110593187/4fbfdcb0-2d49-4b72-8869-ebf79c2bfae5)

위는 설계한 Car 데이터베이스의 Workbench상 ERD입니다. 노란색으로 보이는 available은 view이고 vehicle 테이블에 countVin이라는 인덱스를 확인 할 수 있습니다.

**CONSTRAINTS**

CONSTRAINT `reservation\_ibfk\_1`
`  `FOREIGN KEY (`rc\_ssn`)
`  `REFERENCES `car`.`customer` (`c\_ssn`),
CONSTRAINT `reservation\_ibfk\_2`
`  `FOREIGN KEY (`r\_vin`)
`  `REFERENCES `car`.`vehicle` (`vin`)
`  `ON DELETE CASCADE
`  `ON UPDATE CASCADE)

첫번째는 reservation 테이블의 고객ssn인 rc\_ssn이 customer 테이블의 고객ssn인 c\_ssn을 참조하는 제약조건이고

두번째는 reservation 테이블의 r\_vin이 vin이 삭제되거나 update되면 같이 update 되도록 on delete cascade, on update cascade 제약조건을 걸어준 부분입니다.

CONSTRAINT `sale\_ibfk\_1`
`  `FOREIGN KEY (`ss\_ssn`)
`  `REFERENCES `car`.`salesman` (`s\_ssn`),
CONSTRAINT `sale\_ibfk\_2`
`  `FOREIGN KEY (`sc\_ssn`)
`  `REFERENCES `car`.`customer` (`c\_ssn`))

위는 sale의 직원 ssn인 ss\_ssn이 salesman 테이블의 직원 ssn인 s\_ssn을 참조하는 제약조건입니다.

또 sale의 고객ssn sc\_ssn이 customer 테이블의 고객 ssn인 c\_ssn을 참조하는 제약조건입니다. 

CONSTRAINT `user\_ibfk\_1`
`  `FOREIGN KEY (`us\_ssn`)
`  `REFERENCES `car`.`salesman` (`s\_ssn`),
CONSTRAINT `user\_ibfk\_2`
`  `FOREIGN KEY (`uc\_ssn`)
`  `REFERENCES `car`.`customer` (`c\_ssn`))

첫번째는 user테이블의 직원 ssn인 us\_ssn이 salesman의 s\_ssn을 참조하도록 했습니다.

두번째는 user테이블의 고객 ssn인 uc\_ssn이 customer의 c\_ssn을 참조하도록 했습니다.


**INDEXING**

10만 데이터를 Vehicle 테이블에 넣은 직후 바로 vin의 개수를 select 해보았습니다.

아무래도 10만데이터라 CPU속도가 빨라서 인덱싱 없이도 위와 같이 0.01초가 걸렸습니다. 

이후 countVin이라는 Index를 걸어 다시 Vin의 개수를 select하겠습니다. 그 후 explain 구문으로 인덱스가 잘 걸리는지 확인해보겠습니다.

그래도 인덱싱 후 0.00sec으로 시간이 줄었음을 볼 수 있습니다.

이후 다시 인덱스를 삭제하고 

A로 시작하는 차대번호의 개수를 select하였습니다. 0.01초가 걸렸습니다.

그 후 다시 index를 생성해 같은 select문을 돌렸더니 다시 0.00초가 걸림을 볼 수 있었습니다.

이 두가지 상황에서 테스트 해봄에 따라서 인덱싱을 통해 충분히 유의미하게 빨라졌다고 할 수 있습니다. 데이터베이스의 데이터양이 방대한 실무에선 더더욱 그럴 것입니다.

**VIEWING**

위는 예약이 가능한 차량을 조회하는 쿼리문입니다. 복잡한 쿼리문을 반복해서 쓰면 시간적손해가 있기에 View를 통해 쉽게 조회가 가능하도록 available이라는 view를 만들어 주었습니다.

잘 적용이 되는 것을 볼 수 있습니다. 이 후 후술할 sql함수에서 위의 View를 사용합니다.

**CODE EXPLAINING**

**<login.js>**

`    `users.map((user) => { // for 루프라고 생각하면 됨

`        `//for(let i =0; i<users.length; i++);{users}

`        `//각 user의 수마다 루프가 돈다고 생각

`        `if (vars.id == user.id && vars.password == user.password) {

`            `// user 다음엔 대문자를 구분한다!! sql에서 불러오지만 js는 대문자 구분함.

`            `checkLogin = true;

`            `cssn=user.uc\_ssn;

`            `sssn=user.us\_ssn;

`            `if(user.role=='admin'){

`                `checkrole='admin';

`            `}

`            `if(user.role=='customer'){

`                `checkrole='customer';

`            `}

`        `}

`     `})

위 코드를 보면 로그인 입력한 아이디 비밀번호를 체크할 때 user테이블의 ssn들을 cssn이나 sssn에 넣어주었고 역할이 admin이냐 customer냐에 따라 role에 if문으로 값들을 대입시켜주었습니다.

router.get('/logout', (req, res) => {

`    `res.clearCookie('sssn') //쿠키를 초기화 해라

`    `res.clearCookie('cssn') //쿠키를 초기화 해라

`    `res.render('login'); //로그인 안했으면 login.hbs 를 넘겨줌

});

이후에 설명할 로그아웃 버튼으로 /logout으로 이동해서 오게되면 기존의 쿠키를 삭제해주도록 하였습니다. 따라서 관리자로 로그인했다가 쿠키가 남았는데 고객이 로그인해 관리자 페이지에 접근할 수 있는 문제를 막을 수 있습니다.

`    `if (checkLogin&&checkrole=='customer') { // 고객일때

`        `res.cookie('cssn',cssn,{

`            `expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)

`            `//쿠키가 유효한 시간

`            `httpOnly: true,

`        `})

`        `res.redirect('/customer'); //redirect는 get요청

`    `}   

로그인도 성공하고 role이 customer일때는 cssn이라는 쿠키를 만들어 cssn을 담아줍니다.

그리고 고객 전용 페이지인 /customer로 라우팅시켜줍니다.

`  `else if (checkLogin&&checkrole=='admin') { //관리자일때

`        `res.cookie('sssn',sssn,{

`            `expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)

`            `//쿠키가 유효한 시간

`            `httpOnly: true,

`        `})

`        `res.redirect('/admin');

`    `} 

로그인이 성공하고 role이 admin일때는 sssn이라는 쿠키를 만들어 판매자의 ssn을 담아줍니다.

그리고 관리자 전용 페이지인 /admin으로 라우팅 시켜줍니다.

**<customer.js>**

router.get('/', async function (req, res) {

`    `// 차 정보 불러오기

`    `var offset=0;

`    `var limit=offset+50;

`    `if(req.query.page){   

`        `var offset=50\*Number(req.query.page);

`        `var limit=50

`    `}

`    `const availablecars= await selectSql.getavailablecars(offset,limit);

`    `if (req.cookies.cssn) {



`        `// 불러온 user 정보 같이 넘겨주기

`        `const userinfo=await selectSql.getcustomer(req.cookies.cssn);

`        `res.render('customer',{ availablecars,userinfo,

`                                 `cssn: req.cookies.cssn});

`    `}

`    `else {

`        `res.render('login');

`        `res.redirect('/');

`    `}

});

위는 고객 전용 페이지의 js파일입니다. cssn이라는 쿠키가 있으면 정상적으로 rendering이 되어 보일 것입니다. getavailablecars라는 sql 함수로 예약이나 판매가 되지 않는 엄청나게 많은 차량 정보를 Load하는 페이지인데 전체를 다 Load하게 되면 페이지의 응답이 없게 되므로 Limt과 offset 기능을 활용하여 페이지처럼 50개씩 출력되도록 구현을 하였습니다. 

offset변수는 웹페이지에서 보고싶은 페이지를 0~1999로 지정해주고 입력한 페이지 값을get 메소드로 받아와 query안에 담긴 페이지 정보를 받아와서 50을 곱한뒤 사용합니다.

**<customer.hbs>**

` `<h3>보고싶은 차량페이지(50개씩 출력)를 입력하시오

`        `<form method="get" action="/customer">

`        `<input id="page" type="number" name="page"placeholder='0~1999' min="0" max="1999">

`        `<input type="submit" value="확인">

`        `</form>

`    `</h3>

위의 form이 페이지를 입력받는 부분입니다. get 메소드를 사용해 query로 넘기는 것을 볼 수 있습니다.

`        `<button onclick="location.href = 'http://localhost:3000/logout'">로그아웃</button>

위의 버튼을 통해 /logout으로 가게되고 login.js에서 if문에 걸려 쿠키가 삭제되게 됩니다.

**<admin.js>**

router.post('/delete/:vin',async(req,res)=>{ 

`    `const vin=req.params.vin;

`    `await deleteSql.deletevehicle(vin);

`    `res.redirect('/admin');

});

router.post('/insert',async(req,res)=>{

`    `const vars = req.body;

`    `const carinfo={

`        `vin:vars.vin,

`        `model:vars.model,

`        `color:vars.color,

`        `productionyear:vars.productionyear,

`        `price:vars.price,

`        `category:vars.category

`    `};

`    `await insertSql.insertcar(carinfo.vin, carinfo.model, carinfo.color, carinfo.productionyear, carinfo.price, carinfo.category);

`    `res.redirect('/admin');

});

위는 post 요청을 받는 부분입니다. 

/delete/:vin 는 삭제할 차량의 vin을 쿼리로 받아와 sql.js에서 사용할 수 있게 파라미터로 넣어주었습니다. 그리고 바로 admin을 redirect하여 실시간으로 적용이 된 것을 확인 할 수 있게 하였습니다.

/insert 부분은 차량을 DB에 새롭게 등록하는 기능입니다. 각각 입력받은 값들을 carinfo라는 객체에 담아서 sql문의 파라미터로 사용하였습니다. 그 후 마찬가지로 /admin으로 redirect합니다.

router.post('/update/vin/:vin',async(req,res)=>{ 

`    `const vin =req.params.vin;

`    `const u\_vin=req.body.vin;

`    `await updateSql.updatevin(u\_vin,vin);

`    `res.redirect('/admin');

});

…각 속성별로 동일한 매커니즘을 가져 생략하였습니다.

… 

router.post('/update/category/:vin',async(req,res)=>{ 

`    `const vin =req.params.vin;

`    `const category=req.body.category;

`    `await updateSql.updatecategory(category,vin);

`    `res.redirect('/admin');

});

각 차량에 대한 정보들을 수정하고 싶을 때 변경하는 update를 처리하는 post부분입니다. vin으로 수정할 차량을 구분짓고 웹페이지에서 입력받은 값을 sql문의 파라미터로 사용했습니다.

**<reserve.js>**

router.get('/', async function (req, res) {

`    `if (req.cookies.cssn) {

`            `// 차 정보 불러오기

`        `var offset=0;

`        `var limit=offset+50;

`        `if(req.query.page){   

`            `var offset=50\*Number(req.query.page);

`            `var limit=50

`        `}

`        `var today=new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');

`        `var maxday=new Date();

`        `maxday.setMonth(maxday.getMonth()+1);

`        `maxday=maxday.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');

`        `const userinfo=await selectSql.getcustomer(req.cookies.cssn);

`        `const reservelist=await selectSql.getreserve();

`        `const availablecars= await selectSql.getavailablecars(offset,limit);

`        `res.render('reserve',{min:today,max:maxday, availablecars,userinfo,reservelist, 'cssn': req.cookies.cssn });

`    `}   

`    `else{

`        `res.redirect('/');

`        `res.render('login');

`        `}  

});

위는 고객이 사용하는 예약 페이지입니다. 예약을 신청하거나 변경하는 페이지입니다.

마찬가지로 페이지기능을 추가해주었고 현재 날짜 이전으로는 선택을 하지 못하게 하기위해 오늘 날짜를 받아오는 today 변수에 오늘 날짜를 hbs와 mysql에서 지원하는 형식으로 바꾸는 작업을 replace라는 함수로 하였습니다. maxday는 현재 날짜 보다 한달 뒤 이며 오늘로부터 최소 한달 동안만 예약을 잡을 수 있게 하였습니다.

router.post('/delete/:r\_vin',async(req,res)=>{ //예약취소 버튼

`    `const r\_vin=req.params.r\_vin;

`    `console.log(r\_vin,req.cookies.cssn);

`    `await deleteSql.deletereserve(r\_vin,req.cookies.cssn);

`    `res.redirect('/reserve');

});

router.post('/:r\_vin',async(req,res)=>{ //예약버튼

`    `const r\_vin=req.params.r\_vin;

`    `const date=req.body.reservedate;

`    `const sssn=req.body.sssn;

`    `await insertSql.insertreserve(r\_vin,req.cookies.cssn,date);

`    `res.redirect('/reserve');

});

/delete/:r\_vin은 예약취소를 하고 싶은 차량의 vin을 받아와 sql문의 파라미터로 사용할 수 있게 합니다. 그리고 /reserve로 바로 redirect해 실시간 반영을 해주었습니다.

/:r\_vin도 마찬가지로 예약을 신청하는 post이고 웹에서 받아온 date를 sql문에서 사용할 수 있게 파라미터로 씁니다. 바로 /reserve로 redirect 합니다.

**<reserve.hbs>**

`       `<form method="post" action="/reserve/{{r\_vin}}">

`                `<td>

`                `<input type="date" min={{../min}} max={{../max}} name="reservedate" required="required">

`                `</td>

`                `<td> 

`                `<button name="reserve"  value="{{vin}}" formaction="/reserve/{{vin}}">예약</button>

`                `</td>

`            `</form>

예약할 날짜의 제한을 type=”date”의 min max 기능으로 구현 하였습니다.

**<sale.js>**

router.post('/:r\_vin',async(req,res)=>{

`    `const r\_vin=req.params.r\_vin;

`    `let date=new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'); //오늘날짜 받기

`    `const sssn=req.body.sssn;

`    `const cssn=await selectSql.getcssn(r\_vin);

`    `await insertSql.insertsale(r\_vin, sssn, cssn[0].rc\_ssn,date);

`    `res.redirect('/sale');

});

router.post('/delete/:r\_vin',async(req,res)=>{ //예약취소

`    `const r\_vin=req.params.r\_vin;

`    `await deleteSql.deletereserve(r\_vin);

`    `res.redirect('/sale');

});

이 페이지는 관리자페이지에서 판매완료나 예약취소를 하기위한 페이지입니다.

/:r\_vin 부분은 예약이 걸려있는 차를 판매확정 시키는 버튼을 post요청입니다. 판매확정 버튼을 누르면 오늘 날짜를 받아오는 date 변수를 통해 inserSale 함수로 판매 테이블에 insert하고 이 함수는 이 차에 대한 예약내역을 지웁니다.

/delete/:r\_vin 부분은 예약내역을 관리자가 직접 취소하는 부분입니다. 쿼리를 통해 받은 r\_vin을 sql문의 파라미터로 사용합니다.

**<sale.hbs>**

` `<form method="get" action="/detail">

`                `<td>

`                `<button name ="detail" value="{{r\_vin}}" formaction="/detail/{{r\_vin}}">상세정보</button>

`                `</td>

`            `</form>

위는 예약된 차량의 상세정보를 보는 페이지입니다. 차대번호만 조회가 되기에 상세정보 버튼을 누르면 선택한 차량의 r\_vin과 함께 detail이라는 페이지로 가도록 했습니다.

**<detail.js>**

router.get('/:r\_vin', async (req, res) => {

`    `// 차 세부정보 불러오기

`    `const data = req.params.r\_vin;

`    `const cardetail = await selectSql.getcarinfo(data);

`    `console.log(cardetail)

`    `if (req.cookies.cssn||req.cookies.sssn) {

`        `res.render('detail',{cardetail});

`    `}

`    `else {

`        `res.render('login');

`        `res.redirect('/');

`    `}

});

관리자도 차량 판매 페이지나 고객의 예약 페이지에선 차량의 정보중 차대번호만 조회를 할 수 있기에 detail이라는 페이지에 쿼리로 받아온 차대번호를 통해 select를 해서 차량의 정보를 표시하도록 했습니다. if문의 조건 을 보면 관리자나 고객 모두 접근이 가능하도록 or 연산자를 써주었습니다

**<index.js>**

app.use("/", loginRouter);

app.use("/customer", customerRouter); //고객이 로그인을 성공적으로 했을때

app.use("/admin", adminRouter); //관리자가 로그인을 성공적으로 했을때

app.use("/reserve",reserveRouter);

app.use("/sale",saleRouter);

app.use("/detail",detailRouter);

생성된 페이지들을 라우팅하기위해 위와같이 작성해주었습니다.


**<sql.js>** export const selectSql = {

`  `getUsers: async () => {

`    `const [rows] = await promisePool.query(`select \* from user`);

`    `return rows

`  `},

`  `getcustomer:async(cssn)=>{

`    `const [rows]=await promisePool.query(`select \* from customer where c\_ssn=${cssn}`);

`    `return rows;

`  `},

`  `getallcustomer:async()=>{

`    `const [rows]=await promisePool.query(`select \* from customer`);

`  `},

`   `getreserve:async(cssn)=>{

`    `const [rows]=await promisePool.query(`select \* from reservation where rc\_ssn=${cssn}`);

`    `return rows;

`  `},

`  `getallreserve:async()=>{

`    `const [rows]=await promisePool.query(`select \* from reservation`);

`    `return rows;

`  `},

`  `getcarinfo:async(vin)=>{

`    `const [rows]=await promisePool.query(`select \* from vehicle where vin='${vin}'`);

`    `return rows;

`  `},

`  `getallcar:async(offset,limit)=>{

`    `const [rows]=await promisePool.query(`select \* from vehicle limit ${offset},${limit}`);

`    `return rows;

`  `},

`  `getsoldcar: async (sssn) => {

`    `const [rows]=await promisePool.query(`select \* from sale where ss\_ssn=${sssn}`);

`    `return rows;

`  `},

`  `getallsoldcar: async () => {

`    `const [rows]=await promisePool.query(`select \* from sale`);

`    `return rows;

`  `},

`  `getavailablecars: async (offset,limit) => {

`    `const [rows]=await promisePool.query(`select \* from available limit ${offset},${limit}`);

`    `return rows;

`  `},

`  `getcssn: async(r\_vin)=>{

`    `const sql =`select rc\_ssn from reservation where r\_vin='${r\_vin}'`;

`    `const [result] = await promisePool.query(sql);

`    `return result;

`  `},

`  `getsname: async(sssn)=>{

`    `const sql =`select s\_name from salesman where s\_ssn='${sssn}'`;

`    `const [result] = await promisePool.query(sql);

`    `return result;

`  `}

}

selectSql부분입니다. 위에서부터 차례대로 설명하겠습니다. 

getUsers는 user테이블의 전체를 select하는 함수입니다.

getcustomer는 cssn을 통해 고객의 정보를 select하는 함수입니다.

getallcustomer는 모든 고객의 함수를 조회하는 함수 입니다.

getreserve는 로그인한 고객이 예약한 예약내역을 조회하는 함수입니다.

getallreserve는 모든 예약내역을 조회하는 함수입니다.

getcarinfo는 vin을 통해 차의 정보를 조회하는 함수고 상세정보페이지에서 씁니다.

getallcar는 모든 차량의 정보를 offset과 limit만큼 조회해줍니다. 저는 limit을 50으로 고정해 50개씩 출력하도록하였고 offset은 직접 입력받도록 했습니다.

getsoldcar는 특정 관리자(판매자)가 판매한 차를 조회하는 함수입니다. 

getallsoldcar는 관리자 상관없이 판매완료된 모든 차들의 내역을 조회하는 함수입니다.

getavailablecars는 현재 고객이 예약이 가능한 차량을 조회하기위해 만든 함수이며, 예약테이블이나 판매테이블에 들어가있지 않은 차들만 조회하게 했습니다. 앞서 만들었던 View를 통해 조회를 가능하게 해주었습니다.

getcssn은 예약내역중 차대번호를 통한 고객의 번호를 조회하는 함수입니다.

getsname은 관리자가 로그인시 관리자페이지에서 이름을 출력하기위해 sssn을 통해서 그에맞는 관리자 이름을 조회하는 함수입니다.

export const deleteSql ={

`  `deletereserve:async(r\_vin)=>{

`    `const sql = `delete from reservation where r\_vin='${r\_vin}'`

`    `await promisePool.query(sql);

`  `},

`  `deletevehicle:async(vin)=>{

`    `const sql=`delete from vehicle where vin='${vin}'`

`    `await promisePool.query(sql);

`  `}

}

deleteSql 부분입니다.

deletereserve는 예약내역을 취소하는 함수입니다. 관리자나 고객이 사용합니다.

deletevehicle은 관리자가 차량을 DB에서 삭제하기위해 사용하는 함수입니다.

export const updateSql ={

`  `updatevin:async(u\_vin,vin)=>{

`    `const sql=`update vehicle set vin='${u\_vin}' where vin='${vin}'`

`    `await promisePool.query(sql);

`    `console.log(sql)

`  `},

updateSql 부분입니다. 각 차량의 정보를 관리자가 수정하도록 하는 함수입니다. vehicle 테이블의 속성마다 정의해주었으며 다른 속성에 대한 함수는 반복적이라 생략하겠습니다.

export const insertSql ={

`  `insertreserve:async(r\_vin,cssn,date)=>{

`    `const sql1 =`start transaction`

`    `const sql2 = `insert into reservation(rc\_ssn, r\_vin, r\_date) values ('${cssn}','${r\_vin}','${date}')`

`    `const sql3 =`commit`

`    `await promisePool.query(sql1);

`    `await promisePool.query(sql2);

`    `await promisePool.query(sql3);

`  `},

`  `insertsale:async(s\_vin,sssn,cssn,date)=>{

`    `const sql1 =`start transaction`

`    `const sql2 = `insert into sale(s\_vin, ss\_ssn, sc\_ssn,s\_date) values ('${s\_vin}',${sssn},${cssn},'${date}')

`    `on duplicate key update s\_vin='${s\_vin}', ss\_ssn=${sssn},sc\_ssn=${cssn};`

`    `const sql3 = `delete from reservation where r\_vin='${s\_vin}' and rc\_ssn='${cssn}'`

`    `const sql4 =`commit`

`    `await promisePool.query(sql1);

`    `await promisePool.query(sql2);

`    `await promisePool.query(sql3);

`    `await promisePool.query(sql4);

`  `},

`  `insertcar:async(vin, model, color, productionyear, price, category,uvin)=>{

`    `const sql1 =`start transaction`

`    `const sql2=`insert into vehicle (vin, model, color, productionyear, price, category) values ('${vin}','${model}','${color}','${productionyear}','${price}','${category}') 

`    `on duplicate key update vin='${uvin}'`

`    `const sql3=`commit`

`    `await promisePool.query(sql1);

`    `await promisePool.query(sql2);

`    `await promisePool.query(sql3);

`  `}

}

위는 insertSql부분입니다. 

insertreserve는 사용자가 예약을 할 수 있도록 예약내역을 insert하는 함수입니다.

insertsale은 관리자가 예약된 차량중 판매확정을 한 차량의 판매내역을 insert하는 함수입니다.

insertcar는 관리자가 DB에 새로운 차량을 등록할 때 사용하는 함수입니다.

**TRANSACTION**

sql.js에서 각 데이터를 insert할 때에 다른 사용자가 phantom read를 할 수 없도록 각 함수가 시작하기전 transaction을 start 하고 쿼리문이 끝나면 commit하게 해주었습니다.

현재 isolation level은 REPEATABLE-READ로 설정해주었습니다. 다른 DBMS에선 현 level에서도 Phantom read 문제가 발생하지만 Mysql에서는 해당 문제가 발생하지 않아 위와 같이 설정 해주었습니다.

**PAGE VERIFICATION**

`  `고객1의 계정으로 로그인 해보겠습니다.

쿠키도 생성이 되었습니다.



`	`위와 같이 고객 전용 페이지인 /customer 로 가는 것을 볼 수 있습니다.

위 버튼중 차량예약/취소 페이지로 가보겠습니다.


위와 같이 /reserve로 잘 들어와졌으며 각 차량별로 예약날짜와 예약버튼이 있습니다. 또한 50개씩 출력되는 차량의 정보를 페이지를 입력하여 10만개의 차량 전부를 조회할 수 있도록 하였습니다.

` `위와 같이 600 페이지로 이동하겠습니다.



600페이지의 제일 위에 조회되는 차량을 예약해보겠습니다.

옆과 같이 날짜를 선택하는 창에서 오늘 이전의 날짜는 회색으로 선택 할 수 없게 되어있습니다.

예약내역에 바로 적용이 되어 볼 수 있습니다.

이후 예약한 차량의 상세정보 버튼을 눌러 차량의 상세정보 또한 볼 수 있습니다.

새롭게 추가로 예약을 해보았습니다. 마찬가지로 잘 되는 것을 볼 수 있습니다.

로그아웃을 하였습니다. 

고객2로 로그인 

하겠습니다.


고객1의 쿠키는 삭제되고 고객2의 쿠키가 

생성됨을 볼 수 있습니다.



새로운 고객이름도 정상적으로 조회됩니다. 




예약내역이 없는 것을 확인할 수 있습니다.



아까와 동일하게 페이지 600으로 갔는데 손혁진 고객이 예약한 차(차대번호: )가 보이지 않음을 확인했습니다.

AAAEF52GJ2R346575이 차대번호인 차를 예약하겠습니다.

정상적으로 예약이 됩니다.

새로운 예약을 신청하고 이전 예약을 지워보겠습니다.

취소한 차량( 차대번호: AAAEF52GJ2R346575 )은 밑에 조회가 다시 되는 것을 볼 수 있습니다.


이제 로그인을 관리자1로 해보겠습니다.


쿠키가 위와같이 sssn으로 생성이 되었습니다.


그리고 관리자 전용 페이지로 잘 들어왔습니다.

페이지는 위와같이 구성되어있습니다. 각 판매자별로 판매한 차량내역을 볼 수 있도록 해주었습니다.

그리고 판매완료나 예약취소를 할 수 있는 페이지로가는 버튼을 만들어 sale페이지로 이동합니다.

그리고 새로운 차량을 등록하는 부분도 있습니다.

마지막으로 모든 차량의 데이터를 수정 또는 삭제 할 수 있게 구현하였습니다.

차량판매/예약취소하기 버튼을 눌러보겠습니다.


위와 같이 현재는 판매완료된 차량이 없습니다. 또한 이전에 고객 두명이 예약한 차량 내역이 있음을 볼 수 있습니다. 제일 위의 예약된 차량을 판매자 번호 1이 팔았다고 입력하고 판매확정을 해보겠습니다.

오늘 날짜로 판매가 확정이 되어 밑에 조회가 되는 것을 볼 수 있습니다. 예약번호가 2인 차량의 예약을 취소해보겠습니다.

위와같이 사라짐을 볼 수 있습니다. 그 후 뒤로가기를 눌렀습니다.

1번 판매자가 판매한 내역이 보입니다.

남아있는 차량도 판매하겠습니다 2번 판매자가 팔았다고 하겠습니다.

여기엔 잘 조회가 됩니다!

뒤로가기를 눌러 다시 관리자 페이지로 오니 2번 관리자가 판매한내역은 1번 관리자의 판매내역에 안보이는 것을 알 수 있습니다.

위와 같이 aaaaaaaaaaaaaaaaa이 차대번호인 차량을 등록해보겠습니다.

등록 후 바로 밑에 차량이 조회가 됨을 볼 수 있습니다.

차의 시세가 내려가 가격조정이 필요해 1500$로 수정하고싶어서 적고 수정을 해보겠습니다.

위와같이 수정이되어 반영이 됩니다. 이후 이 차량을 삭제해보겠습니다.

삭제가 되어 보이지 않음을 알 수 있습니다. 

판매완료가 되어진 차량중 드래그되어있는 차량을 찾아서 삭제해보겠습니다.

현재 주황색으로 검색을 해서 찾았습니다. 존재합니다. 삭제해보겠습니다.

여기선 조회가 되지 않습니다. 

하지만 판매내역에는 그대로 남아져있습니다. 이렇게 설계한 이유는 DB상 관리하는차량과 별개로 판매내역은 회사에서 꼭 남겨서 관리를 해야한다고 생각했기 때문입니다.

새롭게 고객1이 차량을 예약했습니다.

이번엔 관리자2로 접속해서 예약되어있는 차량을 DB에서 삭제해보겠습니다.

.

위와같이 조회가 되는데 삭제버튼을 누르고 예약내역을 확인해보겠습니다.

DB에서 삭제를 시키니 예약내역에서도 같이 삭제가 됨을 볼 수 있었습니다.

트랜잭션이 잘 되는지 확인을 위해 새로운 브라우저에서 접속을 해 관리자1, 고객1로 작업을 해보겠습니다.


로그인 후 각각 관리자와 , 고객 전용 페이지로 넘어가지는 것을 확인하고 쿠키도 잘 맞게 생성이 됨을 확인 했습니다.

관리자는 insert하고 고객은 예약을 하기위해 차량을 조회하고 싶습니다.

현재 관리자 페이지에선 새로운 자동차를 입력해주었습니다. 하지만 고객은 아직 새로고침을 하지 않아 그대로 최상단에는 추가된 차량이 조회가 되지 않고 예약을 할 수 있습니다.

이후 예약버튼을 누르자 sql함수들이 다시 실행되어 보이게 됩니다. 

이 과정이 트랜잭션을 성공적으로 실행하도록 한 것은 실질적으로는 아니지만 문제없이 돌아가는 것을 알 수는 있습니다. 트랜잭션을 통해 문제가 생기려면 동시에 두가지 작업을 하는 과정이 필요한데 직접 하지는 그 과정을 보여주는 것 까지는 못하였습니다.

3. **결론**
- 이번 프로젝트를 하면서 새로운 미니월드를 사상하고 실제세계와 최대한 비슷하게 만드려고 노력을 하였지만 생각해야할 것이 너무 많아 생각 보다 시간소요가 많이 들었습니다.

구현하면서도 시간소요가 컸는데, 특히 js와 hbs에서 render를 해주어 변수내용을 전달받는 것과, 웹에서 입력받은 값들을 js 파일에서 사용할 수 있도록하는 것이 너무 어려웠습니다. 하지만 검색을 통해 query를 이용하는 방법, post요청을 통해 value값으로 넘기는 방법등 여러 방법들에 대해 깨우치고 숙달되니 체화가 된 것 처럼 잘 할 수 있었습니다. 또한 구현을 하면서 조금만 더 조금만 더 하는 인간의 욕심 때문에 새로운 것을 찾아보느라 시간을 많이 쓴 것 같습니다.

그래도 새로운 미니월드를 통해 DB설계를 처음부터 끝까지 진행하고 얕지만 프론트까지 직접 구현하니 능력치가 매우 향상되었던거 같습니다. 이번 수업을 들으며 새로운 것들을 많이 접하고 군복학 후라 모르는게 너무 많아서 막막했지만 프로젝트를 통해서 얻어가는 지식들이 많아 지금까지 학교에서 들은 수업 중 제일 유익한 수업이었던 것 같습니다.
