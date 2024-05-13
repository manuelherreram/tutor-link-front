
import { Formik, Field, Form } from 'formik';
import './Search.css';   

const Search = () => {

    return (
        <div className="container-search">
            <Formik
                initialValues={{
                    search: ''
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
                >
                <Form className='form-search'>
                    <label htmlFor="search"></label>
                    <Field id="search" name="search" placeholder="¿Qué quieres aprender el día de hoy?" />
                    <button className="search-button" type="submit">Buscar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Search;