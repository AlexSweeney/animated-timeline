import React, {useEffect, useState} from 'react';
import { triggerOnTransitionEnd, callAtSameTime } from '../../../utils/utils';
import '../styles/TimelineSection.scss';
import { v4 as uuid } from 'uuid';
import { InfoBoxPosition } from '../utils/TimelineSection.consts';


export interface TimelineSectionProps {
  addId: (param: string) => void, 
  isAnimating: boolean, 
  animateId: string, 
  nextAnimation: Function,
  infoBoxPosition?: InfoBoxPosition,
}

const TimelineSection = ({ 
  addId, 
  isAnimating, 
  animateId, 
  nextAnimation,
  infoBoxPosition = InfoBoxPosition.Left,
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
      setLineHeightClass('timeline-section__line--open')
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
      <div className='timeline-section__line-container'>
        <div id={lineId} className={`timeline-section__line ${lineHeightClass}`}/>
        <div id={dotId} className={`timeline-section__dot ${dotVisibileClass}`}/>   
      </div>
      <div id={infoBoxId} className={`timeline-section__info-box ${infoBoxVisibleClass} ${infoBoxPositionClass}`}>
        <h3>Year 2020</h3>
        <p>Hello world</p>
      </div>
   </div>
  )
}

export default TimelineSection;