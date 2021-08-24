/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react'
import classNames from 'classnames'
type OptionProps = {
  name: string
  value: string
  selected: boolean
  active: boolean
  onClick: (value: string) => void
}

const Option: React.FC<OptionProps> = ({
  selected,
  name,
  active,
  onClick,
  value,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    if (selected && ref.current) {
      // ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selected])

  return (
    <div
      ref={ref}
      className={classNames(
        ` h-[40px] pl-4 flex items-center max-w-{300px}`,
        { 'bg-frida-pink text-frida-black': active },
        {
          'bg-black hover:bg-frida-pink text-frida-white hover:text-frida-black':
            !active,
        },
        {
          'select--option': selected,
        }
      )}
      role="option"
      aria-selected={active}
      onClick={() => onClick(value)}
    >
      <p className="p-0 truncate whitespace-nowrap"> {name}</p>
    </div>
  )
}
export default Option
