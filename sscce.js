'use strict';

/*
 * Copy this file to ./sscce.js
 * Add code from issue
 * npm run sscce-{dialect}
 */

const Sequelize = require('./index');
const sequelize = new Sequelize({
    host: '127.0.0.1',
    database: 'sequelize_test',
    username: 'sequelize_test',
    password: 'sequelize_test',
    dialect: 'mysql',
    port: '8999',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

const Foo = sequelize.define('foo', {
    username: Sequelize.STRING
});

sequelize.sync().then(function() {

    Foo.create({
      username: 'foo'
    }).then(function(foo) {
        foo.username = null; // undefined -> undefined

        foo.save().then(function() {
            sequelize.close();
        });
    })

});
