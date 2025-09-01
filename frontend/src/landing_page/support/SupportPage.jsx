import React from "react";

import Hero from "./Hero";
import CreateTicket from "./CreateTicket";
import NavBar from "../NavBar";
import Footer from "../Footer";

// import Navbar from "../Navbar";
// import Footer from "../Footer";

function SupportPage() {
  return (
    <>
    <NavBar/>
      <Hero />
      {/* <CreateTicket /> */}
      <Footer />
    </>
  );
}

export default SupportPage;