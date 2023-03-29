import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Logout } from './Logout'
import { ChatInput } from './ChatInput'
import axios from 'axios'
import { messageRoute } from '../utiles/APIRoutes'
import { v4 as uuid4 } from 'uuid'

export const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([])
  const [recievedMessage, setRecievedMessage] = useState(null)
  const scrollRef = useRef()

  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY))
  const getMessages = async () => {
    if (currentChat) {
      const { data } = await axios.post(`${messageRoute}/get`, {
        from: currentUser._id,
        to: currentChat._id,
      })
      setMessages(data)
    }
  }
  console.log(messages[0], 'are these messages god o?')
  useEffect(() => {
    if (currentChat) {
      getMessages()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSendMessage = async (message) => {
    const { data } = await axios.post(`${messageRoute}/add`, {
      message,
      from: currentUser?._id,
      to: currentChat?._id,
    })
    socket.current.emit('send-message', {
      to: currentChat._id,
      from: currentUser._id,
      message,
    })
  
    const msgs = [...messages]
    msgs.push({ fromSelf: true, message: message })
    setMessages(msgs)
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on('message-recieved', (message) => {
        setRecievedMessage({ fromSelf: false, message })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    recievedMessage && setMessages((prev) => [...prev, recievedMessage])
  }, [recievedMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [messages])

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="Avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      {/* <div className="chat-messages"></div> */}
      <div className="chat-messages">
        {messages?.map((message, idx) => (
          <div key={uuid4()} ref={scrollRef}>
            <div
              className={`message ${message.fromSelf ? 'sender' : 'recieved'}`}
            >
              {console.log(message)}
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    align-items: center;
    padding: 0.5rem 2rem;
    justify-content: space-between;
    .user-details {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      .avatar {
        img {
          height: 5rem;
        }
      }
      .username {
        h3 {
          font-size: 10px;
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    color: white;
    display: flex;
    flex-direction: column;

    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #ffff;
        width: 0.2rem;
        border-radius: 2rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem;
        font-size: 1.4rem;
        border-radius: 1rem;
        color: white;
      }
    }
    .sender {
      justify-content: flex-end;
      .content {
        background-color: #9f04ffa1;
        padding: 1rem;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #2114ffa1;
        padding: 1rem;
      }
    }
  }
`
