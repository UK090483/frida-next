import React from 'react'

const pinkIcon = () => <span style={{ color: '#f5c5d9' }}>P</span>
const pinkRender = props => (
  <span style={{ color: '#f5c5d9' }}>{props.children}</span>
)
const whiteIcon = () => (
  <span style={{ color: 'white', backgroundColor: 'black' }}>W</span>
)
const whiteRender = props => (
  <span style={{ color: 'white', backgroundColor: 'black' }}>
    {props.children}
  </span>
)

const Button = props => {
  return <span>{props.label}</span>
}

const getStyle = (fs, mb, bold) => {
  return {
    style: {
      fontSize: (30 / 50) * fs,
      marginTop: 0,
      marginBottom: `${mb || 1}rem`,
      fontWeight: bold ? '700' : '400',
      lineHeight: '1em'
    }
  }
}

export default {
  name: 'defaultRichText',
  type: 'array',
  title: 'Text',

  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        {
          title: 'Normal',
          value: 'normal',
          blockEditor: {
            render: props => (
              <p {...getStyle(30, 0.5, false)}>{props.children}</p>
            )
          }
        },
        {
          title: 'Header-big',
          value: 'custom-header-big',
          blockEditor: {
            render: props => (
              <p {...getStyle(100, 0.5, true)}>{props.children}</p>
            )
          }
        },
        {
          title: 'Header-medium',
          value: 'custom-header-medium',
          blockEditor: {
            render: props => (
              <p {...getStyle(80, 0.5, true)}>{props.children}</p>
            )
          }
        },
        {
          title: 'Header-small',
          value: 'custom-header-small',
          blockEditor: {
            render: props => (
              <p {...getStyle(50, 0.5, true)}>{props.children}</p>
            )
          }
        },
        {
          title: 'SubHeader',
          value: 'custom-subHeader',
          blockEditor: {
            render: props => (
              <p {...getStyle(30, 0.5, true)}>{props.children}</p>
            )
          }
        },

        {
          title: 'Small',
          value: 'custom-small',
          blockEditor: {
            render: props => (
              <p {...getStyle(20, 0.2, false)}>{props.children}</p>
            )
          }
        },
        {
          title: 'xSmall',
          value: 'custom-xsmall',
          blockEditor: {
            render: props => (
              <p {...getStyle(16, 0.1, false)}>{props.children}</p>
            )
          }
        }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Underline',
            value: 'underline'
          },

          {
            title: 'Pink',
            value: 'pink',
            blockEditor: { icon: pinkIcon, render: pinkRender }
          },
          {
            title: 'white',
            value: 'white',
            blockEditor: { icon: whiteIcon, render: whiteRender }
          }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              // {
              //   title: 'Internal link',
              //   description: 'Use this to link between pages on the website',
              //   name: 'internalLink',
              //   type: 'reference',
              //   to: [
              //     { type: 'indexPage' },
              //     { type: 'page' },
              //     { type: 'artwork' },
              //     { type: 'artist' }
              //   ]
              // },
              {
                title: 'External link',
                name: 'link',
                type: 'url'
              },
            ],
            blockEditor: {
              icon: () => 'Hyper',
              render: props => {
                return (
                  <a style={{textDecoration:'underline', color:'red'}}>
                      {props.children}
                    
                  </a>
                )
              }
            }
          },
          {
            name: 'frida',
            type: 'object',
            title: 'Frida',
            fields: [
              {
                title: 'Color',
                name: 'color',
                type: 'string',
                options: {
                  list: [
                    { title: 'White', value: 'white' },
                    { title: 'Pink', value: 'pink' }
                  ],
                  layout: 'radio'
                }
              }
            ],
            blockEditor: {
             
              render: props => {
                return (
                  <span>
                    Meet
                    <span style={{ textDecoration: 'underline' }}>
                      {props.children}
                    </span>
                  </span>
                )
              }
            }
          }
        ]
      }
    },
    { type: 'button', blockEditor: { render: Button } },
    { type: 'embed' },
    { type: 'imagePlug' },
    { type: 'seoHeader' },
    { type: 'imageGalleryPlug' },
    { type: 'innerSection' },
    { type: 'spacer' },
    { type: 'download' }
  ]
}
