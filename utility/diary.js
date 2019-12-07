'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
// 新增日記
//------------------------------------------
var addDiary = async function (id, content) {
    //存放結果
    let result;
    var date = new Date();
    var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    //新增日記
    await query('insert into diary (id, diary, diarydate) values ($1, $2, $3)', [id, content, today])
        .then((data) => {
            console.log(data.diarydate);
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}

//------------------------------------------
// 搜尋全部日記
//------------------------------------------
var searchAllDiary = async function (id) {
    //存放結果
    let result;

    //搜尋全部日記
    await query('select * from diary where id = $1 order by diarydate', [id])
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
// 用年月搜尋日記
//------------------------------------------
var searchDiaryByYearMonth = async function (id, year, month) {
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
    //搜尋全部日記
    await query('select * from diary where id = $1 and diarydate between $2 and $3', [id, (year + '-' + month + '-' + 1), (year + '-' + month + '-' + hasday)])
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

//匯出
module.exports = { addDiary, searchAllDiary, searchDiaryByYearMonth };