const graphql =require("graphql");
const _ = require('lodash')
const Book =  require('../models/book')
const Author = require('../models/author')

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,

} = graphql;

var books=[
    {name:'Name of the Wind', genre:'Fantasy', id:'1',authorId:'1'},
    {name:'The Final empire', genre:'Fantasy', id:'2',authorId:'2'},
    {name:'The Long Earth', genre:'Sci-Fi', id:'3',authorId:'3'},
    {name:'The Hero', genre:'Sci-Fi', id:'4',authorId:'2'},
    {name:'Marketing Management', genre:'Managment', id:'5',authorId:'2'},
    {name:'Rich Dad Poor Dad', genre:'Sci-Fi', id:'6',authorId:'1'},
];

var author=[
    {name:'Ajit Mishra',age:24,id:'1'},
    {name:'Brandon Sanderson',age:42,id:'2'},
    {name:'Dhoni',age:45,id:'3'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorId:parent.id})
            }
        }
    })
})

const RootQuery= new GraphQLObjectType({
    name:'RooTQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
            // return _.find(author,{id:args.id});
            return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
              //return books
              return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
            //   return author
            return Author.find({});
            }
        }
    }
});
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author= new Author({
                    name:args.name,
                    age: args.age
                });
                return author.save()
            },
        
        },
        addBook:{
            type:BookType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},  
                genre:{type: new GraphQLNonNull(GraphQLString)},
                authId:{type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre: args.genre,
                    authorId: args.authId
                });
            return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})