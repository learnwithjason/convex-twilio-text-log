import { httpRouter } from 'convex/server';
import { save } from './messages';

const http = httpRouter();

http.route({
	path: '/messages',
	method: 'POST',
	handler: save,
});

export default http;
