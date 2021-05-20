import React from 'react'
// import styled from 'styled-components'

type ProductHeroWrapProps = {
  children: React.ReactNode
}

const ProductHeroWrap: React.FC<ProductHeroWrapProps> = ({ children }) => {
  return (
    <div
      className={`relative pt-24 pb-14 md:flex md:h-screen bg-frida-white `}
      data-color={'white'}
    >
      {children}
    </div>
  )
}

// const Root = styled.div`
//   /* padding: 100px 0 60px 0; */

//   min-height: 800px;
//   @media ${({ theme }) => theme.device.laptop} {
//     display: flex;
//     height: calc(100vh - 130px);
//     height: 100vh;
//     padding: 100px 30px 30px 30px;
//   }
// `
export default ProductHeroWrap
