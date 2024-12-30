import {htmlNode, type htmlNodeChild} from './htmlNode.ts';
import {cssClass} from "./cssClass.ts";
import {assertEquals} from "@std/assert";
export class htmlHeadNode extends htmlNode {
	#hasTitle = false;
	#classes: cssClass[] = [];
	constructor() {
		super('head');
	}
	setTitle(title: string): this {
		this.addChild(new htmlNode('title').addChild(title));
		this.#hasTitle = true;
		return this;
	}
	addClass(cssClass: cssClass): this {
		this.#classes.push(cssClass);
		return this;
	}
	addStylesheet(stylesheetUrl: string): this {
		this.addChild(new htmlNode('link', true)
			.setProperty('rel', 'stylesheet')
			.setProperty('type', 'text/css')
			.setProperty('href', stylesheetUrl)
		);
		return this;
	}
	override addChild(child: htmlNodeChild): this {
		if (child instanceof htmlNode && child.tagname === 'title')
			if (this.#hasTitle)
				throw new Error('Head already has a title');
			else
				this.#hasTitle = true;
		return super.addChild(child);
	}
	override toString(): string {
		const openTag = `<${this.tagname}>`;
		const closeTag = `</${this.tagname}>`;
		const children = this.children.map((child): string => {return child.toString()}).join('');
		const styles = this.#classes.length>0 ? '<style>'+this.#classes.map((cssClass): string => {return cssClass.toString()}).join('\n')+'</style>' : '';
		return `${openTag}${styles}${children}${closeTag}`;
	}
}

Deno.test('htmlHeadNode-addStyleSheet', () => {
	const head = new htmlHeadNode();
	head.addStylesheet('test.css');
	assertEquals(head.toString(), '<head><link rel="stylesheet" type="text/css" href="test.css" /></head>');
});
Deno.test('htmlHeadNode-addClass', () => {
	const node = new htmlHeadNode()
		.addClass(new cssClass('test')
			.addRule('color', 'red')
			.addRule('text-decoration', 'underline')
		);
	assertEquals(node.toString(), '<head><style>.test {color: red;text-decoration: underline;}</style></head>');
});