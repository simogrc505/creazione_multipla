const { compose, prop, equals, converge, or, ifElse } = require('ramda');

const is_admin = compose(converge(or, [equals('ROLE_TEAM_ADMIN'), equals('ROLE_ADMIN')]), prop('role'));

const if_admin_or_super =  (req) => {
  if (req.user.role === 'ROLE_ADMIN' || req.user.role === 'ROLE_SUPERADMIN') {
    return true
  }
  return false
}

const if_admin = (req, res, next) => ifElse(
  if_admin_or_super, // SE È ROLE ADMIN OR SUPERADMIN
  () => next(),
  () => res.status(403).json({message: 'Forbidden'}))(req) // REJECT 403 FORBIDDEN

module.exports = {
  is_admin,
  if_admin
}
