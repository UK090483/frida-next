import React from 'react'
import { mouseLinkProps } from '../../generic/Mouse/mouseRemote'

function BigButtons() {
  return (
    <div className={`flex flex-wrap md:flex-nowrap`} {...mouseLinkProps}>
      <BigButton
        label={'Instagram'}
        link={'https://www.instagram.com/meetfrida.art/'}
      ></BigButton>
      <BigButton
        label={'Facebook'}
        link={'https://www.facebook.com/meetfrida.art'}
      ></BigButton>
    </div>
  )
}

type BigButtonProps = {
  label: string
  link: string
}

const BigButton: React.FC<BigButtonProps> = ({ label, link }) => {
  return (
    <a
      className="flex justify-center items-center h-36 w-full text-xl-fluid bg-frida-red text-frida-white hover:text-frida-black font-bold text-fill-bigButton hover:bg-frida-pink "
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      {label}
    </a>
  )
}

// const Root = styled.div`
//   width: 100%;
//   max-width: 100vw;
//   display: flex;
//   flex-wrap: wrap;
//   background-color: ${({ theme }) => theme.colors.red};
//   transition: background-color 0.3s;
//   @media ${({ theme }) => theme.device.tablet} {
//     flex-wrap: nowrap;
//   }
// `
// const Button = styled.a`
//   height: 140px;
//   width: 100%;
//   height: 80px;
//   background-color: ${({ theme }) => theme.colors.red};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 2rem;
//   color: white;
//   font-weight: 800;
//   text-decoration: none;
//   cursor: none;

//   :hover {
//     transition: background-color 0.3s;
//     background-color: ${({ theme }) => theme.colors.pink};
//     -webkit-text-fill-color: transparent;
//     -webkit-text-stroke-color: ${({ theme }) => theme.colors.black};
//     -webkit-text-stroke-width: 0.03em;
//   }
//   @media ${({ theme }) => theme.device.laptop} {
//     font-size: 4rem;
//     width: 50%;
//     height: 160px;
//   }
// `
export default BigButtons
