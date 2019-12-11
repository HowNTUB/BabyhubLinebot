"use strict";

const express = require('express');
var moment = require('moment');
const { WebhookClient } = require('dialogflow-fulfillment');
const app = express();
const connect = require('./utility/connect');
const member = require('./utility/member');
const baby = require('./utility/baby');
const diary = require('./utility/diary');
const growingrecord = require('./utility/growingrecord');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const { Payload } = require('dialogflow-fulfillment');

app.post('/dialogflow', express.json(), (req, res) => {
    //------------------------------------
    // 處理請求/回覆的Dialogflow代理人
    //------------------------------------
    const agent = new WebhookClient({ request: req, response: res })

    //------------------------------------
    // 常用訊息
    //------------------------------------
    var noBabyMsg = '要先有👶🏻寶寶才能用這個功能哦（請使用網頁版的Babyhub來新增👶🏻寶寶的資料）。';
    var noLoginMsg = '要先登入帳號才能使用該功能哦😢。';
    var errorMsg = '❌程式好像出了點問題，請你再試一次唷。❌';
    //------------------------------------
    // 處理歡迎意圖
    //------------------------------------   

    function welcome() {
        var today = new Date();
        var nowHour = (today.getHours() + 8) > 12 ? (today.getHours() + 8) - 12 : today.getHours() + 8;
        var nowMinute = today.getMinutes();
        var nowTimeEmoji;
        switch (nowHour) {
            case 0:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕛";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕧";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕐";
                }
                break;
            case 1:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕐";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕜";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕑";
                }
                break;
            case 2:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕑";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕝";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕒";
                }
                break;
            case 3:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕒";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕞";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕓";
                }
                break;
            case 4:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕓";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕟";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕔";
                }
                break;
            case 5:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕔";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕠";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕕";
                }
                break;
            case 6:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕕";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕡";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕖";
                }
                break;
            case 7:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕖";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕢";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕗";
                }
                break;
            case 8:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕗";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕣";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕘";
                }
                break;
            case 9:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕘";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕤";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕙";
                }
                break;
            case 10:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕙";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕥";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕚";
                }
                break;
            case 11:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕚";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕦";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕛";
                }
                break;
            case 12:
                if (nowMinute >= 0 && nowMinute < 15) {
                    nowTimeEmoji = "🕛";
                } else if (nowMinute >= 15 && nowMinute < 45) {
                    nowTimeEmoji = "🕧";
                } else if (nowMinute >= 45 && nowMinute < 60) {
                    nowTimeEmoji = "🕐";
                }
                break;
        }
        var nowTimeStr = today.getHours() + 8 > 12 ? ((today.getHours() + 8) - 12) + ':' + nowMinute + " p.m." : (today.getHours() + 8) + ':' + nowMinute + " a.m.";
        var currentDateTime =
            today.getFullYear() + '年' +
            (today.getMonth() + 1) + '月' +
            today.getDate() + '日（' +
            nowTimeEmoji + nowTimeStr + '）';
        agent.add(req.body.queryResult.queryText + '👋～');
        agent.add("現在是" + currentDateTime);
    }
    function whoAmI(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        if (!connect.isLogin(lineid)) {
            agent.add(noLoginMsg);
        } else {
            return member.useLineIdSerchMember(lineid).then(data => {
                if (data == -9) {
                    agent.add(errorMsg);
                } else {
                    if (data.username != undefined) {
                        var emoji;
                        if (data.appellation == "爸爸") {
                            emoji = "👨";
                        } else if (data.appellation == "媽媽") {
                            emoji = "👩";
                        } else {
                            emoji = "🤡";
                        }

                        const lineMessage = {
                            "type": "image",
                            "originalContentUrl": "https://i.imgur.com/GvTlnnj.png",
                            "previewImageUrl": "https://i.imgur.com/GvTlnnj.png"
                        };
                        var payload = new Payload('LINE', lineMessage, {
                            sendAsMessage: true
                        });
                        agent.add(payload);
                        agent.add("你是" + data.username + "，是個" + emoji + data.appellation + "。");
                        agent.add("📧電子信箱是" + data.id);
                    } else {
                        agent.add(noLoginMsg);
                    }
                }
            })
        }
    }
    function myBaby(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == -1) {
                agent.add(noLoginMsg);
            } else {
                var id = data.id;
                return baby.isHaveBaby(lineid).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else if (data == -1) {
                        agent.add(noBabyMsg);
                    } else {
                        return baby.useIdSearchBabydata(id).then(data => {
                            if (data == -9) {
                                agent.add(errorMsg);
                            } else {
                                agent.add("👶🏻寶寶資訊");
                                data.forEach(item => {
                                    var emoji;
                                    if (item.gender == "男孩") {
                                        emoji = "👦🏻";
                                    } else if (item.gender == "女孩") {
                                        emoji = "👧🏻";
                                    }
                                    if (item.height == null) {
                                        agent.add(item.name + '是個' + emoji + item.gender + '\n🎂生日是' + moment(item.birthday).format("YYYY-MM-DD") + '\n目前還沒有寶寶的身高體重資訊哦😢');
                                    } else {
                                        agent.add(item.name + '是個' + emoji + item.gender + '\n🎂生日是' + moment(item.birthday).format("YYYY-MM-DD") + '\n📏身高' + item.height + '公分,🎛️體重' + item.weight + '公斤');
                                    }
                                });
                            }
                        })
                    }
                })
            }
        })
    }

    //------------------------------------   

    function loginAndLogout(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else {
                if (data == -1) { //沒登入
                    agent.add("請照以下格式輸入📧信箱與密碼來登入。\n信箱;密碼");
                    agent.add("像是：babyhub@gmail.com;mypassword");
                    agent.add("如果還沒有帳號的話，請先至官網註冊（點選📋圖文選單的Babyhub 🐻logo）。")
                } else { //已登入
                    const lineMessage = {
                        "type": "template",
                        "altText": "確定要登出嗎😢？",
                        "template": {
                            "type": "confirm",
                            "text": "確定要登出嗎😢？",
                            "actions": [
                                {
                                    "type": "message",
                                    "label": "是😭",
                                    "text": "是"
                                },
                                {
                                    "type": "message",
                                    "label": "否😄",
                                    "text": "否"
                                }
                            ]
                        }
                    };
                    var payload = new Payload('LINE', lineMessage, {
                        sendAsMessage: true
                    });
                    agent.add(payload);
                }
            }
        })
    }
    function login(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var id = req.body.queryResult.parameters.id;
        var password = req.body.queryResult.parameters.password;
        return connect.linkStart(lineid, id, password).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == 0) {
                agent.add('❌帳號或密碼錯誤');
            } else {
                return member.useLineIdSerchMember(lineid).then(data => {
                    agent.add(data.username + '登入成功囉❤️');
                })
            }
        })
    }
    function logout(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        return connect.disconnect(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else {
                agent.add('登出成功囉👍');
            }
        })
    }

    function register(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var id = req.body.queryResult.parameters.id;
        var password = req.body.queryResult.parameters.password;
        return connect.register(id, password, lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else {
                agent.add('註冊成功👍');
            }
        })
    }
    //------------------------------------   
    function NasalCongestion() {
        var number = req.body.queryResult.parameters.number;
        switch (number) {
            case 1:
                agent.add("你選擇使用嬰兒油、食鹽水用棉花棒清理");
                agent.add("建議讓寶寶躺著，固定頭部，利用棉花棒沾嬰兒油、食鹽水擦拭清理鼻腔，若有黏稠鼻涕，用旋轉的方式擦拭。");
                break;
            case 2:
                agent.add("你選擇溫毛巾敷鼻子");
                agent.add("用溼熱的毛巾在鼻子上施行熱敷，鼻黏膜遇熱擴張後，鼻腔會比較通暢，同時黏稠的鼻涕，也會被蒸氣軟化而流出來，每次敷約3～5分鐘，小心毛巾熱度過高燙傷哦。");
                break;
            case 3:
                agent.add("你選擇運用水蒸氣");
                agent.add("可利用浴室放熱水瀰漫的蒸氣，或是使用美容用的蒸臉器噴出來的蒸氣，吸3～5分鐘，再清除鼻涕。");
                break;
            case 4:
                agent.add("你選擇吸鼻球");
                agent.add("材質是橡膠，不會傷到嬰兒稚嫩的肌膚，可伸進寶寶的狹小鼻腔，將堵在鼻孔的鼻屎、鼻涕吸出來，緩解呼吸不順的症狀，但適用於新生兒，太嚴重的鼻塞較無效果。");
                break;
            case 5:
                agent.add("你選擇抗生素治療");
                agent.add("若是嚴重的鼻竇炎，必須10～14天完整的抗生素治療，並加上積極的膿液抽吸才能有良好的效果。。");
                break;
            default:
                agent.add("請輸入1~5，如果以上方法都沒用請帶著你的寶寶去看醫生。(輸入[附近醫院]查詢附近有哪些醫院診所。)");
        }
    }
    function doWhat() {
        var month = req.body.queryResult.parameters.month;
        agent.add("寶寶" + month + "個月")
        switch (month) {
            case 1:
                agent.add("寶寶應該會舞動雙手、會注意別人的臉。");
                break;
            case 2:
                agent.add("寶寶會有抓握的反射動作、逗弄時會笑。");
                break;
            case 3:
                agent.add("兩臂有對稱性的動作、雙手會碰在一起、會笑出聲音、會發出兩種不同的母音。");
                break;
            case 4:
                agent.add("手掌會有目的地的打開、會高興的尖叫。");
                break;
            case 5:
                agent.add("會將頭轉向聲源、會自動的對人微笑。");
                break;
            case 6:
                agent.add("會用手指及手掌捉握東西、眼睛會注射聲源。");
                break;
            case 7:
                agent.add("會將物品由一手轉交至另一手、會接連發出兩個母音。");
                break;
            case 8:
                agent.add("會拍擊物品、能聽懂熟悉的話、會拿住餅乾吃。");
                break;
            case 9:
                agent.add("會嘗試抓取較遠的玩具。");
                break;
            case 10:
                agent.add("會兩手交互取物、會搖鈴、會自己握住奶瓶喝水、對陌生人有反應（如：高興、害羞）。");
                break;
            case 11:
                agent.add("會用雙手各拿一塊積木互相敲打。");
                break;
            case 12:
                agent.add("會將積木放入盒中、會模仿說單字、大人幫忙穿衣時能配合動作。");
                break;
            default:
                agent.add("請輸入1~12個月唷～");
        }


    }
    function normalWeightNoYear() {
        var month = req.body.queryResult.parameters.month;
        var normalWeigth = 0;
        normalWeigth = 3 + month * 0.6;
        if (month < 1 || month > 12) { agent.add('我們僅提供1~12個月的正常體重唷') }
        else {
            if (month > 1 && month < 6) { normalWeigth = 3 + month * 0.6; }
            else if (month > 7 && month < 12) { normalWeigth = 3 + month * 0.5 }
            agent.add(month.toString() + '個月，大約' + normalWeigth.toString() + '公斤為正常體重');
        }
    }

    function normalWeightHaveYear() {
        var age = req.body.queryResult.parameters.age;
        var normalWeigth = 0;
        if (age < 1 || age > 12) { agent.add('我們僅提供1~12歲的正常體重唷') }
        else {
            normalWeigth = age * 2 + 7;
            agent.add(age.toString() + '歲，大約' + normalWeigth.toString() + '公斤為正常體重');
        }
    }
    function checkBabyGrowsNormally() {
        var month = req.body.queryResult.parameters.month;
        var height = req.body.queryResult.parameters.height;
        var weight = req.body.queryResult.parameters.weight;
        agent.add('年齡是' + month.toString() + '個月(month),' + '身高是' + height.toString() + '公分(cm)' + '體重是' + weight.toString() + '公斤(kg)');
    }

    //------------------------------------   
    //輸入寫日記，回復:可以開始寫日記，輸入內容，判斷是否有綁定
    function writeDiary(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == -1) {
                agent.add(noLoginMsg);
            } else {
                return member.lineidGetId(lineid).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else { //已登入
                        agent.add("✏️可以開始寫日記囉～");
                    }
                })
            }
        })
    }
    function writeDiaryNext(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var content = req.body.queryResult.parameters.content;
        var id;

        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else {
                id = data.id;
                return diary.addDiary(id, content).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else {
                        agent.add('日記新增成功囉❤️');
                    }
                })
            }
        })
    }
    function searchAllDiary(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var id;

        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == -1) {
                agent.add(noLoginMsg);
            } else {
                id = data.id;
                return baby.isHaveBaby(lineid).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else if (data == -1) {
                        agent.add(noBabyMsg);
                    } else {
                        return diary.searchAllDiary(id).then(data => {
                            var msg = '';
                            if (data == -9) {
                                agent.add(errorMsg);
                            } else {
                                data.forEach(item => {
                                    var dateStr = moment(item.diarydate).format("YYYY-MM-DD");
                                    msg = msg + '\n' + dateStr + '：' + item.diary;
                                });
                                agent.add('✏️我的日記\n' + msg);
                            }
                        })
                    }
                })

            }
        })
    }
    function searchDiaryByYearMonth(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var today = new Date();
        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == -1) {
                agent.add(noLoginMsg);
            } else {
                agent.add('請照格式輸入年月📆，像是');
                agent.add(today.getFullYear() + '/' + (today.getMonth() + 1));
            }
        })
    }
    function searchDiaryByYearMonth2(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var id;
        var year = req.body.queryResult.parameters.year;
        var month = req.body.queryResult.parameters.month;
        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else {
                id = data.id;
                return diary.searchDiaryByYearMonth(id, year, month).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else if (data == -1) {
                        agent.add('❌找不到資料');
                    } else {
                        var msg = '';
                        data.forEach(item => {
                            msg = msg + '\n\nday' + moment(item.diarydate).format("D") + '：\n' + item.diary;
                        });
                        agent.add('📖' + year + '年' + month + '月的日記\n' + msg);
                    }
                })
            }
        })
    }

    //------------------------------------   
    function insertGrowingRecord(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == -1) {
                agent.add(noLoginMsg);
            } else {
                return baby.isHaveBaby(lineid).then(data => {
                    var id = data.id;
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else if (data == -1) {
                        agent.add();
                    } else {
                        return baby.searchBaby(id).then(data => {
                            if (data == -9) {
                                agent.add(errorMsg);
                            } else {
                                var msg = [];
                                data.forEach(function (item, index) {
                                    if (index == 0) {
                                        msg.push({
                                            "imageUrl": "https://i.imgur.com/FqSRyzU.png",
                                            "action": {
                                                "type": "message",
                                                "label": item.name,
                                                "text": item.name
                                            }
                                        });
                                    } else {
                                        msg.push({
                                            "imageUrl": "https://i.imgur.com/FqSRyzU.png",
                                            "action": {
                                                "type": "message",
                                                "label": item.name,
                                                "text": item.name
                                            }
                                        });
                                    }
                                });
                                const lineMessage = {
                                    "type": "template",
                                    "altText": "this is a image carousel template",
                                    "template": {
                                        "type": "image_carousel",
                                        "columns":
                                            msg
                                    }
                                };
                                var payload = new Payload('LINE', lineMessage, {
                                    sendAsMessage: true
                                });
                                agent.add("請選擇要紀錄的👶🏻寶寶");
                                agent.add(payload);
                            }
                        })
                    }
                })
            }
        })
    }
    function insertGrowingRecordInsert(agent) {
        var babyname = req.body.queryResult.parameters.name;
        return baby.nameGetNo(babyname).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == 0) {
                agent.add('❌沒有找到你的寶寶，請確認有沒有正確的輸入👶🏻寶寶名字。');
            } else {
                var babyno = data.babyno;
                return growingrecord.addGrowingRecord(babyno).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else {
                        agent.add('請輸入寶寶的📏身高(cm)');
                    }
                })
            }
        })
    }
    function insertGrowingRecordAddHeight(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var height = req.body.queryResult.parameters.height;
        return growingrecord.useLineidGetGrowingrecord(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else {
                var serno = data.serno;
                return growingrecord.addGrowingRecordHeight(serno, height).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else {
                        agent.add('請輸入寶寶的🎛️體重(kg)');
                    }
                })
            }
        })
    }
    function insertGrowingRecordAddWeight(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var weight = req.body.queryResult.parameters.weight;
        return growingrecord.useLineidGetGrowingrecord(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else {
                var serno = data.serno;
                return growingrecord.addGrowingRecordWeight(serno, weight).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else {
                        agent.add('請輸入寶寶的🍼喝奶量(cc)');
                    }
                })
            }
        })
    }
    function insertGrowingRecordAddDrinkmilk(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        var drinkmilk = req.body.queryResult.parameters.drinkmilk;
        return growingrecord.useLineidGetGrowingrecord(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else {
                var serno = data.serno;
                return growingrecord.addGrowingRecordDrinkmilk(serno, drinkmilk).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else {
                        return growingrecord.useLineidGetNewGrowingrecord(lineid).then(data => {
                            if (data == -9) {
                                agent.add(errorMsg);
                            } else {
                                var msg = "";
                                msg += data.name + '的成長紀錄新增成功囉❤️\n';
                                msg += '📏身長:' + data.height + 'cm\n';
                                msg += '🎛️體重:' + data.weight + 'kg\n';
                                msg += '🍼喝奶量:' + data.drinkmilk + 'cc';
                                agent.add(msg);
                            }
                        })
                    }
                })
            }
        })
    }


    function searchGrowingRecordByYearMonth(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == -1) {
                agent.add(noLoginMsg);
            } else {
                return baby.isHaveBaby(lineid).then(data => {
                    var id = data.id;
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else if (data == -1) {
                        agent.add();
                    } else {
                        return baby.searchBaby(id).then(data => {
                            if (data == -9) {
                                agent.add(errorMsg);
                            } else {
                                var msg = [];
                                data.forEach(function (item, index) {
                                    if (index == 0) {
                                        msg.push({
                                            "imageUrl": "https://i.imgur.com/FqSRyzU.png",
                                            "action": {
                                                "type": "message",
                                                "label": item.name,
                                                "text": item.name
                                            }
                                        });
                                    } else {
                                        msg.push({
                                            "imageUrl": "https://i.imgur.com/FqSRyzU.png",
                                            "action": {
                                                "type": "message",
                                                "label": item.name,
                                                "text": item.name
                                            }
                                        });
                                    }
                                });
                                const lineMessage = {
                                    "type": "template",
                                    "altText": "this is a image carousel template",
                                    "template": {
                                        "type": "image_carousel",
                                        "columns":
                                            msg
                                    }
                                };
                                var payload = new Payload('LINE', lineMessage, {
                                    sendAsMessage: true
                                });
                                agent.add("請選擇要紀錄的👶🏻寶寶");
                                agent.add(payload);
                            }
                        })
                    }
                })
            }
        })
    }
    function searchGrowingRecordByYearMonthInBaby(agent) {
        var babyname = req.body.queryResult.parameters.babyname;
        var today = new Date();
        return baby.nameGetNo(babyname).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == 0) {
                agent.add('❌沒有找到你的寶寶👶🏻，請確認有沒有正確的輸入寶寶名字👶🏻。');
            } else {
                agent.add('請照格式輸入年月📆，像是');
                agent.add(today.getFullYear() + '/' + (today.getMonth() + 1));
            }
        })
    }
    function searchGrowingRecordByYearMonthInYearMonth(agent) {
        var babyname = req.body.queryResult.fulfillmentText;
        var year = req.body.queryResult.parameters.year;
        var month = req.body.queryResult.parameters.month;
        var babyno;
        console.log(req.body.queryResult.fulfillmentText)
        console.log(req.body.queryResult.fulfillmentMessages)
        return baby.nameGetNo(babyname).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == 0) {
                agent.add('❌沒有找到你的寶寶👶🏻，請確認有沒有正確的輸入寶寶名字👶🏻。');
            } else {
                babyno = data.babyno;
                return growingrecord.searchGrowingRecordByYearMonth(babyno, year, month).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else if (data == 0) {
                        agent.add('❌找不到資料');
                    } else {
                        var msg = '';
                        data.forEach(item => {
                            msg += '\n\n\nday' + moment(item.recorddate).format("D") + '：' + '\n📏身長 ' + item.height + 'cm' + '\n🎛️體重 ' + item.weight + 'kg' + '\n🍼喝奶量 ' + item.drinkmilk + 'cc';
                        });
                        agent.add('📖' + year + '年' + month + '月的成長紀錄\n' + msg);
                    }
                })
            }
        })
    }
    function searchAllGrowingRecord(agent) {
        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;

        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == -1) {
                agent.add(noLoginMsg);
            } else {
                return baby.isHaveBaby(lineid).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else if (data == -1) {
                        agent.add(noBabyMsg);
                    } else {
                        return member.lineidGetId(lineid).then(data => {
                            if (data == -9) {
                                agent.add(errorMsg);
                            } else {
                                var id = data.id;
                                return baby.searchBaby(id).then(data => {
                                    if (data == -9) {
                                        agent.add(errorMsg);
                                    } else if (data == 0) {
                                        agent.add(noBabyMsg);
                                    } else {
                                        var name = '請問要查詢哪個👶🏻寶寶的生長紀錄？\n';
                                        data.forEach(item => {
                                            name = name + '\n' + item.name;
                                        });
                                        agent.add(name);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    function searchAllGrowingRecord2(agent) {
        var babyname = req.body.queryResult.parameters.babyname;
        var babyno = '';

        var lineid = req.body.originalDetectIntentRequest.payload.data.source.userId;
        return member.lineidGetId(lineid).then(data => {
            if (data == -9) {
                agent.add(errorMsg);
            } else if (data == -1) {
                agent.add(noLoginMsg);
            } else {
                return baby.nameGetNo(babyname).then(data => {
                    if (data == -9) {
                        agent.add(errorMsg);
                    } else if (data == 0) {
                        agent.add('❌沒有找到你的寶寶👶🏻，請確認有沒有正確的輸入寶寶名字👶🏻。');
                    } else {
                        babyno = data.babyno;
                        return growingrecord.searchAllGrowingRecord(babyno).then(data => {
                            var msg = '';
                            if (data == -9) {
                                agent.add(errorMsg);
                            } else {
                                data.forEach(item => {
                                    var dateStr = moment(item.diarydate).format("DD號");
                                    msg = msg + '\n\n' + dateStr + '：' + '\n身長 ' + item.height + 'cm' + '\n體重 ' + item.weight + 'kg' + '\n喝奶量 ' + item.drinkmilk + ' ml';
                                });
                                agent.add('📖' + babyname + '的成長紀錄\n\n' + msg);
                            }
                        })
                    }
                })
            }
        })
    }
    //------------------------------------   

    function Test(agent) {
        const lineMessage = {
            "type": "template",
            "altText": "這是一個確認樣板",
            "template": {
                "type": "confirm",
                "text": "是否確認要訂房?",
                "actions": [{
                    "type": "datetimepicker",
                    "label": "請選擇日期",
                    "data": "訂房日期",
                    "mode": "date",
                    "initial": "2019-11-20",
                    "max": "2020-12-31",
                    "min": "2018-11-20"
                },
                {
                    "type": "message",
                    "label": "放棄訂房",
                    "text": "否"
                }]
            }
        };
        var payload = new Payload('LINE', lineMessage, {
            sendAsMessage: true
        });
        agent.add(payload);
        console.log('觀察以下物件********************');
        console.log(req.headers);
        console.log(JSON.stringify(req.body));
        console.log('*******************************');
    }
    function Test2(agent) {

    }
    function Test3(agent) {
        console.log('*******************************');
        console.log(req.body.queryResult.parameters);
        console.log('*******************************');
        console.log(req);
        console.log('*******************************');
        console.log(res);
        console.log('*******************************');
        console.log(req.body.queryResult.fulfillmentText);
        agent.add("安安");
    }

    //------------------------------------
    // 設定對話中各個意圖的函式對照
    //-----------------------
    let intentMap = new Map();
    //------------------------------------
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('who am i', whoAmI);
    intentMap.set('my baby', myBaby);

    //綁定與解除綁定
    intentMap.set('login / logout', loginAndLogout);
    intentMap.set('login / logout - login', login);
    intentMap.set('login / logout - logout', logout);
    intentMap.set('register - custom', register);

    intentMap.set('do what', doWhat);
    intentMap.set('NasalCongestion - custom', NasalCongestion);
    intentMap.set('Normal weight - no - custom', normalWeightNoYear);
    intentMap.set('Normal weight - yes - custom', normalWeightHaveYear);
    intentMap.set('check Baby grows normally - yes - select.number', checkBabyGrowsNormally);

    //日記功能
    intentMap.set('write diary', writeDiary);
    intentMap.set('write diary - custom', writeDiaryNext);
    intentMap.set('search all diary', searchAllDiary);
    intentMap.set('search diary by year and month', searchDiaryByYearMonth);
    intentMap.set('search diary by year and month - custom', searchDiaryByYearMonth2);
    //成長紀錄功能
    intentMap.set('insert growing record', insertGrowingRecord);
    intentMap.set('insert growing record insert', insertGrowingRecordInsert);
    intentMap.set('insert growing record add height', insertGrowingRecordAddHeight);
    intentMap.set('insert growing record add weight', insertGrowingRecordAddWeight);
    intentMap.set('insert growing record add drinkmilk', insertGrowingRecordAddDrinkmilk);
    intentMap.set('search all growing record', searchAllGrowingRecord);
    intentMap.set('search all growing record - custom', searchAllGrowingRecord2);
    intentMap.set('search growing record by name and year and month', searchGrowingRecordByYearMonth);
    intentMap.set('search growing record by name and year and month - custom', searchGrowingRecordByYearMonthInBaby);
    intentMap.set('search growing record by name and year and month - custom - custom', searchGrowingRecordByYearMonthInYearMonth);

    intentMap.set('Test', Test);
    intentMap.set('Test - custom', Test2);
    intentMap.set('Test - custom - custom', Test3);

    //------------------------------------
    agent.handleRequest(intentMap);
})

//----------------------------------------
// 監聽3000埠號,
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function () {
    const port = server.address().port;
    console.log("正在監聽埠號:", port);
});