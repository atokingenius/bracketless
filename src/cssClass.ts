import {cssRule} from './cssRule.ts';
import { assertEquals } from "@std/assert";
export class cssClass {
	#rules: cssRule[] = [];
	#name: string;
	constructor(name: string) {
		this.#name = name;
	}
	get name(): string {
		return this.#name;
	}
	addRule(prop: string, value: string): this {
		this.#rules.push(new cssRule(prop, value));
		return this;
	}
	toString(): string {
		return `.${this.#name} {${this.#rules.map((rule): string => {return rule.toString()}).join('')}}`;
	}
}

Deno.test('cssClass-constructor', () => {
	const css = new cssClass('test');
	assertEquals(css.toString(), '.test {}');
});
Deno.test('cssClass-addRule', () => {
	const css = new cssClass('test')
		.addRule('color', 'red')
	assertEquals(css.toString(), '.test {color: red;}');
});