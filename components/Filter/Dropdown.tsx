import * as React from 'react'

type Item = { name: string; value: string }
interface IDropdownProps {
  label: string | React.ReactElement
  items: { name: string; value: string }[]
  onClick: ({}: Item) => void
}

const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  label,
  items,
  onClick,
}) => {
  return (
    <div className="relative w-72 mb-14  group mx-2">
      <div className="absolute top-0 left-0 text-frida-white text-sm-fluid  w-full  transition-zIndex delay-300  group-hover:z-10">
        <div className="bg-frida-black rounded-t-full h-5  transition-all duration-200 w-full"></div>
        <div className="bg-frida-black max-h-0 h-5 group-hover:max-h-10  transition-all duration-200 w-full"></div>

        <ul
          className={` max-h-0  group-hover:max-h-96 text-gray-700  bg-frida-black  transform transition-all  duration-200 ${
            items.length > 9 ? 'overflow-y-scroll' : 'overflow-hidden'
          } `}
        >
          {items.map((item) => (
            <li
              key={item.value}
              onClick={() => onClick(item)}
              className="text-sm-fluid py-3 px-3 bg-frida-black opacity-0 group-hover:opacity-100 transition-opacity delay-200"
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="bg-frida-black  group-hover:max-w-full rounded-b-full h-5  transition-all duration-200 w-full"></div>
      </div>

      <div className="bg-transparent text-frida-white w-full absolute top-0 h-10 flex justify-center items-center transition-zIndex delay-300 group-hover:z-10">
        {label}
      </div>
    </div>
  )
}

export default Dropdown
