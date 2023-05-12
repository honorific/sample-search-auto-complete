import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import {useEffect, useState} from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users')
      setUsers(response.data.data)
    }
    loadUsers()
  }, [])

  const changeHandler = (text) => {
    setText(text)
  }

  return (
    <div className='container'>
      <input
        type='text'
        onChange={(e) => changeHandler(e.target.value)}
        value={text}
      />
    </div>
  )
}

export default App
