import React, { useEffect, useState } from 'react';
import Dot from './../../Dot/parts/Dot';
import './../styles/Timeline.scss';
import { v4 as uuid } from 'uuid';

const Timeline = () => {
  // === id
  const [idNum] = useState<string>(uuid());
  const [timelineId] = useState<string>(`timeline-${idNum}`);
  // === consts
  const [ids, setIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animateId, setAnimateId] = useState<string>(); 

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

  const iterateAnimation = () => { 
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
        {/* <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
        <Node setIds={setIds} infoBoxPosition="right" isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
        <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
        <Node setIds={setIds} infoBoxPosition="right" isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
        <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
        <Node setIds={setIds} infoBoxPosition="right" isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
        <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
        <Node setIds={setIds} infoBoxPosition="right" isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
        <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/>  */}
      </div> 
    </>
  )
}

export default Timeline;