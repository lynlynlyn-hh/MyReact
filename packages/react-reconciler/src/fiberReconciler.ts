import { Container } from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import {
	UpdateQueue,
	createUpdate,
	createUpdateQueue,
	enqueueUpdate
} from './updateQueue';
import { ReactElement } from 'shared/ReactTypes';
import { scheduleUpdateOnFiber } from './workLoop';

// ReactDOM.createRoot().render(<App />)

// 1
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}

// 2
export function updateContainer(
	element: ReactElement | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	// <App /> 对应element
	const update = createUpdate<ReactElement | null>(element);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>,
		update
	);
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
