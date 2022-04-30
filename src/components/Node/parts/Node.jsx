import React, {useEffect, useState} from 'react';
import { triggerOnTransitionEnd } from '../../../utils/utils';
import './../styles/Node.css';
import { v4 as uuid } from 'uuid';

const Node = ({ setIds }) => { 
  console.log('')
  const [lineHeightClass, setLineHeightClass] = useState('line--closed');
  const [dotVisibileClass, setDotVisibleClass] = useState('dot--hide');
  const [infoBoxVisibleClass, setInfoBoxVisibleClass] = useState('infoBox--hide');
  const [idNum] = useState(uuid());
  const [lineId] = useState(`line-${idNum}`);
  const [dotId] = useState(`dot-${idNum}`);
  const [infoBoxId] = useState(`infoBox-${idNum}`);
  
  const onRender = () => { 
    setIds(ids => [...ids, idNum])

    openLine().then(() => {
      showDot()
      showInfoBox()
    })
  };

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
      console.log('show dot')
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

  useEffect(() => {
    onRender()
  }, [])

  return (
    <div className='node'> 
      <div className='timeline'>
        <div id={lineId} className={`line ${lineHeightClass}`}/>
        <div id={dotId} className={`dot ${dotVisibileClass}`}/>   
      </div>
      <div id={infoBoxId} className={`infoBox ${infoBoxVisibleClass}`}>
        <h3>Year 2020</h3>
        <p>Hello world</p>
      </div>
   </div>
  )
}

export default Node;