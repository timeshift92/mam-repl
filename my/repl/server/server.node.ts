namespace $ {
	class $mol_server extends $mol_build_server {
		expressHandlers(): any[] {
			return [this.preventCache(), ... super.expressHandlers()]
		}
		preventCache() {
			return (
				req: typeof $node.express.request,
				res: typeof $node.express.response,
				next: () => void
			) => {
				console.log(req)
				res.set('Cache-Control', 'no-store')
				next()
			}
		}
	}
}
