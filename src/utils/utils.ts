export function triggerOnTransitionEnd(id: string, propertyName: string, onEnd: Function, cancel: boolean = false) { 
	const element: HTMLElement | null = document.getElementById(id);  
	if(!element) throw new Error(`triggerOnTransitionEnd() element not found for id: '${id}'`)
 
	element.addEventListener('transitionend', (event) => {  
		const isBubbling: boolean = event.eventPhase === 3;
		const isSameProperty: boolean = event.propertyName === propertyName; 

		if(isSameProperty && !isBubbling && !cancel) onEnd() 
	})
}

type PromiseFunction = () => Promise<any>;

export function callAtSameTime(...params: PromiseFunction[]) { 
	const promises: Promise<any>[] = Array.from(arguments).map(fn => fn()); 
	return Promise.all(promises);
}