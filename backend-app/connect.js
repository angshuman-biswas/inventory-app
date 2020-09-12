const mysql = require('mysql');

module.exports = mysql.createConnection(
    {
        host: "ls-42153a5c1f6783bce81e8debd15084cafa6decb8.cuwc2ack5wec.ap-south-1.rds.amazonaws.com",
        user: "angshumanbiswas",
        password: "angshumanbiswas",
        database: "angshumanbiswas"
    }
);