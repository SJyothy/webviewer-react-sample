import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WebViewer from '@pdftron/webviewer';
import './App.css';


const SampleDocMain = (props) => {
    const viewer = useRef(null);
    const location =useLocation();
    const url =location.state;
    
    console.log(url);
    //const data ='https://arxiv.org/pdf/2212.08011.pdf'
    

    // if using a class, equivalent of componentDidMount 
    useEffect(() => {
       /* if ( y === "doc1") {
            // console.log(y);
                data ='https://arxiv.org/pdf/2212.08011.pdf';}
         else if (y==='doc2') {
          data =' https://arxiv.org/pdf/2212.07937.pdf';}
         else if( y==='doc3') {
              data ='https://arxiv.org/pdf/2212.08011.pdf';}*/
      WebViewer(
        {
          path: '/webviewer/lib',
          initialDoc: url,
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
    }, [1]);
    return (
        <div>
        <div>
            <div className='labels'>
                <h3>Labels</h3>
                <button className='title'> Title</button>
                <button className='Author' > Author</button>
            </div>     
            <div className='Boxes'>
                <h3>Boxes</h3>
            </div>
       </div>
       <div>
          <div className="webviewer" ref={viewer}  width="300" height="200"></div>
        </div>
        </div>
      );
    }
export default SampleDocMain;