var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql("CREATE TABLE IF NOT EXISTS `badge` ("
            + "id               BIGINT AUTO_INCREMENT PRIMARY KEY,"
            + "name             VARCHAR(128) UNIQUE NOT NULL,"
            + "status           ENUM('template', 'draft', 'published', 'archived') NOT NULL"
            + ") ENGINE=InnoDB;", callback);
};

exports.down = function(db, callback) {
  db.runSql("DROP TABLE IF EXISTS `badge`;", callback);
};
