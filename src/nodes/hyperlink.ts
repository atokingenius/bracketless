import { assertEquals } from "@std/assert";
import {htmlNode, type htmlNodeChild} from "../htmlNode.ts";
export class hyperlink extends htmlNode {
	constructor(href: string, contents: htmlNodeChild) {
		super('a');
		this.setProperty('href', href);
		this.addChild(contents);
	}
}

Deno.test("hyperlink-constructor", () => {
	assertEquals(new hyperlink("test.html", "test link").toString(), '<a href="test.html">test link</a>');
});