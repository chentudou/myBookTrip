const ralP = require('../ral')

/* 路书 poi 详情 */
module.exports.detail=postData=>{
    return ralP("QUERY",{
        path:"/poi/getPoiById",
        data:{
            poiId:postData.poiId
        }
    })
}
/* 行程   日记 */
module.exports.diray=postData=>{
    return ralP("QUERY",{
        path:"/travelPhone/getTraveDayRemark",
        data:{
            dayId:postData.dayId
        }
    })
}
/* 路书封面数据 */
module.exports.tripCover=postData=>{
    return ralP("QUERY",{
        path:"/travelPhone/getTraveById",
        data:{
            travelId:postData.travelId
        }
    })
}
/*  行程-- 路书预览 */
module.exports.preview=postData=>{
    console.log('tripBook',postData)
    return ralP("BODY",{
        path:"/pdf/bookTravel",
        data:{
            travelId:postData.travelId
        }
    })
}
