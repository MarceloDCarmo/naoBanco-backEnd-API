module.exports =  {
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities: [
       "dist/src/entities/User.js",
       "dist/src/entities/Account.js",
       "dist/src/entities/Pix.js",
       "dist/src/entities/Transaction.js"
    ],
    migrations: [
       "dist/src/database/migrations/*.js"
    ]
 };