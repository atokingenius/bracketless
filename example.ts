import { Application } from "jsr:@oak/oak";
import {htmlPage, htmlNode, hyperlink, heading} from "./mod.ts";

startServer();

function startServer() {
	const app = new Application();
	app.use((context, next) => {
		if (!context.request.url.pathname.startsWith('/docs/'))
			return next();
		return context.send({ root: './', index: 'index.html' });
	});
	app.use((context) => {
		context.response.status = 200;
		context.response.headers.set("Content-Type", "text/html");

		// the important part - every htmlNode can be converted into proper HTML this way
		// note that at no point does this implement the DOM on the server
		// managing state should be handled elsewhere
		context.response.body = generateIndex().toString();
	});
	app.listen({port: 8080});
	console.log('View example at http://localhost:8080/');
}

function generateIndex(): htmlPage {
	const start = Date.now();
	const page = new htmlPage();
	page.head.setTitle("Bracketless Example!");
	page.body.addChild(
		generateContainer()
			.addChild(generateHelloWorld())
			.addChild(generateDocumentationLink())
			.addChild(generateLintResultLink())
			.addChild(`<p>This page took ${Date.now()-start}ms to generate on the server</p>`)
	)
	return page;
}
function generateContainer(): htmlNode {
	return new htmlNode('div')
}
function generateHelloWorld(): htmlNode {
	return new heading(1, "Hello World!")
		.addCssRule('color', 'red')
}
function generateDocumentationLink(): htmlNode {
	return new hyperlink('/docs/', new heading(2, "View auto-generated documentation"));
}
function generateLintResultLink(): htmlNode {
	return new hyperlink('/docs/lint-result.txt', new heading(2, "View lint result for this module"));
}