
var createSession = function(req, res, userID) {
  return req.session.regenerate(function() {
      req.session.userID = userID;
      console.log("sess",req.session.userID);
      res.redirect('/');
    });
};

module.exports = createSession;
