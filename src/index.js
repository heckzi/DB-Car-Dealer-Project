// Copyright 2022 kms
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
import logger from "morgan";
import path from "path";
import liveReload from 'livereload';
import connectLiveReload from 'connect-livereload';

import loginRouter from "./routes/login";
import customerRouter from "./routes/customer";
import adminRouter from "./routes/admin";
import reserveRouter from "./routes/reserve";
import saleRouter from "./routes/sale";
import detailRouter from "./routes/detail";


const PORT = 3000;

const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100) //0.1초마다 리프레쉬를 할것이다.
});

const app = express(); // app은 express의 객체임

app.use(connectLiveReload()); //connectlivereload 얘를 사용하겠다.

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public'))) //hbs 파일이 css 를 불러와서 사용할 것인데 그 경로를 설정해준것

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/customer", customerRouter); //고객이 로그인을 성공적으로 했을때
app.use("/admin", adminRouter); //관리자가 로그인을 성공적으로 했을때
app.use("/reserve",reserveRouter);
app.use("/sale",saleRouter);
app.use("/detail",detailRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
