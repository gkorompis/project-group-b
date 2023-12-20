const allRoles = {
  user: ['manageStores', 'getMarkets', 'getStores', 'manageUsers', 'manageProducts' ],
  admin: ['getUsers', 'manageUsers', 'getMarkets', 'manageMarkets', 'getStores', 'manageStores', 'manageProducts',
  'manageTransactions',
  'getTransactions',
  'createTransactions',],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = { roles, roleRights,};