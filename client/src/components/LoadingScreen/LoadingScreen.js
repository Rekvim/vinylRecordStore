import React from 'react'
import styled from 'styled-components'
import { PulseLoader } from 'react-spinners'

const LoadingOverlay = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9999;
`

const LoaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const LoadingText = styled.div`
	margin-top: 20px;
	color: #ffffff;
	font-size: 20px;
	font-weight: bold;
`

const LoadingScreen = ({ loading }) => {
	if (!loading) return null

	return (
		<LoadingOverlay>
			<LoaderWrapper>
				<PulseLoader size={15} color={'#ffffff'} />
				<LoadingText>Loading...</LoadingText>
			</LoaderWrapper>
		</LoadingOverlay>
	)
}

export default LoadingScreen
