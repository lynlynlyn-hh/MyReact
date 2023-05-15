export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;
export const HostRoot = 3; // 根结点
export const HostComponent = 5; // <div>...
export const HostText = 6; // 标签里面的text
