import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//...<<<--- 1. CONTACT MANAGER APP --->>>......//

function AddPersonForm(props){
    const [person,setPerson] = useState("");
    
    function handleChange(e) {
    setPerson(e.target.value);}
    
    function handleSubmit(e) {
        if (person !==""){
        props.appendName(person);
        setPerson("");}
        e.preventDefault();}

    return (
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Add new contact" onChange={handleChange} 
            value={person} />
            <button type="submit">Add</button>
            </form>
            );
}

function ListPeople(props){
    const arr = props.data;
    const listItems = arr.map((val,index) => 
        <li key={index}>{val}</li>);
return <ul>{listItems}</ul>;
}

function ContactManager(props){
    const [contacts, setContacts] = useState(props.data);

    function AddPerson(name){
        setContacts([...contacts,name]);
    }
    return <div>
        <AddPersonForm appendName={AddPerson} />
        <ListPeople data={contacts} />
    </div>;
}  

var initContacts = ["Ahmed Ali","Omer Basha","Ibrahim Gaber"]; 

const elm = <ContactManager data={initContacts} />;
//const elm2 = <h1>Hello, Welcome to: <i>React</i></h1>;
ReactDOM.render(
    elm,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//--------------------------------------------------------------------//

// <<<---- 2. COUNTER APP ---->>>> //
// define the Action Creator function
function incrementCounter(num){
    return {
        type: 'INCREMENT',
        num: num
    }
}

const initState = {
    count: 0};
// define the Reducer function
function reducer(state = initState,action){
    switch(action.type){
        case 'INCREMENT':
        return {count: state.count + action.num}
        default:
            return state;
    }
}
//define the component to access the Store
function Counter(props){
    function handleClick(){
        props.incrementCounter(1);
    }
    return <div>
        <p>{props.count}</p>
        <button onClick={handleClick}>Increment</button>
    </div>; }

function mapStateToProps(state){
    return {count: state.count};}
const mapDispatchToProps = {incrementCounter};

// define the Store 
const store = createStore(reducer);

// calling the Connect function
const Func = connect(mapStateToProps,mapDispatchToProps)(Counter);
// deine the element to be rendered on the page
const ele = <Provider store={store}> <Func /> </Provider>;
//ReactDOM.render(ele, document.getElementById("root2"));