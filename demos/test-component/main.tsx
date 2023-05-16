import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactElement } from 'shared/ReactTypes';

const jsx = (
	<div>
		<span>big-react</span>
	</div>
) as ReactElement;

const root = document.querySelector('#root') as Element;

// console.log('lynlynlyn', jsx);

ReactDOM.createRoot(root).render(jsx);
// console.log('React', React);
// console.log('jsx', jsx);