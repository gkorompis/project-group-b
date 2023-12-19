const allRoles = {
  user: ['manageMarkets', 'manageStores','manageProducts', 'getMarkets', 'getStores', 'manageUsers', 'getUsers', 'manageTransactions', 'getProducts', 'getTransactions'],
  admin: ['getUsers', 'manageUsers', 'getMarkets', 'manageMarkets', 'getStores', 'manageStores', 'getProducts',
    'manageProducts',
    'manageTransactions',
    'getTransactions',
    'createTransactions',],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = { roles, roleRights,};
