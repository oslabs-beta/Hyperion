const { Pool } = require('pg');

const tlsModule = {};

/**
 * Returns true for PostgreSQL connections that use TLSv1.2 or TLSv1.3. 
 * Returns false for PostgreSQL connections that don't use TLSv1.2 or TLSv1.3. 
 * Requires a node-postgres Pool object as input
 * @param {object} pool node-postgres Pool object
 * @return {boolean} true or false
 */
tlsModule.isTlsEnabled = (pool) => {
  // select the SSL/TLS status for the specific pid corresponding to the request
  const q = 'select * from pg_stat_ssl where pid = pg_backend_pid()';

  return pool.query(q)
    .then(r => {
      if (!r.rows[0].ssl) return false;
      if (r.rows[0].version !== 'TLSv1.2' && r.rows[0].version !== 'TLSv1.3') return false;
      return true;
    })
    .catch(e => { throw e; });
};

module.exports = tlsModule;
