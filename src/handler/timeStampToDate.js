
export default {
    line(time,n){
        var dd = new Date(time);
        n ? dd.setDate(dd.getDate() + n) : dd.setDate(dd.getDate()); //获取n天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1; //获取当前月份的日期
        var d = dd.getDate();
        //如果月份长度少于2，则前加 0 补位
        if (m.toString().length == 1) {
            m = 0 + "" + m.toString();
        } else {
            m = m.toString();
        }
        //如果天数长度少于2，则前加 0 补位
        if (d.toString().length == 1) {
            d = 0 + "" + d.toString();
        } else {
            d = d.toString();
        }
    
        return  m + "-" + d;
    },
    character(time,n){
        var dd = new Date(time);
        n ? dd.setDate(dd.getDate() + n) : dd.setDate(dd.getDate()); //获取n天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1; //获取当前月份的日期
        var d = dd.getDate();
        //如果月份长度少于2，则前加 0 补位
        if (m.toString().length == 1) {
            m = 0 + "" + m.toString();
        } else {
            m = m.toString();
        }
        //如果天数长度少于2，则前加 0 补位
        if (d.toString().length == 1) {
            d = 0 + "" + d.toString();
        } else {
            d = d.toString();
        }
    
        return  m + "月" + d+ "日";
    }
}