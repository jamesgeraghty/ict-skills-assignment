"use strict";

const logger = require("../utils/logger");

const about = {
  // 2 parameters request and response
  index(request, response) {
    // sending the information to the glitch console 
    logger.info("about rendering");
    // view data object contain one field 
    const viewData = {
      title: "Fitness tracker",
    };
    // render send the data out to the browser
    response.render("about", viewData);
  },
};

module.exports = about;

