import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


import Header from "./components/Header";
import Footer from "./components/Footer";
//import Nav from './components/Nav';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Buy from './pages/Buy';
import Dashboard from "./pages/Dashboard";
//import Sell from './pages/Sell';
//import Trade from './pages/Trade';


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="">
          <Header />

          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/buy" element={<Buy />} />
              {/* <Route path="/trade" element={<Trade />} /> */}
              {/* <Route path="/sell" element={<Sell />} /> */}
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
