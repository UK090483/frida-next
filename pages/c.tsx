import Link from 'next/link'

const Page = () => {
  return (
    <div className="w-full h-screen bg-frida-green flex flex-col justify-center items-center">
      <h1 className=" text-3xl ">C </h1>
      <div>
        <Link href={'/a'} passHref>
          <a className=" p-4 mr-2 bg-frida-pink">A</a>
        </Link>
        <Link href={'/b'} passHref>
          <a className=" p-4 mr-2 bg-frida-pink">B</a>
        </Link>
        <Link href={'/c'} passHref>
          <a className=" p-4 mr-2 bg-frida-pink">C</a>
        </Link>
      </div>
    </div>
  )
}

export default Page
