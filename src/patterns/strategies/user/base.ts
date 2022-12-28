abstract class Base {
	protected req = {};
	protected models = {};

	constructor(req, models) {
		this.req = req;
		this.models = models;
	}

	public abstract getUser();
}

export default Base;
