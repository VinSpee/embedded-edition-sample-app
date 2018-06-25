import fetch from "node-fetch";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const gqlEndpoint = 'https://54srzzin5j.execute-api.eu-west-1.amazonaws.com/staging/graphql';
const masterToken = process.env.MASTER_TOKEN;

const authLink = setContext((_, {headers}, token) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: masterToken,
            //token ? `Bearer ${token}` : "",
        }
    };
});

const generateClient = token => {
    console.log('ree', token)
    return new ApolloClient({
        link: authLink.concat(new HttpLink({uri: gqlEndpoint, fetch}), token),
        cache: new InMemoryCache()
    });
};

module.exports = {
    generateClient,
    masterClient: generateClient(masterToken),
};
