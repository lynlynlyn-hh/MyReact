export type ElementType = any;
export type Key = any;
export type Ref = any;
export type Props = any;

export interface ReactElement {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: Ref;
	__flag: string;
}

export type Action<State> = State | ((prevState: State) => State);
