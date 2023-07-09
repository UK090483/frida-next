import React from 'react'
import { contrastColor } from 'contrast-color'

const Swatch = ({ label, color }: { label: string; color: any }) => {
  if (!color) return null

  return (
    <div
      className="swatch"
      aria-label={label}
      style={{
        //@ts-ignore
        '--swatchColor': color?.hex,
        '--swatchBorder': color?.hex
          ? contrastColor({ bgColor: color?.hex })
          : null,
      }}
    />
  )
}

export default Swatch
