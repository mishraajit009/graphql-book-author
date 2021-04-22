import React from 'react'
import { graphql } from '@apollo/client/react/hoc';
import {getBookQuery} from '../queries/queries';


const BookDetail = (props)=>{
    const displayBookDetails = ()=>{
        const {book}= props.data
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All Book By this author</p>
                    <ul className="other-books">
                        {
                            book.author.books.map(b=>{
                                return <li key={b.id}>{b.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
        else{
            return(
                <div>
                    No Book Selected
                </div>
            )
        }
    }
    console.log(props)
    return(
        <div id="book-details">
             {displayBookDetails()}
        </div>
    );
}

export default graphql(getBookQuery,{
    options: (props)=>{
       return {variables:{
                id:props.bookId
            }
        }
    }
})(BookDetail)