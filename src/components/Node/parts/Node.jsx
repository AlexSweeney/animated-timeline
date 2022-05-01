import React, {useEffect, useState} from 'react';
import { triggerOnTransitionEnd, callAtSameTime } from '../../../utils/utils';
import './../styles/Node.scss';
import { v4 as uuid } from 'uuid';

const Node = ({ 
  setIds, 
  isAnimating, 
  animateId, 
  iterateAnimation,
  infoBoxPosition = 'left',
}) => {  
  // ==== ids
  const [idNum] = useState(uuid());
  const [lineId] = useState(`line-${idNum}`);
  const [dotId] = useState(`dot-${idNum}`);
  const [infoBoxId] = useState(`infoBox-${idNum}`);
  // === classes
  const [lineHeightClass, setLineHeightClass] = useState('line--closed');
  const [dotVisibileClass, setDotVisibleClass] = useState('dot--hide');
  const [infoBoxVisibleClass, setInfoBoxVisibleClass] = useState('infoBox--hide');
  const [infoBoxPositionClass] = useState(`infoBox--${infoBoxPosition}`);
  
  // === event handlers
  const onRender = () => { 
    setIds(ids => [...ids, idNum])
  };

  // === master
  const animate = () => {
    callAtSameTime(openLine, showDot) 
      .then(showInfoBox)
      .then(iterateAnimation)
  }

  // === utils 
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
      <div id={infoBoxId} className={`infoBox ${infoBoxVisibleClass} ${infoBoxPositionClass}`}>
        <h3>Year 2020</h3>
        <p>Hello world</p>
      </div>
   </div>
  )
}

export default Node;