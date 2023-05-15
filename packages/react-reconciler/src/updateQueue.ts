import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>; // 对应了两种更新的方式
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

export const createUpdateQueue = <State>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<State>;
};

export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) => {
	updateQueue.shared.pending = update;
};

export const processUpdateQueue = <State>(
	baseState: State, // 初始状态
	pendingUpdate: Update<State> | null // 消费的
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};

	if (pendingUpdate !== null) {
		// baseState 1 update 2 -> memoizedState 2
		// baseState 1 update (x) -> 4x memoizedState 4
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			result.memoizedState = action(baseState);
		} else {
			result.memoizedState = action;
		}
	}
	return result;
};
