const express = require('express');

express.response.error = function(error) {
    if (!error.code) {
        error = {
            message: error.toString(),
            code: 'server_error',
            status: 500
        };
    }

    this.status(error.status).send(error);
};

module.exports = {
    emptyData: {
        message: 'Data is empty',
        code: 'empty_data',
        status: 401
    },
    undefinedData: {
        message: 'Data is undefined',
        code: 'undefined_data',
        status: 402
    }
};