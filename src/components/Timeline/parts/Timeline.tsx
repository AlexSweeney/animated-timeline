import React, { useEffect, useState } from 'react';
import TimelineSection from '../../TimelineSection/parts/TimelineSection';
import './../styles/Timeline.scss';
import { v4 as uuid } from 'uuid';
import { InfoBoxPosition } from '../../TimelineSection/utils/TimelineSection.consts';

const Timeline = () => {
  // === id
  const [idNum] = useState<string>(uuid());
  const [timelineId] = useState<string>(`timeline-${idNum}`);
  // === consts
  const [ids, setIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animateId, setAnimateId] = useState<string>(''); 

  // === event handlers
  const onRender = () => { 
    window.addEventListener('scroll', onScroll);
  };

  const onScroll = () => {
    const windowTop: number = window.pageYOffset; 
    const timelineTop: number|void = document.getElementById(timelineId)?.offsetTop; 

    if(timelineTop && windowTop >= timelineTop) {
      setIsAnimating(true)
      window.removeEventListener('scroll', onScroll);
    }
  };

  const onStartAnimation = () => {
    setAnimateId(ids[currentIndex])
  };

  // === utils
  const addId = (id:string) => { 
    setIds(ids => [...ids, id])
  }

  const nextAnimation = () => { 
    const newIndex: number = currentIndex + 1; 

    if(newIndex < ids.length) {
      setAnimateId(ids[newIndex])
      setCurrentIndex(newIndex)  
    } else {
      setIsAnimating(false)
    }
  };

  // === listen / trigger
  useEffect(() => {
    onRender()
  }, [])

  useEffect(() => {
    if(isAnimating) onStartAnimation()
  }, [isAnimating])

  // === output  
  return (
    <>
      <div className="root" id={timelineId}>   
        <TimelineSection 
          addId={addId} 
          isAnimating={isAnimating} 
          animateId={animateId} 
          nextAnimation={nextAnimation} 
        /> 
        <TimelineSection 
          addId={addId} 
          isAnimating={isAnimating} 
          animateId={animateId} 
          nextAnimation={nextAnimation} 
          infoBoxPosition={InfoBoxPosition.Right}
        /> 
        <TimelineSection 
          addId={addId} 
          isAnimating={isAnimating} 
          animateId={animateId} 
          nextAnimation={nextAnimation} 
        /> 
        <TimelineSection 
          addId={addId} 
          isAnimating={isAnimating} 
          animateId={animateId} 
          nextAnimation={nextAnimation} 
          infoBoxPosition={InfoBoxPosition.Right}
        /> 
        <TimelineSection 
          addId={addId} 
          isAnimating={isAnimating} 
          animateId={animateId} 
          nextAnimation={nextAnimation} 
        /> 
        <TimelineSection 
          addId={addId} 
          isAnimating={isAnimating} 
          animateId={animateId} 
          nextAnimation={nextAnimation} 
          infoBoxPosition={InfoBoxPosition.Right}
        /> 
      </div> 
    </>
  )
}

export default Timeline;