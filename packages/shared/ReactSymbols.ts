// symbol 这里用到了
// https://juejin.cn/post/6844903741280223240 why use symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// just 0xeac7 looks like React 独一无二的 外面生成也无用
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
