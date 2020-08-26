'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {

  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members',

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessment = member.assessment;
    _.remove(assessment, { id: assessmentId });
    this.store.save();
  },
  
  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },
  
   getMemberByAssessmentId(id){
    return this.store.findOneBy(this.collection, {id: id});
  },
  
  
  
    updateMember(member,updatedMember){
      member.name=updatedMember.name;
      member.gender=updatedMember.gender;
      member.email=updatedMember.email;
      member.password=updatedMember.password;
      member.address=updatedMember.address;
    
    this.store.save();
  },
};

module.exports = memberStore;