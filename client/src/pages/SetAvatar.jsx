import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utiles/APIRoutes'
import loader from '../assets/loader.gif'
import { setAvatartRouter } from '../utiles/APIRoutes'
import { TOAST_ERROR } from './Register'
import { Buffer } from 'buffer'

export const SetAvatar = () => {
  const api = `https://api.multiavatar.com/45678945`
  const navigate = useNavigate()

  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)
	const localstorageData= localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY)

	const checkLocalStorage = () => {
    if (!localstorageData) {
			navigate('/login')
		}	
	}
	useEffect(() => {
		checkLocalStorage()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  const setProfileImage = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatarr', TOAST_ERROR)
    } else {
      const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY))
      const { data } = await axios.post(`${setAvatartRouter}/${user._id}`, {
        image: avatars[selectedAvatar],
      })
      
			if (data.isSet) {
				user.isAvatarImageSet = true;
				user.avatarImage = data.image 
				localStorage.setItem(process.env.REACT_APP_LOCALHOSTKEY, JSON.stringify(user))
				navigate('/chat')
			} else {
				toast.error('Unable to create avatar image, please try again', TOAST_ERROR)
			}
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    const dataArray = []
    for (let i = 0; i < 3; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}?apikey=${process.env.REACT_APP_MULTIAVATAR_KEY}`,
      )
      const buffer = Buffer.from(image.data)
      // const buffer = new Buffer(image.data);
      dataArray.push(buffer.toString('base64'))
    }
    setAvatars(dataArray)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localstorageData])

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title">
            <h1>Picture an avatart as your profile image</h1>
          </div>
          <div className="avatars">
            {avatars?.map((avatar, idx) => (
              <div
                className={`avatar ${selectedAvatar === idx ? 'selected' : ''}`}
                key={idx}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  key={avatar}
                  onClick={() => setSelectedAvatar(idx)}
                />
              </div>
            ))}
          </div>
          <button className="submit-button" onClick={setProfileImage}>
            Set as profile image
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
	padding: 2rem; 
  disaplay: flex;
  height: 100vh;
  width: 100vw;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #131324;

  .loader {
    max-inline-size: 100%; 
		display: flex; 
		margin: 0 auto; 
  }
  .title {
    h1 {
      color: white;
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }
  }

  .avatars {
    display: flex;
    justify-content: center;
    gap: 2rem;
		padding: 2rem; 
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5rem;
      border: 0.1rem solid tranparent;
      padding: 1rem;
      transition: 0.2s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.2rem solid #430eff;
    }
  }
	.submit-button {
		position: relative;
		display: flex; 
		justify-content: center; 
		margin: 0 auto;
		padding: 1rem 1.3rem;
		color: white; 
		background-color: #321432;
		border: 1px solid red; 
		border-radius: 3rem; 
		margin-top: 3rem; 
		font-size: 1rem;
		text-transform: uppercase; 
		letter-spacing: 1px; 
		white-space: nowrap;
		transition: .5s ease-in-out;
		box-shadow: 0 10px 10px #123a10;
		&:hover {
			color: white; 
			background-color: #021432;
			box-shadow: 0 5px #201b12;
			border: 1px solid white; 
		}
		&:active {
			box-shadow: none;
			top: 3px;
		}
	}
`
