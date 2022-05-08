import React, {ReactNode, useContext, useEffect, useState} from 'react';
import { TimelineContext } from './Timeline';
import { triggerOnTransitionEnd } from '../../../utils/utils';
import '../styles/TimelineSection.scss';
import { v4 as uuid } from 'uuid';
import { InfoBoxPosition } from './../utils/TimelineSection.consts';

export interface TimelineSectionProps {
  infoBoxPosition?: InfoBoxPosition,
  className?: string,
  children?: ReactNode, 
}

const TimelineSection = ({ 
  infoBoxPosition = InfoBoxPosition.Left,
  className = '',
  children,
}: TimelineSectionProps) => {   
  // === context 
  const { addId, isAnimating, animateId, nextAnimation } = useContext(TimelineContext); 
  // ==== ids
  const [idNum] = useState<string>(uuid()); 
  const [dotId] = useState<string>(`timeline-section__dot-${idNum}`);
  const [infoBoxId] = useState<string>(`timeline-section__info-box-${idNum}`);
  // === classes 
  const [dotVisibileClass, setDotVisibleClass] = useState<string>('timeline-section__dot--hide');
  const [infoBoxVisibleClass, setInfoBoxVisibleClass] = useState<string>('timeline-section__info-box--hide');
  const [infoBoxPositionClass] = useState<string>(`timeline-section__info-box--${infoBoxPosition}`);
  
  // === event handlers
  const onRender = () => { 
    addId(idNum)
  };

  // === master
  const animate = () => {  
    showDot()
      .then(showInfoBox)
      .then(() => nextAnimation())
  }

  // === utils 
  const showDot = () => { 
    return new Promise(resolve => { 
      triggerOnTransitionEnd(dotId, 'height', resolve)
      setDotVisibleClass('timeline-section__dot--show')
    }) 
  }

  const showInfoBox = () => {
    return new Promise(resolve => {
      triggerOnTransitionEnd(infoBoxId, 'opacity', resolve)
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
    <div className={`timeline-section ${className}`}>  
      <div className='timeline-section__dot-container'>  
        <div id={dotId} className={`timeline-section__dot ${dotVisibileClass}`}/>   
      </div> 
      <div id={infoBoxId} className={`timeline-section__info-box ${infoBoxVisibleClass} ${infoBoxPositionClass}`}>
        {children && children}
      </div>  
   </div>
  )
}

export default TimelineSection;