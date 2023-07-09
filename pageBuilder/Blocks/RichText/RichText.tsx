// @ts-ignore
import BlockContent from '@sanity/block-content-to-react'
import LinkMark from 'pageBuilder/Blocks/RichText/marks/link'
import React from 'react'
import Frida from '../../../components/Frida'
import ButtonPlug from './Plugs/ButtonPlug/ButtonPlug'
import EmbedPlug from './Plugs/EmbedPlug/EmbedPlug'

const pink = (props: any) => {
  return <span className="text-frida-pink">{props.children}</span>
}
const white = (props: any) => {
  return <span className="text-frida-white">{props.children}</span>
}
const frida = (props: any) => {
  return <Frida textColor={props.mark.color} text={props.children} />
}
const link = (props: any) => {
  return <LinkMark {...props.mark}>{props.children}</LinkMark>
}

const list = (props: any) => {
  return (
    <ul
      className={`${'list-disc'} list-outside pl-8 text-base-fluid pb-3 leading-[1.1em]`}
    >
      {props.children}
    </ul>
  )
}

const classes: { [k: string]: string } = {
  'custom-header-big': 'header-big',
  'custom-header-medium': 'header-medium',
  'custom-header-small': 'header-small',
  'custom-subHeader': 'subheader',
  normal: 'text-normal',
  'custom-small': 'text-small',
  'custom-xsmall': 'text-xsmall',
}

const BlockRenderer = (props: any) => {
  const { style = 'normal' } = props.node

  if (/^custom/.test(style) || style === 'normal') {
    return React.createElement(
      'p',
      { className: `${classes[style]}` },
      props.children
    )
  }

  if (style === 'blockquote') {
    return <blockquote>- {props.children}</blockquote>
  }

  return BlockContent.defaultSerializers.types.block(props)
}

const serializer = {
  list,
  types: {
    button: ButtonPlug,
    embed: EmbedPlug,
    block: BlockRenderer,
  },
  marks: {
    pink,
    white,
    frida,
    link,
  },
}

const RichText = (props: any) => {
  const isBlock = props._type === 'block'
  return (
    <BlockContent
      blocks={isBlock ? props : props.content}
      serializers={serializer}
    />
  )
}

export default RichText
