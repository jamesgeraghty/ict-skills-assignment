"use strict"; // turns on strict mode, disply errors earlier
// require indentes and imports object defined in other modules
const logger = require("../utils/logger"); //requires the util logger
const assessmentStore = require("../models/assessment-store");
const accounts = require("./accounts.js");
const uuid = require("uuid");
const BMI = require("../utils/bmi-calculator.js");
const bmistatus = require("../utils/bmi-status.js");
const memberStore = require("../models/member-store");
const trainertore = require("../models/trainer-store");
const idealBodyWeight= require("../utils/ideal-bodyweight.js");

// index method used to create a veiw data object and this is sent to the template engine. This then rendering a complete page to the browser
// 

const dashboard = { // dashboard object
  index(request, response) { // index method takes in 2 paramaters request and response 
     const memberId = request.params.id;
    logger.info("dashboard rendering");// logger sends a string to the console
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      // these asspect of the view data object will be displayed int he veiw data page 
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id),
      member: memberStore.getMemberById(loggedInMember.id),
      BMI: BMI.BMICalculation(loggedInMember.id),
      bmistatus:bmistatus.bmistatus(loggedInMember.id),
      idealBodyWeight: idealBodyWeight.isIdealBodyWeight(loggedInMember.id),
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    
//     takes in the 2 parameter; the name of the view and the object(view data). This means that fields can be referenced in the object.
    
    response.render("dashboard", viewData); // sends the view back to browser
  },

  
  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    let current_datetime = new Date() // Set variable to current date and time
    const newAssessment = {
      id: uuid.v1(), 
      memberid: loggedInMember.id,
      entry: new Date().toUTCString(), 
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      trend(){
        const assessments = assessmentStore.getMemberAssessments(loggedInMember.id);
        let trend;
        if(assessments.indexOf(newAssessment)===0){
          if(assessments[assessments.indexOf(newAssessment)].weight<dashboard.weight){
            trend = true;
          }
          else{
            trend = false;
          }
        }
        else if(assessments[assessments.indexOf(newAssessment)].weight<assessments[(assessments.indexOf(newAssessment))-1].weight){
          trend = true;
        }
        else{
          trend = false;
        }
        return trend;
      },
    };
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  
 deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.info(`Deleting assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard; // exports the dashboard object, 
