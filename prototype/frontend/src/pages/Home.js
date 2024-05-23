import { useEffect, useState } from "react";



const Home = () =>{
    const [users, setUsers] = useState(null);

    useEffect(()=>{
        const fetchUsers = async ()=>{
            const response = await fetch('http://localhost:5001/api/user')
            const json = await response.json();

            if(response.ok){
                setUsers(json);
            }
        }
        fetchUsers()
    }, [])
    return(
        <div className="home">
            <h1>Users List</h1>
            <div className="users">
                <ol>
                {users && users.map((user)=>(
                    <li key={user._id}>{user.firstName}</li>
                ))}
                </ol>
            </div>
        </div>
    )
}
export default Home;