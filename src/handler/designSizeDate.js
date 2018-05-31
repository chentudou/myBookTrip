
import stampToDate from './timeStampToDate';
let weekArr=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
export default{

/* 计算日期长度（时间戳） */
designSizeDateWeek(initDate,l){
    /* 日期转时间戳（1，避免跨月计算，2，可加减） */
    var timeStamp = new Date(initDate).getTime();
    var days = Number(l); /* 生成几天的日期数组（最小大于2） */
    var timeArr = [`${stampToDate.character(initDate)} ${weekArr[new Date(initDate).getDay()]}`];
    for (var i = 0; i < days - 1 ; i++) { //最终结果是以initDate为首,所以减少一天的插入
        timeStamp += (1000 * 60 * 60 * 24);
        timeArr.push(`${stampToDate.character(timeStamp)} ${weekArr[new Date(timeStamp).getDay()]}`);
    }
    return timeArr;
},
designSizeDate(initDate,l){
   /* 日期转时间戳（1，避免跨月计算，2，可加减） */
   let timeStamp = new Date(initDate).getTime();
   let days = Number(l); /* 生成几天的日期数组（最小大于2） */
   var timeArr = [stampToDate.line(timeStamp)];
   for (var i = 0; i < days - 1; i++) { //最终结果是以initDate为首,所以减少一天的插入
       timeStamp += (1000 * 60 * 60 * 24);
       timeArr.push(stampToDate.line(timeStamp));
   }
   return timeArr;
}


}

