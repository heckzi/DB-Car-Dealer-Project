import express from "express";
import async from "hbs/lib/async";
// sql import
import {updateSql,deleteSql, insertSql, selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    // 차 정보 불러오기

    if (req.cookies.sssn) {
        // 불러온 user 정보 같이 넘겨주기
        const availablecars= await selectSql.getavailablecars();
        const soldcar= await selectSql.getsoldcar(req.cookies.sssn);
        const customerinfo=await selectSql.getallcustomer();
        const sname=await selectSql.getsname(req.cookies.sssn);
        console.log(sname)
        res.render('admin',{sname,soldcar,customerinfo, availablecars, sssn: req.cookies.sssn });
    } else {
        res.render('/login')
    }

});
router.post('/delete/:vin',async(req,res)=>{ 
    const vin=req.params.vin;
    await deleteSql.deletevehicle(vin);
    res.redirect('/admin');
});
router.post('/insert',async(req,res)=>{
    const vars = req.body;
    const carinfo={
        vin:vars.vin,
        model:vars.model,
        color:vars.color,
        productionyear:vars.productionyear,
        price:vars.price,
        category:vars.category
    };
    await insertSql.insertcar(carinfo.vin, carinfo.model, carinfo.color, carinfo.productionyear, carinfo.price, carinfo.category);
    res.redirect('/admin');
});
router.post('/update/vin/:vin',async(req,res)=>{ 
    const vin =req.params.vin;
    const u_vin=req.body.vin;
    await updateSql.updatevin(u_vin,vin);
    res.redirect('/admin');
});
router.post('/update/model/:vin',async(req,res)=>{ 
    const vin =req.params.vin;
    const model=req.body.model;
    await updateSql.updatemodel(model,vin);

    res.redirect('/admin');
});
router.post('/update/color/:vin',async(req,res)=>{ 
    const vin =req.params.vin;
    const color=req.body.color;
    await updateSql.updatecolor(color,vin);
    res.redirect('/admin');
});
router.post('/update/productionyear/:vin',async(req,res)=>{ 
    const vin =req.params.vin;
    const productionyear=req.body.productionyear;
    await updateSql.updateproductionyear(productionyear,vin);
    res.redirect('/admin');
});
router.post('/update/price/:vin',async(req,res)=>{ 
    const vin =req.params.vin;
    const price=req.body.price;
    await updateSql.updateprice(price,vin);
    res.redirect('/admin');
});
router.post('/update/category/:vin',async(req,res)=>{ 
    const vin =req.params.vin;
    const category=req.body.category;
    await updateSql.updatecategory(category,vin);
    res.redirect('/admin');
});

module.exports = router;