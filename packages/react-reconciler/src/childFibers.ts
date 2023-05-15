import { ReactElement } from 'shared/ReactTypes';
import { FiberNode, createFiberFromElement } from './fiber';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { HostText } from './workTags';
import { Placement } from './fiberFlags';

function ChildReconciler(shouldTrackEffects: boolean) {
	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElement
	) {
		// 根据ReactElement 创建 Fiber 然后返回
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber;
		return fiber;
	}

	function reconcileSingleTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) {
		// 根据ReactElement 创建 Fiber 然后返回
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}

	function placeSingleChild(fiber: FiberNode) {
		// 首屏渲染 + 应该追踪副作用
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement;
		}
		return fiber;
	}

	return function reconcileChildFibers(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		newChild?: ReactElement
	) {
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return reconcileSingleElement(returnFiber, currentFiber, newChild);
				default:
					console.warn('未实现的reconcile类型', newChild);
					break;
			}
		}
		// 多节点？  ul > li * 3
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return reconcileSingleTextNode(returnFiber, null, newChild);
		}
		console.warn('未实现的reconcile类型', newChild);
		return null;
	};
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
