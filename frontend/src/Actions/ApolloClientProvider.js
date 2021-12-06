import { ApolloClient, InMemoryCache } from "@apollo/client";

// const defaultOptions = new DefaultOptions({
//   watchQuery: {
//     fetchPolicy: "no-cache",
//     errorPolicy: "ignore",
//   },
//   query: {
//     fetchPolicy: "no-cache",
//     errorPolicy: "all",
//   },
// });

class ApolloClientProvider {
  constructor() {
    this.client = new ApolloClient({
      uri: "http://localhost:5000/graphql",
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        },
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        },
      },
    });
  }
}
export default new ApolloClientProvider();

// export default client = new ApolloClient({
//   uri: "http://localhost:3001/graphql",
// });
