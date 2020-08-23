"use strict";

const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store.js");
const accounts = require("../controllers/accounts.js");


const bmiCalculator= {
  BMICalculation(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    if(assessments.length===0) {
      return (Math.floor (member.weight / (member.height** 2))/100);
    }
    else{
      let bmiNumber = assessments[assessments.length-1].weight / (member.height** 2);
      return bmiNumber.toFixed(2)
    }
  }
}

module.exports = bmiCalculator;