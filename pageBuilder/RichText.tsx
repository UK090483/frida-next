import React from "react"

// @ts-ignore
import BlockContent from "@sanity/block-content-to-react"
import Frida from "../components/Frida"
import EmbedPlug from "./Plugs/EmbedPlug"
import ButtonPlug from "./Plugs/ButtonPlug"

const pink = (props: any) => {
  return <span className="text-frida-pink">{props.children}</span>
}
const white = (props: any) => {
  return <span className="text-frida-white">{props.children}</span>
}
const frida = (props: any) => {
  return <Frida textColor={props.mark.color} text={props.children} />
}

const classes: { [k: string]: string } = {
  "custom-header-big": "text-3xl-fluid font-bold",
  "custom-header-medium": "text-2xl-fluid font-bold",
  "custom-header-small": "text-lg-fluid font-bold",
  "custom-subHeader": "text-base-fluid font-bold",
}

const BlockRenderer = (props: any) => {
  const { style = "normal" } = props.node

  if (/^custom/.test(style)) {
    return React.createElement(
      "p",
      { className: `${classes[style]}` },
      props.children
    )
  }

  if (style === "blockquote") {
    return <blockquote>- {props.children}</blockquote>
  }

  return BlockContent.defaultSerializers.types.block(props)
}

const serializer = {
  types: {
    button: ButtonPlug,
    embed: EmbedPlug,
    block: BlockRenderer,
  },
  marks: {
    pink,
    white,
    frida,
  },
}

const RichText = (props: any) => {
  const isBlock = props._type === "block"
  return (
    <BlockContent
      blocks={isBlock ? props : props.content}
      serializers={serializer}
    />
  )
}

export default RichText
