import React from 'react'
import styled from 'styled-components'
import { BiPowerOff } from 'react-icons/bi'
import axios from 'axios'
import { logoutRoute } from '../utiles/APIRoutes'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const id = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY))._id
    const data = await axios.post(`${logoutRoute}/${id}`)

    if (data.status === 200) {
      localStorage.clear()
      navigate('/login')
    }
  }

  return (
    <Container>
      <button onClick={handleClick}>
        <BiPowerOff />
      </button>
    </Container>
  )
}

const Container = styled.div`
  button {
    padding: 0.8rem 1.2rem;
    background-color: #9a86f3;
    color: white;
    border-radius: 10px;
    border: none;
		align-items: center;

    font-size: 1rem;
    letter-spacing: 1px;
		svg {
			color: #ebe7ff;
			font-size: 1.3rem;
		}
    &:hover {
      cursor: pointer;
    }
  }
	
`
