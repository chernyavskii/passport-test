'use strict'
var pdf = require('pdfkit');
var fs = require('fs');
var myDoc = new pdf;

module.exports = (userRepository,errors) => {
    return {
        getProfile: getProfile,
        newProfile: newProfile
    };
    function newProfile(firstName,lastName,image) {
        return new Promise((resolve, reject) => {
            if (firstName == null || firstName == ""||
                lastName == null || lastName == "" ||
                lastName == null || lastName == "") {
                reject(errors.emptyData);
                return;
            }
            else {
                fs.readFile(image, function (err, data) {
                    if (err) throw err;
                    var encImage = new Buffer(data, 'binary').toString('base64');
                    let newProfile = {
                        firstName: firstName,
                        lastName: lastName,
                        image: encImage
                    };
                    userRepository.create(newProfile)
                        .then((newUser) => {
                            resolve(newUser);
                        })
                        .catch(reject);
                })
            }
        });
    };
    function getProfile(name) {
        return new Promise((resolve, reject) => {
            if (name == null || name == "") {
                reject(errors.emptyData);
                return;
            }
            else {
                userRepository.findOne({where: {firstName: name}})
                    .then((user) => {

                        var q = myDoc.image(new Buffer(user.dataValues.image.toString().replace('data:image/png;base64,', ''), 'base64'), 100, 300, {
                            height: 200,
                            width: 200
                        });
                        myDoc.font('Times-Roman')
                            .fontSize(24)
                            .text(user.dataValues.firstName, 320, 350)
                            .text(user.dataValues.lastName, 320, 375);
                        myDoc.end();

                        userRepository.update({pdf: myDoc._readableState.buffer.toString()}, {
                            where: {firstName: name},
                            limit: 1
                        }).then((result) => {
                            resolve({Success: true})
                        }).catch(reject);
                    })
                    .catch((err) => {
                        resolve({Success:false});
                    });
            }
        });
    }
}