import React, { useState, useEffect } from "react";
import { Router, Link } from "wouter";
import Header from "./components/Header";
import Container from '@mui/material/Container';

/**
 * This code defines the react app
 *
 * Imports the router functionality to provide page navigation
 * Defines the Home function outlining the content on each page
 * Content specific to each page (Home and About) is defined in their components in /pages
 * Each page content is presented inside the overall structure defined here
 * The router attaches the page components to their paths
 */

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";

// The component that adds our Meta tags to the page
import Seo from "./components/seo.jsx";

// Home function that is reflected across the site
export default function Home() {
  return (
    <Router>
      <Seo />
      <Container maxWidth="false">
        <Header />
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
        
        {/* Footer links to Home and About, Link elements matched in router.jsx */}
      <footer className="footer">
        
          <div>
            Brought to you by the creator of{" "}
            <a
              href="https://drip-mw-dashboard.com"
              className="white-link"
              target="_blank"
              rel="noreferer"
            >
              Drip Multi-Wallet Dashboard
            </a>
          </div>
        <div><a className="white-link" href="https://app.arkfi.io/swap?ref=0x1ff661243cb97384102a69a466c887b4cc12d72a" target="_blank" rel="noreferrer">Referral Link</a> and Donations: 0x1ff661243cb97384102a69a466c887b4cC12d72a</div>
        
        
      </footer>
      </Container>
      
    </Router>
  );
}
