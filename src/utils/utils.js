export function triggerOnTransitionEnd(id, propertyName, onEnd, cancel = false) { 
	const element = document.getElementById(id);  
	if(!element) throw new Error(`triggerOnTransitionEnd() element not found for id: '${id}'`)
 
	element.addEventListener('transitionend', (event) => {  
		const isBubbling = event.eventPhase === 3;
		const isSameProperty = event.propertyName === propertyName; 

		if(isSameProperty && !isBubbling && !cancel) onEnd() 
	})
}

export function callAtSameTime() { 
	const promises = Array.from(arguments).map(fn => fn()); 
	return Promise.all(promises);
}