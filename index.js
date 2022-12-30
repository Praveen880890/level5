const { connect } = require("./connectDB.js");
const Todo = require("./Todomodel.js");
const createTodo =async() => {
    try{
        await connect();
        const todo = await Todo.addTask({
            title: "Third item",
            dueDate: new Date(),
            completed: false,
        });
        console.log("Created todo with Id : %i ",todo.id);
    }
    catch (error){console.error(error);}
};
const countitem =async() => {
    try{
        const totalCount = await Todo.count();
        console.log("Found %i items in table ",totalCount);
    }
    catch (error){console.error(error);}
};
const getAllTodos =async() => {
    try{
        const todos = await Todo.findAll();
        const todoList= todos.map(todo => todo.displayableString()).join("\n");
        console.log(todoList);
    }
    catch (error){console.error(error);}
};
const getOneTodo =async() => {
    try{
        const todo = await Todo.findOne();
        console.log(todo.displayableString());
    }
    catch (error){console.error(error);}
};
const updateItem =async(id) => {
    try{
        await Todo.update({completed:true},{
            where:{
                id:id
            }
        })
    }
    catch (error){console.error(error);}
};

const deleteItem =async(id) => {
    try{
       const deletedRowCount= await Todo.destroy({
            where:{
                id:id
            }
        })
        console.log("deleted row is "+deletedRowCount);
    }
    catch (error){console.error(error);}
};
(async()=>{
   // await createTodo();
  // await countitem();
  await deleteItem(3);
  await getAllTodos();
//   await updateItem(2);
//   await getOneTodo();
})();