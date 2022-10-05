import useQueryParam from 'hooks/useQueryParam'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const { setParam } = useQueryParam({ router })

  // console.log(getParam('ran'))

  return (
    <div className="w-full h-screen  bg-frida-red flex flex-col justify-center items-center">
      <h1 className=" text-3xl ">B </h1>

      <div
        onClick={() => {
          setParam('ran', Math.random().toString())
        }}
        className=" p-4 mr-2 bg-frida-green"
      >
        B +ran
      </div>
      <div>
        <Link href={'/a'} passHref>
          <a className=" p-4 mr-2 bg-frida-green">A</a>
        </Link>
        <Link href={'/b'} passHref>
          <a className=" p-4 mr-2 bg-frida-green">B</a>
        </Link>
        {/* <Link href={`/b?ran=${Math.random()}`} passHref>
          <a className=" p-4 mr-2 bg-frida-green">B +ran</a>
        </Link> */}
        <Link href={'/c'} passHref>
          <a className=" p-4 mr-2 bg-frida-green">C</a>
        </Link>
      </div>
    </div>
  )
}

export default Page
