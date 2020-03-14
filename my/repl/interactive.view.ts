namespace $.$$ {

	export class $my_repl_interactive extends $.$my_repl_interactive {
		socket: any
		host = 'http://127.0.0.1:9080'
		reconnect() {
			this.socket = new WebSocket('ws://localhost:9001')
			var self = this;
			this.socket.onclose = function () {
				setTimeout(self.reconnect, 5000)
			}
			this.socket.onmessage = (event: any) => {
				this.url2(`${this.host}/my/repl/page/?${new Date().getTime()}`)
				setTimeout(() => {
					this.url(`${this.host}/my/repl/page/?${new Date().getTime()}`)
				}, 250);

			}
		}

		constructor() {
			super();
			this.sending_source.tree = this.$.$mol_state_arg.value('tree_source')
			this.sending_source.ts = this.$.$mol_state_arg.value('ts_source')
			this.sending_source.css = this.$.$mol_state_arg.value('css_source')
			this.reconnect();
			setInterval(() => {
				if (
					(this.current_source.tree != this.sending_source.tree ||
					this.current_source.css != this.sending_source.css ||
					this.current_source.ts != this.sending_source.ts)
					&& new Date().getTime() - this.typing > 1500) {
					this.current_source = Object.assign({}, this.sending_source);
					if (this.socket.readyState === this.socket.OPEN)
						this.socket.send(JSON.stringify(this.sending_source));

				}
			}, 1000)



		}
		@$mol_mem
		compiled() {
			return $mol_view_tree_compile($mol_tree.fromString(this.tree_source(), 'view.tree'))
		}

		result() {
			return ''

		}
		typing = new Date().getTime();
		sending_source = { tree: '', ts: '', css: '' };
		current_source = { tree: '', ts: '', css: '' };;
		source(next?: string) {
			$my_repl.Root(0).App().TreeSource().Edit().dom_node().setAttribute('autofocus','true');
			let source = this.$.$mol_state_arg.value('source', next)
			this.typing = new Date().getTime();
			this.sending_source.tree = source;
			return source || ''
		}
		tree_source(next?: string) {
			$my_repl.Root(0).App().TreeSource().Edit().dom_node().setAttribute('autofocus','true');
			let source = this.$.$mol_state_arg.value('tree_source', next)
			this.typing = new Date().getTime();
			this.sending_source.tree = source;
			return source || ''
		}
		css_source(next?: string) {
			$my_repl.Root(0).App().CssSource().Edit().dom_node().setAttribute('autofocus','true');
			let source = this.$.$mol_state_arg.value('css_source', next)
			this.typing = new Date().getTime();
			this.sending_source.css = source;
			return source || ''
		}
		ts_source(next?: string) {
			$my_repl.Root(0).App().TsSource().Edit().dom_node().setAttribute('autofocus','true');
			let source = this.$.$mol_state_arg.value('ts_source', next)
			this.typing = new Date().getTime();
			this.sending_source.ts = source;
			return source || ''
		}


	}

}
