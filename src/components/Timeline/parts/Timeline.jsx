import './../styles/Timeline.css';
import Node from '../../Node/parts/Node';
import React, { useState } from 'react';

const Timeline = ({

}) => {
  const [ids, setIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animateId, setAnimateId] = useState(null);

  const onClickButton = () => { 
    startAnimation()
  };

  const startAnimation = () => { 
    setIsAnimating(true)
    setAnimateId(ids[currentIndex])
  };

  const iterateAnimation = () => { 
    const newIndex = currentIndex + 1; 

    if(newIndex < ids.length) {
      setAnimateId(ids[newIndex])
      setCurrentIndex(newIndex)  
    } else {
      setIsAnimating(false)
    }
  };

  return (
    <div className="root">  
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