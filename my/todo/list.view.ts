namespace $.$$ {
	export class $my_list extends $.$my_list{
		@ $mol_mem
		data( next = [] as readonly any[] ) { 
			return next 
		}

        rows(){
			return this.data().map( ( task , index )=> this.Item_row( index ) )
		}

		label(index: number){
			return this.data()[index][this.labelAttr()];
		}
	}
}