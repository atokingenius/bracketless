import {cssClass} from "./cssClass.ts";
export class cssStylesheet {
	#classes: cssClass[] = [];
	filename: string;
	addClass(name: string): cssClass {
		const newClass = new cssClass(name);
		this.#classes.push(newClass);
		return newClass;
	}
	toString(): string {
		return this.#classes.map((cssClass): string => {return cssClass.toString()}).join('\n');
	}
	constructor(filename: string) {
		this.filename = filename;
	}
}