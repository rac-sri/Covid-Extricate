const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type rapidapi {
    world: World
    country: [Country]
    history: String
    historyCountry(input: String): [HistoryCountry]
    IndiaDateWise: String
    IndiaTimeline: [Indiatimeline]
  }

  type HistoryCountry {
    country_name: String
    total_cases: String
    new_cases: String
    active_cases: String
    total_deaths: String
    new_deaths: String
    total_recovered: String
    total_cases_per1m: String
    record_date: String
  }
  type Country {
    country_name: String
    cases: String
    deaths: String
    total_recovered: String
    new_deaths: String
    new_cases: String
    serious_critical: String
    active_cases: String
    total_cases_per_1m_population: String
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
    rapidapi(input: String): rapidapi
  }
  # type Mutation {
  #   addPet(input: NewPetInput!): Pet!
  # }
`;

module.exports = typeDefs;
