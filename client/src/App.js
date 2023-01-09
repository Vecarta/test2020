import './App.css';
import {useState} from "react"; // importamos use state para setar as textfilds
import Axios from "axios";

function App() {
  const [name, setName] = useState(""); // setar as textfields
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0); // setar textfield para update

  const [employeeList, setEmployeeList] = useState([]); // setar elemento para imprimir os dados


  const Insertusers = () => { // Metodo butao para enviar dados BD
    Axios.post('http://localhost:3001/create', {name: name, age: age, position: position, country: country, wage: wage})
    .then(()=> {
      console.log("Insert successfully");
      setEmployeeList([...employeeList,{ // listar o elemento na tabela depois de insert
        name: name, age: age, position: position, country: country, wage: wage,
      },
    ])
    
    })
     
  }

  const getEmployees = () => {  // Metodo que busca os dados na tela
    Axios.get('http://localhost:3001/employee').then((Response) => {
      setEmployeeList(Response.data)
    })

  }

  const updateEmployeeWage = (id) => { // Metodo atualizar 
    Axios.put('http://localhost:3001/update', {wage: newWage, id: id}).then((response)=> {
      alert("Update")
      getEmployees() // listar o valor atualizado
      console.log("update Sucessfuly")
    })


  }

  const deleteEmployee = (id) => { // Metodo que faz delete 
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=> {
      alert("Values deleted")
      getEmployees() // listar o valor atualizado
      console.log("update Sucessfuly")
    })

  }


  return (
  <div>
    <div className="information">
   <label>Nome: </label>
   <input type="text" onChange={(event) => {setName(event.target.value);}}/>
   <label>Age: </label>
   <input type="number" onChange={(event) => {setAge(event.target.value);}}/>
   <label>Position: </label>
   <input type="text" onChange={(event) => {setPosition(event.target.value);}}/>
   <label>Country: </label>
   <input type="text" onChange={(event) => {setCountry(event.target.value);}}/>
   <label>wage: </label>
   <input type="number" onChange={(event) => {setWage(event.target.value);}}/>
   <button onClick={Insertusers} > Add Imployee </button>
   </div>
   <hr/>
    <div className='employees'>
   <button onClick={getEmployees}>Show Employees</button>

   {employeeList.map((val, key) => { //Mostrar os dados na tela vindo na bd mysql
   return(
    <div className='employee'> 
     <div>
    <h3>Name: {val.name}</h3> 
    <h3>Age: {val.age}</h3> 
    <h3>Country: {val.country}</h3> 
    <h3>Position: {val.position}</h3> 
    <h3>Wage: {val.wage}</h3> 
     </div>
    <div> 
      <input type="text" placeholder='update wage' onChange={(event) => {setNewWage(event.target.value);}} />
      <button onClick={()=>{updateEmployeeWage(val.id)}}>Update</button>
      <button onClick={()=>{deleteEmployee(val.id)}}>Delete</button>
    </div>
    
    </div>
   )

   })}

    </div>
    
  </div>
  
  );
}

export default App;
