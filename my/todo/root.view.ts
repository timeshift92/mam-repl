interface TodoItem {
	active: boolean;
	label: string;
	id:number;
}

namespace $.$$ {
	export class $my_root extends $.$my_root {
		@ $mol_mem
		data(next?: null, force?: $mol_mem_force_update):TodoItem[]{
			return $mol_fetch.json("http://localhost:3000/todos");
		}
		sub() {
			const page = $mol_state_arg.value('page');
			return [ this.Name(),
				this.add(),
				this.active_page_link(),
				this.finished_page_link(),
				!page || page === 'active' ? this.ActiveTasksList() : this.FinishedTasksList()
			] as readonly any[]
		}
		@ $mol_mem
		activeItems() { 
			return this.data().filter(item=> item.active);
		}

		@ $mol_mem
		finishedItems() { 
			return this.data().filter(item=> !item.active);
		}

		addTodoItem(){
			$mol_fetch.json("http://localhost:3000/todos", {
				method: 'POST',
				headers : {
					'content-type' : 'application/json' ,
				} ,
				body:JSON.stringify({
					label: this.name(),
					active: true
				})
			})
			this.data(null, $mol_mem_force_update);
			this.name("");
		}

		submit(event: KeyboardEvent){
			if (event.key === 'Enter'){
				this.addTodoItem();
			}
		}

		isAddEnabled(){
			return this.name()
		}

		patchTodoAndRefresh(id:number, data: Partial<TodoItem>){
			$mol_fetch.json(`http://localhost:3000/todos/${id}`,{
				method: "PATCH",
				body: JSON.stringify(data),
				headers:{
					'content-type' : 'application/json'
				}
			})
			this.data(null, $mol_mem_force_update);
		}

		restoreItem(index: number){
			const item: TodoItem = this.finishedItems()[index];
			this.patchTodoAndRefresh(item.id, {active: true})
		}

		deleteTodoItem(index: number){
			const item: TodoItem = this.activeItems()[index];
			this.patchTodoAndRefresh(item.id, {active: false})
		}
	}
}
