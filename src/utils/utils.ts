export function triggerOnTransitionEnd(id: string, propertyName: string, onEnd: Function, cancel: boolean = false) { 
	const element: HTMLElement | null = document.getElementById(id);  
	if(!element) throw new Error(`triggerOnTransitionEnd() element not found for id: '${id}'`)
 
	element.addEventListener('transitionend', (event) => {  
		const isBubbling: boolean = event.eventPhase === 3;
		const isSameProperty: boolean = event.propertyName === propertyName; 

		if(isSameProperty && !isBubbling && !cancel) onEnd() 
	})
}