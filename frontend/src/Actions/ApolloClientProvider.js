import ApolloClient from "apollo-boost";

class ApolloClientProvider {
  constructor() {
    this.client = new ApolloClient({
      uri: "http://localhost:5000/graphql",
    });
  }
}
export default new ApolloClientProvider();

// export default client = new ApolloClient({
//   uri: "http://localhost:3001/graphql",
// });
