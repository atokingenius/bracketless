import { assertEquals } from "@std/assert";
export class cssRule {
	#property: string;
	#value: string;
	constructor(property: string, value: string) {
		this.#property = property;
		this.#value = value;
	}
	toString(): string {
		return `${this.#property}: ${this.#value};`;
	}
}

Deno.test('cssRule-constructor', () => {
	const rule = new cssRule('color', 'red');
	assertEquals(rule.toString(), 'color: red;');
});