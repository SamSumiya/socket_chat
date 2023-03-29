import { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

export const ChatInput = ({ handleSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState('')

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (event, emojiObject) => {
    let msg = message
    msg += emojiObject.emoji
    setMessage(msg)
  }

  const sendChat = (event) => {
    event.preventDefault()

    if (message.length > 0) {
      handleSendMessage(message)
      setMessage('')
    }
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 90%;
  background-color: #080429;
  gap: 1rem;
  padding: 0 3rem;

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 2.3rem;
        color: #e6c116;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -355px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #91a6f3;
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #91a6f3;
          color: white;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 10px;
        &-thumb {
          background-color: #501093;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 100%;
      background-color: transparent;
      border: none;
      color: white;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.8rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 1.8rem;
        color: white;
      }
    }
  }
`
