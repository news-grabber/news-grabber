var instances = new Map();

class Tracker {
	constructor(url, body) {
		this.body = body;
		this.url = url;
	}
	update(body) {
		if (body !== this.body) {
			this.body = body;
			return body;
		}
		return false;
	}
	static diff(url, body) {
		if (!instances.has(url)) {
			let tracker = new Tracker(url, body);
			instances.set(url, tracker);
			return false;
		}
		let tracker = instances.get(url);
		return tracker.update(body);
	}
	static clear() {
		instances.clear();
	}
}

export default Tracker;
