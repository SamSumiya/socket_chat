import React, { useEffect, useRef, useState } from 'react'
import { allContactsRoute, host } from '../utiles/APIRoutes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Contacts } from '../components/Contacts'
import styled from 'styled-components'
import { Welcome } from '../components/Welcome'
import { ChatContainer } from '../components/ChatContainer'
import { io } from 'socket.io-client'

export const Chat = () => {
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const navigate = useNavigate()

  
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY)) {
      navigate('/login')
    }
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY))
    setCurrentUser(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit('add-user', currentChat?._id)
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        getContactsData()
      } else {
        navigate('/avatar')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  const getContactsData = async () => {
    if (currentUser) {
      if (currentUser) {
        const { data } = await axios.get(
          `${allContactsRoute}/contacts/${currentUser?._id}`,
        )
        setContacts(data)
      }
    }
  }

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts.users}
            currentUser={currentUser}
            handleChatChange={handleChatChange}
          />
          {currentChat ? (
            <ChatContainer currentChat={currentChat} socket={socket} />
          ) : (
            <Welcome />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85%;
    width: 85%;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-column: 35% 65%;
    }
  }
`
