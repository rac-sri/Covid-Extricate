const link = require("../resources/links");
console.log(link);
module.exports = {
  Query: {
    rapidapi(_, { input }, __) {
      return {};
    },
  },
  rapidapi: {
    world() {
      return link("world");
    },
    country() {
      return link.country;
    },
    history() {
      return link.history;
    },
    historyCountry() {
      return link.historyCountry;
    },
    IndiaDateWise() {
      return link.historyCountry;
    },
    IndiaTimeline() {
      return link("indiaTimeline");
    },
  },
  // Mutation: {
  //   addPet(_, { input }, { models, user }) {
  //     const pet = models.Pet.create({ ...input, user: user.id });
  //     return pet;
  //   },
  // },
  // Pet: {
  //   owner(pet, _, { models }) {
  //     return models.User.findOne({ id: pet.user });
  //   },
  //   img(pet) {
  //     return pet.type === "DOG"
  //       ? "https://placedog.net/300/300"
  //       : "http://placekitten.com/300/300";
  //   },
  // },
};
