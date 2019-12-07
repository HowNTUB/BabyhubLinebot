'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
// 新增日記
//------------------------------------------
var addGrowingRecord = async function (babyno) {
    //存放結果
    let result;
    var date = new Date();
    var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    //新增日記
    await query('INSERT INTO growingrecord(babyno, recorddate) values($1, $2)', [babyno, today])
        .then((data) => {
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}

var useLineidGetGrowingrecord = async function (lineid) {
    //存放結果
    let result;

    //讀取資料庫
    await query("SELECT * FROM growingrecord JOIN baby ON baby.babyno = growingrecord.babyno JOIN member ON member.id = baby.id WHERE member.lineid = $1 AND drinkmilk ISNULL LIMIT 1", [lineid])
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

var addGrowingRecordHeight = async function(serno, height){
    let result;
    console.log('serno:'+serno);
    console.log('height:'+height);
    await query('UPDATE growingrecord SET height=$1 WHERE serno=$2', [height, serno])
        .then((data) => {
            result = data.rows[0];
            console.log('sql success');
        }, (error) => {
            result = -1;
            console.log('sql faild');
        });
		
    return result;
}
var addGrowingRecordWeight = async function (serno, weight) {
    let result;

    await query('UPDATE growingrecord SET weight = $1 WHERE serno = $2', [weight, serno])
        .then((data) => {
            result = data.rows[0];  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}
var addGrowingRecordDrinkmilk = async function (serno, drinkmilk) {
    //存放結果
    let result;
    //新增日記
    await query('UPDATE growingrecord SET drinkmilk = $1 WHERE serno = $2', [drinkmilk, serno])
        .then((data) => {
            result = data.rows[0];  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}

var useLineidGetNewGrowingrecord = async function (lineid) {
    //存放結果
    let result;

    //讀取資料庫
    await query("SELECT * FROM growingrecord JOIN baby ON baby.babyno = growingrecord.babyno JOIN member ON member.id = baby.id WHERE member.lineid = $1 ORDER BY serno DESC LIMIT 1", [lineid])
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
var searchAllGrowingRecord = async function (babyno) {
    //存放結果
    let result;

    //搜尋全部日記
    await query('select * from growingrecord where babyno = $1 order by recorddate', [babyno])
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

//------------------------------------------
var searchGrowingRecordByYearMonth = async function (babyno, year, month) {
    //存放結果
    let result;

    var hasday=0;
    if(month==2){
        hasday=28;
    }else if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
        hasday=31;
    }else if(month==4||month==6||month==9||month==11){
        hasday=30;
    }
    
    await query('select * from growingrecord where babyno = $1 and recorddate between $2 and $3', [babyno, (year + '-' + month + '-' + 1), (year + '-' + month + '-' + hasday)])
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
//匯出
module.exports = { addGrowingRecord, useLineidGetGrowingrecord, addGrowingRecordHeight, addGrowingRecordWeight, addGrowingRecordDrinkmilk, useLineidGetNewGrowingrecord, searchAllGrowingRecord, searchGrowingRecordByYearMonth };