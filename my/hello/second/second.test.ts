namespace $.$$ {

    $mol_test({

        'Generating greeting message'() {

            const app = new $my_hello_second
            app.name('Jin')

            $mol_assert_equal(app.message(), 'Hello, Jin!')

        }

    })

}