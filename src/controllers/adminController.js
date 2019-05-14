var sql = require('mssql');

var adminController = function () {
    var adminUnapprovedEventRemove = function (req, res) {
        var ps = new sql.PreparedStatement();
        var id = req.body.ID;
        ps.input('id', sql.Int);
        ps.prepare('DELETE FROM unapprovedEvents WHERE id=@id', function (err) {
            ps.execute({
                id: req.body.ID
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    res.send('Uspješno obrisan događaj ' + req.body.NAME + ' identifikacije ' + req.body.ID + ' iz baze unapprovedEvents.');
                }
            });
        });
    };
    var adminApprovedEventRemove = function (req, res) {
        var ps = new sql.PreparedStatement();
        var id = req.body.ID;
        ps.input('id', sql.Int);
        ps.prepare('DELETE FROM approvedEvents WHERE id=@id', function (err) {
            ps.execute({
                id: req.body.ID
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    res.send('Uspješno obrisan događaj ' + req.body.NAME + ' identifikacije ' + req.body.ID + ' iz baze approvedEvents..');
                }
            });
        });
    };
    var adminApproveEvent = function (req, res) {
        var request = new sql.Request();
        var statement = "INSERT INTO approvedEvents (NAME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,EVENTDATE,EVENTTIME,IMGURL,DESCRIPTION) VALUES('" + req.body[0] + "', '" + req.body[1] + "', '" + req.body[2] + "', '" + req.body[3] + "', '" + req.body[4] + "','" + req.body[5] + "', '" + req.body[6] + "','" + req.body[7] + "','" + req.body[8] + "')";
        request.query(statement, function (err, recordset) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.send('Uspješno odobren događaj!');
            }
        });
    };
    var getAdmin = function (req, res) {
        res.render('adminLogin');
    };

    return {
        adminUnapprovedEventRemove: adminUnapprovedEventRemove,
        adminApprovedEventRemove: adminApprovedEventRemove,
        adminApproveEvent: adminApproveEvent,
        getAdmin: getAdmin
    };
};

module.exports = adminController;