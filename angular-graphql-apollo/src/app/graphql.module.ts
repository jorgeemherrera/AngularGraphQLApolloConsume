import {NgModule} from '@angular/core';
import { APOLLO_OPTIONS} from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpLink as myHttpLink } from 'apollo-link-http';


const LINK:myHttpLink = new myHttpLink({
  uri: 'http://localhost:3000/graphql',
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET",
  },
  useGETForQueries: true
});

export function createApollo(httpLink: myHttpLink) {
  return {
    link: LINK,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
      //deps: [myHttpLink],
    },
  ],
})
export class GraphQLModule {}
