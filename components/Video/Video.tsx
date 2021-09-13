/* eslint-disable react/display-name */
import dynamic from 'next/dynamic'
import type { IVideoProps } from './VideoElement'

const VideoElement = dynamic(() => import('./VideoElement'))

const Video: React.FunctionComponent<IVideoProps> = (props) => {
  return <VideoElement {...props}></VideoElement>
}

export default Video
