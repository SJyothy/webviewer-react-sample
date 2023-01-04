import React from "react";
import {Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
     <h1> Documents</h1>
      <nav>
        <ul>
            <Link to="/SampleDoc1" state='https://arxiv.org/pdf/2212.08011.pdf'><li>SampleDocument1.pdf</li></Link>
            <Link to="/SampleDoc2" state='https://arxiv.org/pdf/2212.07937.pdf'><li>SampleDocument2.pdf</li></Link>
            <Link to="/SampleDoc3" state='https://arxiv.org/pdf/2212.07931.pdf'><li>SampleDocument3.pdf</li></Link>
          
          
        </ul>
      </nav>

      
    </>
  )
};

export default Layout;