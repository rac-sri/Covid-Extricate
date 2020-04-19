const link = require("../resources/links");
const jwtToken = require('../database/jwtToken')
console.log(link);
module.exports = {
  Query: {
    idVerify(_ , {input} , __){
      return jwtToken(input);
    },
    rapidapi(_, { input }, __) {
      return {};
    },
  },
  rapidapi: {
    world() {
      return link("world");
    },
    country() {
      return link("countryWise");
    },
    history() {
      return link.history;
    },
    historyCountry(_, { input }, __) {
      return link("historyCountry", input);
    },
    IndiaDateWise() {
      return link.historyCountry;
    },
    IndiaTimeline() {
      return link("indiaTimeline");
    },
  },
  // Mutation: {
  //   idVerify(_, { input }, { models, user }) {
  //     const pet = models.Pet.create({ ...input, user: user.id });
  //     return pet;
  //   },
  // },
};
