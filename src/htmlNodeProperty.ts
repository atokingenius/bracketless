export class htmlNodeProperty {
	#property: string;
	#value: string;
	constructor(property: string, value: string) {
		this.#property = property;
		this.#value = value;
	}
	toString(): string {
		return `${this.#property}="${this.#value}"`;
	}
}