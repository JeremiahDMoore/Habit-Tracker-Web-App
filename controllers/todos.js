const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, motivation: req.body.motivation, userId: req.user.id, startdate: Date.now()})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{       
            try{
                await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                    $inc: {streak: 1},
                })
                console.log('Marked Complete')
                res.json('Marked Complete')
            }catch(err){
                console.log(err)
            }
        },
        
    //     try{
    //          Todo.findOneAndUpdate({ 
    //             _id: req.params.id
    //         }, {
    //               $inc: { 
    //                 streak: 1
    //             }
    //          }
    //         )             

    //         console.log('added one to streak ' + req.body.streak)
    //         res.json('added one foo ' + req.body.streak)
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    