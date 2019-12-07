'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
// 新增會員資料
//------------------------------------------
var linkStart = async function (lineid, id, password) {
    //存放結果
    let result;

    //新增會員資料
    await query("UPDATE member SET lineid = $1 WHERE id LIKE $2 AND password LIKE $3", [lineid, id, password])
        .then((data) => {
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}

//------------------------------------------
// 刪除會員資料
//------------------------------------------
var disconnect = async function (lineid) {
    //存放結果
    let result;

    //新增會員資料
    await query("UPDATE member SET lineid = '' WHERE lineid LIKE $1", [lineid])
        .then((data) => {
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}

var register = async function (id, password, lineid) {
    //存放結果
    let result;
    //新增日記
    await query('INSERT INTO member(id, password, lineid) values($1, $2, $3)', [id, password, lineid])
        .then((data) => {
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}

var isLogin = async function (lineid) {
    //存放結果
    let result = true;
    //新增會員資料
    await query("SELECT * FROM member WHERE lineid = $1", [lineid])
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
//------------------------------------------

//匯出
module.exports = { linkStart, disconnect, register, isLogin };