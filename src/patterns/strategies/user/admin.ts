class AdminStrategy {
	private req = {};

	constructor(req) {
		this.req = req;
	}

	public getRequest() {
		return 'getRequest';
	}
}

export const Strategy = AdminStrategy;
