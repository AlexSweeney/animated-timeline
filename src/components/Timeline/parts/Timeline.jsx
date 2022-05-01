import React, { useEffect, useState } from 'react';
import Node from '../../Node/parts/Node';
import './../styles/Timeline.css';
import { v4 as uuid } from 'uuid';


const Timeline = ({

}) => {
  // id
  const [idNum] = useState(uuid());
  const [timelineId] = useState(`timeline-${idNum}`);
  // consts
  const [ids, setIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animateId, setAnimateId] = useState(null);

  // === event handlers
  const onClickButton = () => { 
    setIsAnimating(true)
  };

  const onRender = () => { 
    window.addEventListener('scroll', onScroll)
  };

  const onScroll = () => {
    const windowTop = window.pageYOffset;
    const timelineTop = document.getElementById(timelineId).offsetTop; 

    if(windowTop >= timelineTop) {
      setIsAnimating(true)
    }
  };

  const onStartAnimation = () => {
    setAnimateId(ids[currentIndex])
  };

  // === utils 
  const iterateAnimation = () => { 
    const newIndex = currentIndex + 1; 

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
    <div className="root" id={timelineId}>    
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 
      <Node setIds={setIds} isAnimating={isAnimating} animateId={animateId} iterateAnimation={iterateAnimation}/> 

      <button onClick={onClickButton}>Animate</button>
    </div>
  )
}

export default Timeline;