namespace $.$$ {

	export class $my_repl_interactive extends $.$my_repl_interactive {
		// host = 'http://46.173.215.130:9080'
		host = 'http://localhost:9080'
		// ws = 'ws://46.173.215.130:9001'
		ws = 'ws://localhost:9001/'
		socket = new WebSocket(this.ws)

		@$mol_mem
		connection() {
			var self = this;
			this.socket.onclose = function () {
				setTimeout(() => self.socket = new WebSocket(self.ws), 5000)
			}
			this.socket.onmessage = (event: any) => {
				// this.url2(`${this.host}/my/repl/page/?${new Date().getTime()}`)
				// setTimeout(() => {
					this.url(`${this.host}/my/repl/page/-/test.html?${new Date().getTime()}`)
				// }, 250);
			}

			this.sending_source.tree = this.$.$mol_state_arg.dict()['tree_source'];
			this.sending_source.ts = this.$.$mol_state_arg.dict()['ts_source'];
			this.sending_source.css = this.$.$mol_state_arg.dict()['css_source'];
			setTimeout(() => {
				this.send_source();
			}, 1000);

			return {
				destructor: () => {
					// this.socket.close()
				}
			}
		}

		send_source() {
			if (
				(this.current_source.tree != this.sending_source.tree ||
					this.current_source.css != this.sending_source.css ||
					this.current_source.ts != this.sending_source.ts)
				&& new Date().getTime() - this.typing > 1500) {
				this.current_source = Object.assign({}, this.sending_source);
				if (this.socket.readyState === this.socket.OPEN)
					this.socket.send(JSON.stringify(this.sending_source));
			}
		}
		render() {
			this.connection();

			return super.render();
		}
		ctrl_s_press(event: KeyboardEvent) {
			if (event.ctrlKey || event.metaKey) {
				switch (String.fromCharCode(event.which).toLowerCase()) {
					case 's':
						event.preventDefault();
						this.send_source();
						break;
				}
			}

		}
		handle_click(event: any) {
			this.send_source();
		}
		@$mol_mem
		handle_checked(val?: any, force?: $mol_mem_force) {
			if (val) {
				this.auto_save()
			} else {
				this.stop_auto_save()
			}
			return (val !== void 0) ? val : false
		}

		auto_save_service: any
		auto_save() {
			this.auto_save_service = setInterval(() => {
				this.send_source();
			}, 1000)


		}

		stop_auto_save() {
			clearInterval(this.auto_save_service);
		}

		@$mol_mem
		compiled() {
			return $mol_view_tree_compile($mol_tree.fromString(this.tree_source(), 'view.tree'))
		}

		result() {
			return ''

		}

		@$mol_mem
		outbox(next?: { tree: string, css: string, ts: string }, ) {
			if (this.socket.readyState === this.socket.OPEN)
				this.socket.send(JSON.stringify(next))
			return next
		}
		typing = new Date().getTime();
		sending_source = { tree: '', ts: '', css: '' };
		current_source = { tree: '', ts: '', css: '' };;

		tree_source(next?: string) {
			let source = this.$.$mol_state_arg.value('tree_source', next)
			this.typing = new Date().getTime();
			this.sending_source.tree = source;
			return source || ''
		}
		css_source(next?: string) {
			let source = this.$.$mol_state_arg.value('css_source', next)
			this.typing = new Date().getTime();
			this.sending_source.css = source;
			return source || ''
		}
		ts_source(next?: string) {
			let source = this.$.$mol_state_arg.value('ts_source', next)
			this.typing = new Date().getTime();
			this.sending_source.ts = source;
			return source || ''
		}
	}

}
