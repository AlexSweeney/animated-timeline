import { triggerOnTransitionEnd } from './utils'; 
import { cleanup, createEvent, fireEvent, getByRole, render } from '@testing-library/react';

afterEach(() => { 
  cleanup() 
})

describe('triggerOnTransitionEnd', () => {
  it('should call function on transitionend event', () => {  
    const idOne = "el-one"; 
    const endFn = jest.fn();

    // append Node
    const button = <button id={idOne}>Button</button>;
    const { container } = render(button);
  
    // listen
    triggerOnTransitionEnd(idOne, 'width', endFn)

    // trigger event 
    const buttonNode = getByRole(container, 'button');
    const event = createEvent.transitionEnd(buttonNode);   
    Object.defineProperty(event, 'propertyName', {
      value: 'width',
    })

    fireEvent(buttonNode, event) 

    // check
    expect(endFn).toHaveBeenCalledTimes(1) 
  })

  it('should not call function on transitionend event emitted from child', () => {
    const divId = 'div';
    const endFn = jest.fn(); 

    // render
    const wrappedButton = (
      <div id={divId}>
        <button>Button</button>
      </div>
    );
    
    const { container } = render(wrappedButton) 

    // listen
    triggerOnTransitionEnd(divId, 'width', endFn)

    // trigger event 
    const buttonNode = getByRole(container, 'button');
    const event = createEvent.transitionEnd(buttonNode, {
      propertyName: 'width',
      bubbles: true,
    });

    fireEvent(buttonNode, event)

    // check
    expect(endFn).toHaveBeenCalledTimes(0)
  })
})