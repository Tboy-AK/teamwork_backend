/** postgres node library */
const pg = require('pg');

/** connection url techniques: 1. string for client, 2. object for pool  */
const conString = 'postgres://vrhyuums:BU1Wltcl4mhJU1Qa0pmtyyJG6I5QvCcC@salt.db.elephantsql.com:5432/vrhyuums';
const conObj = {
  user: 'vrhyuums',
  host: 'salt.db.elephantsql.com',
  database: 'vrhyuums',
  password: 'BU1Wltcl4mhJU1Qa0pmtyyJG6I5QvCcC',
  port: 5432,
};

/** connection to database, using either client or pool, but pool for this project */
//  const client = new pg.Client(conString);
const pool = new pg.Pool(conObj);

pool.query('SELECT NOW() AS "theTime"', (err, result) => {
  if (err) {
    return console.error('error running query', err);
  }
  console.log(result.rows[0].theTime);
  // >> output: 2018-08-23T14:02:57.117Z
  pool.end();
});
