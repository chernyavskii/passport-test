module.exports = (Sequelize, sequelize) => {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        firstName:      Sequelize.STRING,
        lastName:       Sequelize.STRING,
        image:          Sequelize.BLOB,
        pdf:            Sequelize.BLOB
    });
};

