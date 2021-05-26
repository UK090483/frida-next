import React from 'react'
// @ts-ignore
import BlockContent from '@sanity/block-content-to-react'
import Frida from '../components/Frida'
import EmbedPlug, { embedPlugQuery } from './Plugs/EmbedPlug'
import ButtonPlug, { buttonPlugQuery } from './Plugs/ButtonPlug'
import { imagePlugQuery } from './Plugs/ImagePlug'
import { PageBuilderBlockBase } from '@lib/queries/pageBuilderQueries'

export const richTextQuery = `
content[]{
  ...,
  ${buttonPlugQuery},
  ${embedPlugQuery},
  ${imagePlugQuery}
}
`

export interface RichTextQueryResult extends PageBuilderBlockBase {
  _type: 'richText'
  content: any[]
}

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
  const isBlock = props._type === 'block'
  return (
    <BlockContent
      blocks={isBlock ? props : props.content}
      serializers={serializer}
    />
  )
}

export default RichText
