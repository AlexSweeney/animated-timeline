import React, { useEffect, useState, createContext } from 'react';
import TimelineSection from './TimelineSection';
import { triggerOnTransitionEnd } from '../../../utils/utils';
import './../styles/Timeline.scss';
import { v4 as uuid } from 'uuid';
import { InfoBoxPosition, LineOpenClass } from './../utils/TimelineSection.consts';

export const TimelineContext: any = createContext(null);

const Timeline = () => { 
  // === id
  const [idNum] = useState<string>(uuid());
  const [timelineId] = useState<string>(`timeline-${idNum}`);
  const [lineId] = useState<string>(`timeline__line-${idNum}`);
  // === consts
  const [ids, setIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animateId, setAnimateId] = useState<string>(''); 
  // === classes
  const [lineOpenClass, setLineOpenClass] = useState<string>(LineOpenClass.Closed);

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
    openLine()
      .then(showTimelineSections)
  };
     
  // === utils
  const openLine = () => { 
    return new Promise(resolve => {
      triggerOnTransitionEnd(lineId, 'height', () => { 
        resolve(null)
      }) 
      setLineOpenClass(LineOpenClass.Open)
    }) 
  };

  const addId = (id:string) => { 
    setIds(ids => [...ids, id])
  };

  const showTimelineSections = () => {
    setAnimateId(ids[currentIndex])
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
    <TimelineContext.Provider value={{addId, isAnimating, animateId, nextAnimation}}> 
      <section className="timeline__container" id={timelineId}>   
        <h3 className="timeline__title">Our Journey</h3>

        <div className='timeline__content-wrapper'>
          <TimelineSection>   
            <h4>2021</h4>
            <p>New Knowledge Hub platform launches</p>
          </TimelineSection>

          <TimelineSection infoBoxPosition={InfoBoxPosition.Right}>
            <h4>2020</h4>
            <p>Million parts sold globally - Audio Audio launched</p>
          </TimelineSection>    

          <TimelineSection>
            <h4>2019</h4>  
            <p>German Sales office is opened forming global HQ</p>
          </TimelineSection> 

          <TimelineSection infoBoxPosition={InfoBoxPosition.Right}>
            <h4>2018</h4>  
            <p>German distribution center in opened</p>
          </TimelineSection>  

          <TimelineSection>
            <h4>2017</h4>  
            <p>First Office in USA opens - Second UK office opens</p>   
          </TimelineSection>  

          <TimelineSection infoBoxPosition={InfoBoxPosition.Right}>
            <h4>2016</h4>  
            <p>EU Automation INC is formed - Singapore Office and warehouse opens</p>   
          </TimelineSection> 

          <TimelineSection>
            <h4>2015</h4>   
            <p>First customer to reach 1000 orders</p> 
          </TimelineSection> 

          <TimelineSection infoBoxPosition={InfoBoxPosition.Right}>
            <h4>2014</h4> 
            <p>AUTOMATED magazine launches</p>     
          </TimelineSection> 

          <TimelineSection>
            <h4>2013</h4>   
            <p>Delivery made to 100th country</p>    
          </TimelineSection> 

          <TimelineSection infoBoxPosition={InfoBoxPosition.Right}>
            <h4>2012</h4>    
            <p>UK distribution center opens</p>  
          </TimelineSection> 

          <TimelineSection>
            <h4>2011</h4>       
            <p>First customer reaches 100 orders</p>
          </TimelineSection> 

          <TimelineSection  
            infoBoxPosition={InfoBoxPosition.Right}
          >
            <h4>2010</h4>      
            <p>EU Automations first UK office</p>
          </TimelineSection> 

          <TimelineSection  
            className="timeline-section--last"
          >
            <h4>2009</h4>  
            <p>EU Automation is formed in Stafforshire, UK</p>     
          </TimelineSection> 

          <div className='timeline__line-wrapper'>
            <div id={lineId} className={`timeline__line ${lineOpenClass}`}/>
          </div> 
        </div>
      </section> 
    </TimelineContext.Provider>
  )
}

export default Timeline;