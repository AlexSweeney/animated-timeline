import React, {ReactNode, useEffect, useState} from 'react';
import { triggerOnTransitionEnd } from '../../../utils/utils';
import '../styles/TimelineSection.scss';
import { v4 as uuid } from 'uuid';
import { InfoBoxPosition } from '../utils/TimelineSection.consts';


export interface TimelineSectionProps {
  addId: (param: string) => void, 
  isAnimating: boolean, 
  animateId: string, 
  nextAnimation: Function,
  infoBoxPosition?: InfoBoxPosition,
  children?: ReactNode,
}

const TimelineSection = ({ 
  addId, 
  isAnimating, 
  animateId, 
  nextAnimation,
  infoBoxPosition = InfoBoxPosition.Left,
  children,
}: TimelineSectionProps) => {   
  // ==== ids
  const [idNum] = useState<string>(uuid());
  const [lineId] = useState<string>(`timeline-section__line-${idNum}`);
  const [dotId] = useState<string>(`timeline-section__dot-${idNum}`);
  const [infoBoxId] = useState<string>(`timeline-section__info-box-${idNum}`);
  // === classes
  const [lineHeightClass, setLineHeightClass] = useState<string>('timeline-section__line--closed');
  const [dotVisibileClass, setDotVisibleClass] = useState<string>('timeline-section__dot--hide');
  const [infoBoxVisibleClass, setInfoBoxVisibleClass] = useState<string>('timeline-section__info-box--hide');
  const [infoBoxPositionClass] = useState<string>(`timeline-section__info-box--${infoBoxPosition}`);
  
  // === event handlers
  const onRender = () => { 
    addId(idNum)
  };

  // === master
  const animate = () => {  
    openLineHalf()
    .then(showDot)
    .then(showInfoBox)
    .then(openLineFull)
    .then(() => nextAnimation())
  }

  // === utils 
  const openLineHalf = () => {
    return new Promise(resolve => {
      triggerOnTransitionEnd(lineId, 'height', () => { 
        resolve(null)
      }) 
      setLineHeightClass('timeline-section__line--open-half')
    }) 
  }

  const openLineFull = () => {
    return new Promise(resolve => {
      triggerOnTransitionEnd(lineId, 'height', () => { 
        resolve(null)
      }) 
      setLineHeightClass('timeline-section__line--open-full')
    }) 
  }

  const showDot = () => { 
    return new Promise(resolve => { 
      triggerOnTransitionEnd(dotId, 'height', () => {
        resolve(null)
      })  
      setDotVisibleClass('timeline-section__dot--show')
    }) 
  }

  const showInfoBox = () => {
    return new Promise(resolve => {
      triggerOnTransitionEnd(infoBoxId, 'opacity', () => {
        resolve(null)
      })  
      setInfoBoxVisibleClass('timeline-section__info-box--show')
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
    <div className='timeline-section'> 
      <div id={infoBoxId} className={`timeline-section__info-box ${infoBoxVisibleClass} ${infoBoxPositionClass}`}>
        {children && children}
      </div>
      <div className='timeline-section__line-container'> 
        <div id={lineId} className={`timeline-section__line ${lineHeightClass}`}/>
        <div id={dotId} className={`timeline-section__dot ${dotVisibileClass}`}/>   
      </div> 
   </div>
  )
}

export default TimelineSection;