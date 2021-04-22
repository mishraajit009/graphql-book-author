import { gql } from '@apollo/client';
const getAuthorsQuery=gql`
{
    authors{
        name
        id
    }
}
`


const getBooksQuery =gql`
{
    books{
        name
        id
    }
}`

const addBookMutation = gql`
mutation($name:String!,$genre: String!, $authId:ID!) {
    addBook(name:$name,genre:$genre,authId:$authId){
        name
        id
    }
}
`
const getBookQuery =gql`
    query($id:ID){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`

export {getAuthorsQuery,getBooksQuery,addBookMutation,getBookQuery}