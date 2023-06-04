import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import { md } from '../config/controls/responsive'

const MediumLoader = () => (
  <MediumLoaderContainer className='loader medium__loader'>
    <ContentLoader
      width={100}
      height={height}
      style={{ width: '100%' }}
      backgroundColor='#dfdfdf'
      foregroundColor='#d0d0d0'
      title='Loading media...'
    >
      {/* Only SVG shapes */}
      <rect x='0' y='0' width='35%' height='180' />
      <rect x='37%' y='10' rx='4' ry='4' width='45%' height='16' />
      <rect x='37%' y='37' rx='3' ry='3' width='30%' height='12' />
      <rect x='37%' y='58' rx='3' ry='3' width='15%' height='12' />
      <rect x='37%' y='78' rx='3' ry='3' width='60%' height='11' />
      <rect x='37%' y='98' rx='3' ry='3' width='60%' height='11' />
    </ContentLoader>
  </MediumLoaderContainer>
)

const height = 290
const mdHeight = 180
const lineMdX = '37%'
const lineMdYs = [10, 37, 58, 78, 98]
const MediumLoaderContainer = styled.div`
  height: ${height}px;
  margin-bottom: 1.25rem;
  overflow: hidden;

  clipPath rect:first-child { width: 100%; }
  ${lineMdYs.map((y, idx) => `clipPath rect:nth-child(${idx + 2}) {
    y: ${y + 180};
    x: 0;
  }`)}
  ${md(`
    height: ${mdHeight}px;
    clipPath rect:first-child { width: 35%; }
    ${lineMdYs.map((y, idx) => `clipPath rect:nth-child(${idx + 2}) {
      y: ${y};
      x: ${lineMdX};
    }`).join('\n')}
  `)}
`

export default MediumLoader
