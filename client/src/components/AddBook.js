import React,{useState} from 'react'
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import {getAuthorsQuery,addBookMutation,getBooksQuery} from '../queries/queries';
import {flowRight as compose} from 'lodash';

const AddBooks = (props)=>{

    const [name,setName]=useState('');
    const [genre,setGenre]=useState('');
    const [authId,setauthId]=useState('');
    //console.log(props)

    const displayAuthors=()=>{
       
        var data= props.getAuthorsQuery;
       // console.log(data)
         if(data.loading){
               return <option>Loading...</option>
            }
        else{
                return data.authors.map(a  =>{
                return (<option key={a.id} value={a.id}>{a.name}</option>);
            })
        }
    }

    const submitForm=(e)=>{
        e.preventDefault();
       // console.log(name,genre,authId)
       props.addBookMutation({
           variables:{
                name: name,
                genre: genre,
                authId: authId,
           },
           refetchQueries:[{query: getBooksQuery}]
       });
    }
return(
<form id="add-body" onSubmit={submitForm}>
    <div className="field">
        <label>Book Name</label>
        <input type="text" onChange={(e)=>setName(e.target.value)}/>
    </div>
    <div className="field">
        <label>Genre</label>
        <input type="text" onChange={(e)=>setGenre(e.target.value)}/>
    </div>
    <div className="field">
        <label>Author</label>
        <select onChange={(e)=>setauthId(e.target.value)}>
            <option>Select Author</option>
            {displayAuthors()}
        </select>
    </div>
    <button>+</button>

</form>
);
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBooks)