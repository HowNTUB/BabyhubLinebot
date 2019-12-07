'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
// 搜尋全部日記
//------------------------------------------
var isHaveBaby = async function (lineid) {
    //存放結果
    let result = true;
    //新增會員資料
    await query("SELECT * FROM member JOIN baby ON member.id = baby.id WHERE member.lineid like $1", [lineid])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];  //學生資料(物件)
            } else {
                result = -1;  //找不到資料
            }
        }, (error) => {
            result = -9;  //執行錯誤
        });
    //回傳執行結果
    return result;
}

var searchBaby = async function (id) {
    //存放結果
    let result;

    //搜尋全部日記
    await query('select * from baby where id = $1', [id])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;
            } else {
                result = -1;
            }
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}

var useIdSearchBabydata = async function (id) {
    //存放結果
    let result;

    //搜尋全部日記
    await query('SELECT * FROM baby t02 FULL OUTER JOIN (SELECT growingrecord.serno,growingrecord.babyno, growingrecord.height, growingrecord.weight FROM growingrecord,(SELECT babyno, MAX(recorddate) AS maxtime FROM growingrecord GROUP BY babyno) AS idview WHERE (growingrecord.babyno = idview.babyno) AND (growingrecord.recorddate = idview.maxtime)) t03 ON t02.babyno = t03.babyno WHERE id = $1 ORDER BY serno DESC', [id])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;
            } else {
                result = -1;
            }
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}

var nameGetNo = async function (name) {
    //存放結果
    let result;

    //讀取資料庫
    await query("select babyno from baby where name like $1", [name])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0]; 
            } else {
                result = -1;  //找不到資料
            }
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}
//------------------------------------------

//匯出
module.exports = { isHaveBaby, searchBaby, useIdSearchBabydata, nameGetNo };