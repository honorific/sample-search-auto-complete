import logo from './logo.svg'
import './App.css'
import './custom.css'
import axios from 'axios'
import {useEffect, useState} from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users')
      setUsers(response.data.data)
    }
    loadUsers()
  }, [])

  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([])
  }

  const changeHandler = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, 'gi')
        return user.email.match(regex)
      })
    }
    console.log('matches', matches)
    setSuggestions(matches)
    setText(text)
  }

  return (
    <div className='container'>
      <input
        className='col-md-12'
        style={{marginTop: '10px'}}
        type='text'
        onChange={(e) => changeHandler(e.target.value)}
        value={text}
        //if we dont add the setTimeout the result will not be chosen
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([])
            //didn't work with 100
          }, 300)
        }}
      />
      {suggestions &&
        suggestions.map((suggestion, i) => {
          return (
            <div
              key={i}
              className='suggestion col-md-12 justify-content-md-center'
              onClick={() => onSuggestHandler(suggestion.email)}
            >
              {suggestion.email}
            </div>
          )
        })}
    </div>
  )
}

export default App
