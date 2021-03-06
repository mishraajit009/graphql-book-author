import React from 'react'

import AddBook from './components/AddBook'
import BookList from './components/BookList.js'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';


//Apollio Client Setup
const client=new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache()
})

function App() {


  return (
    <ApolloProvider client={client}>
      <div id="main">
          <h1>Ninja Reaading List</h1>
          <BookList/>
          <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
