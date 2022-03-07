const tlsModule = {};

/**
 * Blocks PostgreSQL connections that don't use TLSv1.2 or TLSv1.3. 
 * Uses pool in res.locals.dbInfo.pool
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
tlsModule.verifyTLS = (req, res, next) => {
  const q = 'select * from pg_stat_ssl where pid = pg_backend_pid()';

  const errObject = {
    log: 'Error establishing TLS connection with server',
    status: 400,
    message: { err: 'Error establishing TLS connection with server' },
  };

  res.locals.dbInfo.pool.query(q)
    .then(r => {
      if (!r.rows[0].ssl) return next(errObject);
      if (r.rows[0].version !== 'TLSv1.2' && r.rows[0].version !== 'TLSv1.3') return next(errObject);
      return next();
    })
    .catch(e => next(e));
};

module.exports = tlsModule;
