import './../styles/Timeline.css';
import Node from '../../Node/parts/Node';
import React, { useEffect, useState } from 'react';

const Timeline = ({

}) => {
  const [ids, setIds] = useState([]);

  // useEffect(() => { 
  //   console.log('ids', ids)
  // }, [ids])

  return (
    <div className="root">
      <Node setIds={setIds}>
      </Node>
    </div>
  )
}

export default Timeline;