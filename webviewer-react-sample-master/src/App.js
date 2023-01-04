import React from 'react';
import { BrowserRouter,Routes,Route}  from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import SampleDocMain from "./SampleDocMain";
import SampleDoc1 from"./SampleDoc1";
import SampleDoc2 from"./SampleDoc2";
import SampleDoc3 from"./SampleDoc3";


const App = () => {
  return (
    
    <BrowserRouter>
    
   
    
    <Routes>
    <Route path="/"  element ={<Layout/>} /> 
          <Route path="SampleDoc1"  element ={<SampleDoc1 />} /> 
          <Route path="SampleDoc2" element={<SampleDoc2/>}/>
          <Route path="SampleDoc3" element={<SampleDoc3/>} />
      
       
      
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
