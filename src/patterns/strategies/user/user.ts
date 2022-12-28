class UserStrategy {
	private req = {};

	constructor(req) {
		this.req = req;
	}

	public getRequest() {
		return 'getRequest';
	}
}

export const Strategy = UserStrategy;
