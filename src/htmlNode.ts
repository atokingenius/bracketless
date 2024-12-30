import {htmlNodeProperty} from "./htmlNodeProperty.ts";
import {cssRule} from './cssRule.ts';
import {cssClass} from './cssClass.ts';
import { assertEquals } from "@std/assert";

export type htmlNodeChild = htmlNode | string;
export class htmlNode {
	static disallowedHtmlProperties = ['class', 'style'];
	#children: htmlNodeChild[] = [];
	#styles: cssRule[] = [];
	#tagname: string;
	#classes: string[] = [];
	#properties: htmlNodeProperty[] = [];
	#selfClosing: boolean;
	constructor(tagName: string, selfClosing = false) {
		this.#tagname = tagName;
		this.#selfClosing = selfClosing;
	}
	get children(): htmlNodeChild[] {
		return this.#children;
	}
	get tagname(): string {
		return this.#tagname;
	}
	addChild(child: htmlNodeChild): this {
		this.#children.push(child);
		return this;
	}
	addCssRule(prop: string, value: string): this {
		this.#styles.push(new cssRule(prop, value));
		return this;
	}
	assignClass(cssClass: cssClass): this {
		this.#classes.push(cssClass.name);
		return this;
	}
	setProperty(property: string, value: string): this {
		if (htmlNode.disallowedHtmlProperties.includes(property))
			throw new Error(`Property "${property}" is not allowed`);
		this.#properties.push(new htmlNodeProperty(property, value));
		return this;
	}
	toString(): string {
		const styles = this.#styles.length>0 ? ' style="'+this.#styles.map((rule): string => {return rule.toString()}).join(' ')+'"' : '';
		const classes = this.#classes.length>0 ? ' class="'+this.#classes.join(' ')+'"' : '';
		const properties = this.#properties.length>0 ? ' '+this.#properties.map((property): string => {return property.toString()}).join(' ') : '';
		const openTag = `<${this.#tagname}${styles}${classes}${properties}${this.#selfClosing ? ' />' : '>'}`;
		const closeTag = `</${this.#tagname}>`;
		const children = this.#children.map((child): string => {return child.toString()}).join('');
		return `${openTag}${this.#selfClosing ? '' : children+closeTag}`;
	}
}

Deno.test('htmlNode-constructor', () => {
	const node = new htmlNode('div');
	assertEquals(node.toString(), '<div></div>');
});
Deno.test('htmlNode-nesting-string', () => {
	const node = new htmlNode('div')
		.addChild(
			'test'
		);
	assertEquals(node.toString(), '<div>test</div>');
});
Deno.test('htmlNode-nesting-node', () => {
	const node = new htmlNode('div')
		.addChild(
			new htmlNode('div')
		);
	assertEquals(node.toString(), '<div><div></div></div>');
});
Deno.test('htmlNode-addStyleRule', () => {
	const node = new htmlNode('div')
		.addCssRule('color', 'red')
		.addCssRule('text-decoration', 'underline');
	assertEquals(node.toString(), '<div style="color: red; text-decoration: underline;"></div>');
});
Deno.test('htmlNode-assignClass', () => {
	const node = new htmlNode('div')
		.assignClass(new cssClass('test'));
	assertEquals(node.toString(), '<div class="test"></div>');
});