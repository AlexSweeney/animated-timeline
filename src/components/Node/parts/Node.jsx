import React, {useEffect, useState} from 'react';
import { triggerOnTransitionEnd } from '../../../utils/utils';
import './../styles/Node.css';
import { v4 as uuid } from 'uuid';

const Node = ({ setIds, isAnimating, animateId, iterateAnimation }) => {  
  // ==== ids
  const [idNum] = useState(uuid());
  const [lineId] = useState(`line-${idNum}`);
  const [dotId] = useState(`dot-${idNum}`);
  const [infoBoxId] = useState(`infoBox-${idNum}`);
  // === classes
  const [lineHeightClass, setLineHeightClass] = useState('line--closed');
  const [dotVisibileClass, setDotVisibleClass] = useState('dot--hide');
  const [infoBoxVisibleClass, setInfoBoxVisibleClass] = useState('infoBox--hide');
  
  // === event handlers
  const onRender = () => { 
    setIds(ids => [...ids, idNum])
  };

  // === utils
  const animate = () => {
    openLine()
      .then(() => {
        const promOne = showDot();
        const promTwo = showInfoBox();

        Promise.all([promOne, promTwo]).then(() => {
          iterateAnimation()
        });
      })
  }

  const openLine = () => {
    return new Promise(resolve => {
      triggerOnTransitionEnd(lineId, 'height', () => { 
        resolve(null)
      }) 
      setLineHeightClass('line--open')
    }) 
  }

  const showDot = () => { 
    return new Promise(resolve => { 
      triggerOnTransitionEnd(dotId, 'height', () => {
        resolve(null)
      })  
      setDotVisibleClass('dot--show')
    }) 
  }

  const showInfoBox = () => {
    return new Promise(resolve => {
      triggerOnTransitionEnd(infoBoxId, 'opacity', () => {
        resolve(null)
      })  
      setInfoBoxVisibleClass('infoBox--show')
    }) 
  }

  // === listen / trigger
  useEffect(() => {
    onRender()
  }, [])

  useEffect(() => { 
    if(isAnimating && animateId === idNum) animate()
  }, [animateId, isAnimating])

  // === output
  return (
    <div className='node'> 
      <div className='timeline'>
        <div id={lineId} className={`line ${lineHeightClass}`}/>
        <div id={dotId} className={`dot ${dotVisibileClass}`}/>   
      </div>
      <div id={infoBoxId} className={`infoBox ${infoBoxVisibleClass}`}>
        <h3>Year 2020</h3>
        <p>Hello world</p>
      </div>
   </div>
  )
}

export default Node;