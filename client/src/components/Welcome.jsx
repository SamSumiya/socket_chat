import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

export const Welcome = () => {
	const currentUser = localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY)
	
	return (
		<Container>
			<img src={Robot} alt="Robot" />
			<h2>Welcome, <span> { currentUser?.username}</span></h2>
			<h3>Please find a perfon to start chatting!</h3>
		</Container>
	)
}


const Container = styled.div`
	display: flex; 
	justify-content: center; 
	flex-direction: column;
	align-items: center; 
	img {
		height: 23rem; 
	}
	h2 {
		color: white; 
		span {
			color: #4e0eff;
		}
	}
	h3 {
		color: #999; 
	}
`
