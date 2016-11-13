
module.exports = {

  removeHiddenKeys: (obj, key, array) => {
    array.forEach((item) => {
      console.log(obj[key])
      delete obj[key][item];
    });
    return obj;
  },

  removeTeamOrUser: (obj) => {
    if (obj.User === null) {
      delete obj.User;
    } else if (obj.Team === null) {
      delete obj.Team;
    }
    return obj;
  }

};