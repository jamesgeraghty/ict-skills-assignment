"use strict";

const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store.js");
const accounts = require("../controllers/accounts.js");
const bmistatus = require("./bmi-status.js");



const idealBodyWeight = {
  isIdealBodyWeight(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    
    let inches = (member.height * 39.77); //converting height parameter from metric to imperial
    const fiveFeet = 60;   //5ft = 60inches
    
    const assessment = assessments[(assessments.length)-1];
    let isIdealBodyWeight;
    if (inches <= fiveFeet) {
      if (member.gender === "Male") {
        idealBodyWeight === 50;
      } else if (member.gender === "Female" || member.gender === "Unspecified"){
        idealBodyWeight === 45.5;
      }
    } else {  
      if (member.gender === "Male") {
        idealBodyWeight === 50 + ((inches - fiveFeet) * 2.3);
      } else if (member.gender === "Female" || member.gender === "Unspecified") {
        idealBodyWeight === 45.5 + ((inches - fiveFeet) * 2.3);
      }
    }
    //logger.info(`Ideal Weight ${idealBodyWeight}`);
    return ((idealBodyWeight <= (member.weight + 2.3))
        && (idealBodyWeight >= (member.weight - 2.3))
    );
  }
}

module.exports = idealBodyWeight;