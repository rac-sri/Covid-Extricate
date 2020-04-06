const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type rapidapi {
    world: World
    country: String
    history: String
    historyCountry: String
    IndiaDateWise: String
    IndiaTimeline: [Indiatimeline]
  }

  type World {
    total_cases: String
    total_deaths: String
    total_recovered: String
    new_cases: String
    new_deaths: String
    statistic_taken_at: String
  }
  type Indiatimeline {
    dailyconfirmed: Int
    dailydeceased: Int
    dailyrecovered: Int
    date: String
    totalconfirmed: Int
    totaldeceased: Int
    totalrecovered: Int
  }

  type Query {
    rapidapi(input: String!): rapidapi
  }
  # type Mutation {
  #   addPet(input: NewPetInput!): Pet!
  # }
`;

module.exports = typeDefs;
