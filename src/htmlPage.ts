import {htmlNode} from './htmlNode.ts';
import {htmlHeadNode} from './htmlHeadNode.ts';
import {htmlBodyNode} from './htmlBodyNode.ts';
import { assertEquals } from '@std/assert';
export class htmlPage extends htmlNode {
	#headNode: htmlHeadNode = new htmlHeadNode();
	#bodyNode: htmlBodyNode = new htmlBodyNode();
	constructor() {
		super('html');
		this.addChild(this.#headNode).addChild(this.#bodyNode);
	}
	get head(): htmlHeadNode {
		return this.#headNode;
	}
	get body(): htmlBodyNode {
		return this.#bodyNode;
	}
	override toString(): string {
		return `<!DOCTYPE html>${super.toString()}`;
	}
}

Deno.test('htmlPage-constructor', () => {
	const node = new htmlPage();
	assertEquals(node.toString(), '<!DOCTYPE html><html><head></head><body></body></html>');
});
Deno.test('htmlPage-setTitle', () => {
	const node = new htmlPage();
	node.head.setTitle('Title');
	assertEquals(node.toString(), '<!DOCTYPE html><html><head><title>Title</title></head><body></body></html>');
});