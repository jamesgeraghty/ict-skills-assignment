"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
    assessmentCollection: [],
  }),
  collection: "assessmentCollection",

  getAllAssessments(id) {
    return this.store.findAll(this.collection, { id: id });
  },
  
  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },
  
   addComment(id, comment) {
    const assessment = this.getAssessment(id);
    assessment.comment = comment;
    this.store.update(this.collection, id, assessment);
    //assessment.feedback = comment;
    //this.store.add(this.collection, assessment);
    this.store.save();
  },
  
  getMemberAssessments(memberid) {
    return this.store.findBy(this.collection, { memberid: memberid });
  },

  removeAssessment(memberid) {
    const assessment = this.getAssessment(memberid);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
    memberAssessmentSize(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.size(assessments, { id: assessmentId });
  
  },
   removeAllAssessmentsByMember(memberid) {
    const assessments = this.store.findBy(this.collection, { memberid: memberid });
    this.store.remove(this.collection, assessments);
    this.store.save();
  }
};

module.exports = assessmentStore;
