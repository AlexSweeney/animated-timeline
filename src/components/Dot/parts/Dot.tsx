import React, {useEffect, useState} from 'react';
import { triggerOnTransitionEnd, callAtSameTime } from './../../../utils/utils';
import styles from './../styles/Dot.css';
import { v4 as uuid } from 'uuid';
import { InfoBoxPosition } from './../utils/Dot.consts';

export interface NodeProps {
  addId: (param: string) => void, 
  isAnimating: boolean, 
  animateId: string, 
  nextAnimation: Function,
  infoBoxPosition?: InfoBoxPosition,
}

const Dot = ({ 
  addId, 
  isAnimating, 
  animateId, 
  nextAnimation,
  infoBoxPosition = InfoBoxPosition.Left,
}: NodeProps) => {  
  console.log('styles', styles)
  // ==== ids
  const [idNum] = useState<string>(uuid());
  const [lineId] = useState<string>(`line-${idNum}`);
  const [dotId] = useState<string>(`dot-${idNum}`);
  const [infoBoxId] = useState<string>(`infoBox-${idNum}`);
  // === classes
  const [lineHeightClass, setLineHeightClass] = useState<string>('line--closed');
  const [dotVisibileClass, setDotVisibleClass] = useState<string>('dot--hide');
  const [infoBoxVisibleClass, setInfoBoxVisibleClass] = useState<string>('infoBox--hide');
  const [infoBoxPositionClass] = useState<string>(`infoBox--${infoBoxPosition}`);
  
  // === event handlers
  const onRender = () => { 
    addId(idNum)
  };

  // === master
  const animate = () => {
    callAtSameTime(openLine, showDot) 
      .then(showInfoBox)
      .then(() => nextAnimation())
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

export default Dot;