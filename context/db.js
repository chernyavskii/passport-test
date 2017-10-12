'use strict'
module.exports = (Sequelize, config) =>
{
    const options =
        {
            host: config.db.host,
            dialect: 'mysql',
            logging: false,
            define:
                {
                    timestamps: true,
                    paranoid: true,
                    defaultScope:
                        {
                            where:
                                {
                                    deletedAt: { $eq: null }
                                }
                        }
                }
        };

    var sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);
    const User = require('../models/User')(Sequelize, sequelize);

    return {
        user:       User,
        sequelize:  sequelize
    };
};