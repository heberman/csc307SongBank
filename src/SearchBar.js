import React, {useState} from 'react';
//import './index.css';

function Form(props) {
    const [query, setQuery] = useState(
        {
            val: '',
        }
    );

    function handleChange(event) {
        const { value } = event.target;
        setQuery({val: value});
        console.log(value.val);
    }

    function submitForm() {
        props.handleSubmit(query);
        setQuery({val: ''});
    }


    return (
        <form>
            <label htmlFor="Search"><b>Search</b></label>
            <input
                type="text"
                name="search"
                id="search"
                value={query.val}
                onChange={handleChange}/>
            <input type="button" value="Submit" onClick={submitForm} />
            <label id="searchResult"></label>
            {/* <Link to="/play"><button style={{display: 'none'}} id="play-button">Play</button></Link> */}
        </form>
    );
}

export default Form;