import {
	Container,
	appendInitalChild,
	createInstance,
	createTextInstance
} from 'hostConfig';
import { FiberNode } from './fiber';
import { HostComponent, HostRoot, HostText } from './workTags';
import { NoFlags } from './fiberFlags';

// 递归中的归阶段
// 归的节点是当前最上面的节点
export const completeWork = (wip: FiberNode) => {
	const newProps = wip.pendingProps;
	const current = wip.alternate;

	console.log('wip.tag', wip.tag);

	switch (wip.tag) {
		case HostComponent:
			if (current !== null && wip.stateNode) {
				// update
			} else {
				// 构建DOM
				const instance = createInstance(wip.type, newProps);
				//并插入到DOM树当中
				appendAllChildren(instance, wip);
				wip.stateNode = instance;
				console.log('HostComponent', instance);
			}
			bubbleProperties(wip);
			return null;
		case HostText:
			if (current !== null && wip.stateNode) {
				// update
			} else {
				// 构建DOM
				const instance = createTextInstance(newProps.content);
				wip.stateNode = instance;
				console.log('HostText', instance);
			}
			bubbleProperties(wip);
			return null;
		case HostRoot:
			bubbleProperties(wip);
			return null;
		default:
			return null;
	}
};

function appendAllChildren(parent: Container, wip: FiberNode) {
	let node = wip.child;

	while (node !== null) {
		if (node?.tag === HostComponent || node?.tag === HostText) {
			appendInitalChild(parent, node.stateNode);
		} else if (node.child !== null) {
			node.child.return = node;
			node = node.child;
			continue;
		}

		if (node === wip) {
			return;
		}

		while (node.sibling === null) {
			if (node.return === null || node.return === wip) {
				return;
			}
			node = node?.return;
		}
		node.sibling.return = node.return;
		node = node.sibling;
	}
}

function bubbleProperties(wip: FiberNode) {
	let subtreeFlags = NoFlags;
	let child = wip.child;

	while (child !== null) {
		subtreeFlags |= child.subtreeFlags;
		subtreeFlags |= child.flags;

		child.return = wip;
		child = child.sibling;
	}
	wip.subtreeFlags |= subtreeFlags;
}
