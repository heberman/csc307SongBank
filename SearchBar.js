import React, {useState} from 'react';

function Form(props) {
    const [query, setQuery] = useState(
        {
            val: '',
        }
    );

    function handleChange(event) {
        const { value } = event.target;
        setQuery({val: value});
    }

    function submitForm() {
        props.handleSubmit(query);
        setQuery({val: ''});
    }

    return (
        <form>
            <label htmlFor="Search">Search</label>
            <input
                type="text"
                name="search"
                id="search"
                value={query.val}
                onChange={handleChange} />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );

}
export default Form;