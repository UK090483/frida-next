import classNames from 'classnames'
import useAnimationPresence from 'hooks/useAnimationPresence'
import useTweenCss from 'hooks/useTweenedCss'
import Link from 'next/link'

import { useRef, useState } from 'react'

const Page = () => {
  const [show, setShow] = useState(true)

  const refNode = useRef<HTMLDivElement>(null)
  useTweenCss({
    tween: show,
    refNode,
    done: () => {
      console.log('done')
    },
  })
  return (
    <div className="w-full h-screen bg-frida-pink flex flex-col justify-center items-center">
      <button
        onClick={() => {
          setShow((state) => !state)
        }}
      >
        Show
      </button>
      <div className=" w-60 h-60 bg-frida-red" ref={refNode}></div>

      <div>
        <Link href={'/a'} passHref>
          <a className=" p-4 mr-2 bg-frida-green">A</a>
        </Link>
        <Link href={'/b'} passHref>
          <a className=" p-4 mr-2 bg-frida-green">B</a>
        </Link>
        <Link href={'/c'} passHref>
          <a className=" p-4 mr-2 bg-frida-green">C</a>
        </Link>
      </div>
    </div>
  )
}

export default Page
