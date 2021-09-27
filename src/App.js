import React , {useEffect, useState} from 'react';
import './App.css';
import {Button,FormControl,InputLabel,Input} from '@material-ui/core';
// import Todo from './Todo'*63

const getLocalItems=()=>{
  let list = localStorage.getItem('List');
  if(list){
    return JSON.parse(localStorage.getItem("List"));
  }
  else{
return[];
  }
  
}

function App() {

  const[todos,setTodos]= useState(getLocalItems())
  const[inputData,setInputData]=useState('');
  const [toogle,setToogle] = useState(true);
  const[isEditItem,setEditItem]=useState(null);
 
  

 const Storedata=(value)=>{
  //  localStorage.setItem("List",inputData);
  if(!inputData){
alert("please fill data")
  } 
  else if(inputData && !toogle)
{
setTodos(
  todos.map((todo)=>{
    if(todo.id === isEditItem ){
      return{...todo,name:inputData}
        }
        return todo;
  })
)
setToogle(true);
  setInputData('');
  setEditItem(null);
}
  else{
    const allInputData = {id:new Date().getTime().toString(),name:inputData}
    setTodos([...todos,allInputData]);
    setInputData('');// clear up the input after hitting enter or button
    value.preventDefault();// stop the refresh
  }
  
 }

useEffect(()=>{
localStorage.setItem("List",JSON.stringify(todos))
},[todos]);

//delete data
const deleteItem=(index)=>{
  const deleteData=todos.filter((todo)=>{
    return index !== todo.id;
  })
  setTodos(deleteData);
}

//edit data
const EditItem=(id)=>{
  let newEditItem = todos.find((todo)=>{
    return todo.id === id
  });
  setToogle(false)
  setInputData(newEditItem.name)
  setEditItem(id)
  
}
 

  return (
    <div className="App">
     <h1>  TODO MODEL TEST  </h1>

     <form>
 
     <FormControl>
         <InputLabel >ADD TODOs here</InputLabel>
         <Input value={inputData}
          onChange={(value) => setInputData(value.target.value)} />
      </FormControl>
       
      {
        toogle?<Button 
        disabled={!inputData} type='submit' onClick={Storedata} variant="containe" color="primary">
           Add Todo
           </Button>
           :
           <Button 
        disabled={!inputData} type='submit' onClick={Storedata} variant="contained" color="primary">
           update
           </Button>
      }

      

      {
            // <>
            //     <h2>{localStorage.getItem('List',JSON.stringify(todos))}</h2>
            // </>
    }



     </form>

     {todos.map((todo)=>{
       return (
         <div className="todos" key={todo.id}>
            <h1 >{todo.name}</h1>  
            <div className="delEdit">
              <Button className="deleteBtn"  onClick={() => deleteItem(todo.id)} >Delete</Button> 
          
              <Button className="editBtn" onClick={()=> EditItem(todo.id)} >Edit</Button>
           </div>
         </div>
               
     )})}
    
    </div>
  );
}

export default App;