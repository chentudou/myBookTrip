var previewDao = require(_rootname + '/api/dao/trip.js');

module.exports = function (req, res) {

    let reqArgu = req.body;
    //console.log(' req.session.member', req.session.member)
    //console.log('explain>>>>',reqArgu);
    previewDao.preview(reqArgu).then(function (data) {
            console.log('getDateList>>>>',reqArgu,data);
        if (data.rescode) {
            res.json(data);
        }
    });
};