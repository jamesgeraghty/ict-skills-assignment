'use strict';


const memberstore = require('../models/member-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const memberId = request.params.id;
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('assessment', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
  
  settings(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const memberId = request.params.id;
    const viewData = {
      
      member: memberstore.getMemberById(loggedInMember.id)

    };
    response.render("settings", viewData);
  },
       
  updateMember(request, response) {
    const memberId = request.params.memberid;
    const loggedInMember = memberstore.getMemberById(memberId);
    const newMember = {
      id: uuid.v1(), 

      name: request.body.name,
      gender: request.body.gender,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
     };
    
    logger.debug("Updating existing member", loggedInMember);

    memberstore.updateMember(loggedInMember, newMember);

    response.redirect("/dashboard/");
  
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    memberstore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

 authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    const password = request.body.password;
    if (member && member.password === password) {
      response.cookie("member", member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect("/dashboard");
    } 
     else if(trainer && trainer.password === password) {
      const trainerId = request.params.id;
      response.cookie("trainer", trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect("/trainerdashboard");
    }
    else {
      response.redirect("/login");
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberstore.getMemberByEmail(memberEmail);
  },
   
    getCurrentTrainer(request) {
    const trainerEmail = request.cookies.trainer;
    return trainerstore.getTrainerByEmail(trainerEmail);
  },

};

module.exports = accounts;