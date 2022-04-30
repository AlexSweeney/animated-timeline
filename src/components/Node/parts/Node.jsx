import React, {useEffect, useState} from 'react';
import { triggerOnTransitionEnd } from '../../../utils/utils';
import './../styles/Node.css';

export default function Node() {
  const [lineHeightClass, setLineHeightClass] = useState('line--closed');
  const [dotVisibileClass, setDotVisibleClass] = useState('dot--hide');
  const lineId = 'line-x';
  const dotId = 'dot-x';

  const onRender = () => {
    console.log('render -----')
    openLine().then(() => {
      showDot()
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
      triggerOnTransitionEnd(dotId, 'height', () => {
        resolve(null)
      })  
      setDotVisibleClass('dot--show')
    }) 
  }

  useEffect(() => {
    onRender()
  }, [])

  return (
    <div className='node'>
      <div id={lineId} className={`line ${lineHeightClass}`}/>
      <div id={dotId} className={`dot ${dotVisibileClass}`}/>
      <div className={'info-box'}/>
    </div>
  )
}