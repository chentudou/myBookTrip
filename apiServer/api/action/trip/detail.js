var previewDao = require(_rootname + '/api/dao/trip.js');

module.exports = function (req, res) {

    let reqArgu = req.query;
    //console.log(' req.session.member', req.session.member)
    //console.log('explain>>>>',previewDao);
    //console.log('reqArgu',reqArgu);
    previewDao.detail(reqArgu).then(function (data) {
           // console.log('getDateList>>>>',reqArgu,data);
        if (data.rescode) {
            res.json(data);
        }
    });
};