import React from 'react'
import Medium from './Medium'
import styled from 'styled-components'

const MediumList: React.FC = () => (
  <MediumListContainer>
    <Medium
      name='Oppenheimer - Official Behind the Scenes Clip (2023) Cillian Murphy, Emily Blunt'
      description='Join members of the cast and crew for a behind-the-scenes look at Oppenheimer and the process of shooting the film for IMAX.Oppenheimer is an upcoming movie ...'
      url='https://www.youtube.com/watch?v=G0uK0Np249g&ab_channel=IGN'
      userEmail='test@example.com'
    />
  </MediumListContainer>
)

const MediumListContainer = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export default MediumList
