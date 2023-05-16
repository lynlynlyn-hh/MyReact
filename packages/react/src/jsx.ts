import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { ElementType, Key, Ref, Props, ReactElement } from 'shared/ReactTypes';

const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__flag: 'Hiyn'
	};
	return element;
};

// https://juejin.cn/post/7045251693453246501 同步遍历和异步遍历
// for in是遍历（object）键名，for of是遍历（array）键值
// todo 原型继承 http://louiszhai.github.io/2015/12/15/prototypeChain/
export const jsx = (
	type: ElementType,
	config: Props,
	...maybeChildren: any
) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			key = val !== undefined ? '' + val : key;
			continue;
		}
		if (prop === 'ref') {
			ref = val !== undefined ? val : ref;
			continue;
		}
		// 强制的校验
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		props.children =
			maybeChildrenLength === 1 ? maybeChildren[0] : maybeChildren;
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: Props) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			key = val !== undefined ? '' + val : key;
			continue;
		}
		if (prop === 'ref') {
			ref = val !== undefined ? val : ref;
			continue;
		}
		// 强制的校验
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	return ReactElement(type, key, ref, props);
};
