import { assertEquals } from "@std/assert";
import {htmlNode} from '../htmlNode.ts';
export class heading extends htmlNode {
	constructor(headerType: 1 | 2 | 3 | 4 | 5 | 6, contents: string) {
		super('h'+headerType);
		this.addChild(contents);
	}
}
Deno.test("heading-construstor", () => {
	assertEquals(new heading(1, "test").toString(), "<h1>test</h1>");
});