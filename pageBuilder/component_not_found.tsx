import React from "react"
type ComponentNotFoundProps = {
  type: string
}
const ComponentNotFound: React.FC<ComponentNotFoundProps> = props => (
  <div>Component {props.type} is not defined. Add it to components.js</div>
)

export default ComponentNotFound
