import React, { Component } from 'react';
// import NewComponent from './NewComponent';
var UserPage = (function() {
  var full_name = "";
  var logged_in = false;
  var getName = function() {
    return full_name;
  };

  var setName = function(name) {
    full_name = name;
  };
  var setLog = function(){
    logged_in = true;
  }
  var getLog = function(){
    return logged_in;
  }
  return {
    getName: getName,
    setName: setName,
    setLog: setLog,
    getLog: getLog
  }

})();

export default UserPage;
