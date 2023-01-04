import React, { useRef, useEffect } from 'react';
import { BrowserRouter,Routes,Route}  from 'react-router-dom';
import WebViewer from '@pdftron/webviewer';
import './App.css';
import Layout from './Layout';
import SampleDoc1 from"./SampleDoc1";
import SampleDoc2 from"./SampleDoc2";
import SampleDoc3 from"./SampleDoc3";


const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'https://arxiv.org/pdf/2212.08011.pdf',
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
           
      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          onClick: async () => {
            // save the annotations
            console.log(await annotationManager.exportAnnotations({links:false,widgets:false}));
          }
        });
      });

       annotationManager.on('annotationChanged',async()=>{
        console.log(await annotationManager.exportAnnotations({links:false,widgets:false}));
       })

      documentViewer.addEventListener('documentLoaded', () => {
        annotationManager.setCurrentUser('Jyothi');
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);

  const SampleDoc1 = ()=>{
    return(
    <div>
       <div className="webviewer" ref={viewer}></div>
    </div>
    )
}

  return (
    <div className="App">
      <div className="header">React sample</div>
     <BrowserRouter>
       
    <Routes>
    <Route path="/"  element ={<Layout/>} /> 
          <Route path="SampleDoc1"  element ={<SampleDoc1/>} /> 
          <Route path="SampleDoc2" element={<SampleDoc2/>}/>
          <Route path="SampleDoc3" element={<SampleDoc3/>} />
      
       
      
    </Routes>
  </BrowserRouter>
     
    </div>
  );
};

export default App;
