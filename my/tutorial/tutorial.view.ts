namespace $.$$ {

	export class $my_tutorial extends $.$my_tutorial {

		business() {
			return this.$.$mol_state_arg.value('business')
		}

		link(): string {
			return this.$.$mol_state_arg.value('link')
		}

		pages() {
			this.url(this.link());
			return [
				this.Main_page(),
				// ... (this.business() === 'hello world' ? [this.Main_page(),this.widget()] : []),
			]
		}

	}

}
