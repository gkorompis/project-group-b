const allRoles = {
  user: ['manageMarkets', 'manageStores', 'getMarkets', 'getStores', 'manageUsers', 'getUsers'],
  admin: ['getUsers', 'manageUsers', 'getMarkets', 'manageMarkets', 'getStores', 'manageStores'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = { roles, roleRights,};