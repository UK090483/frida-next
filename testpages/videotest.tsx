import * as React from 'react'
import Video from '@components/Video/Video'

const VideoTest: React.FunctionComponent = () => {
  return (
    <div className="flex">
      <div className="w-1/2 p-10 border hero border-frida-red">
        <Video
          fit="contain"
          assetDocument={testvideo}
          className="w-full h-full"
          loop
        />
      </div>

      <div className="w-1/2 p-10 mx-auto border hero border-frida-green">
        <Video
          fit="contain"
          assetDocument={videotestlandscape}
          className="w-full h-full"
          loop
        />
      </div>
    </div>
  )
}

export default VideoTest

const testvideo = {
  _createdAt: '2021-09-08T07:29:31Z',
  _id: '195e1e3a-b577-409c-a795-f1c53f093dbf',
  _rev: 'THRrv4NYljZwIXhAJiTjMZ',
  _type: 'mux.videoAsset',
  _updatedAt: '2021-09-08T07:29:52Z',
  assetId: '6bM6RW1jrdRgq00zpoFASJ02ND02981CYSstX8Jgmg6CzI',
  data: {
    aspect_ratio: '53:64',
    created_at: '1631086180',
    duration: 3.570233,
    id: '6bM6RW1jrdRgq00zpoFASJ02ND02981CYSstX8Jgmg6CzI',
    master_access: 'none',
    max_stored_frame_rate: 29.97,
    max_stored_resolution: 'UHD',
    mp4_support: 'none',
    non_standard_input_reasons: {
      video_resolution: '3142x3796',
    },
    passthrough: '195e1e3a-b577-409c-a795-f1c53f093dbf',
    playback_ids: [
      {
        id: 'm1weLb881V5Vp0202k00FBPBgbfLe3oPMrzgwHm55Ety3E',
        policy: 'public',
      },
    ],
    status: 'ready',
    test: true,
    tracks: [
      {
        duration: 3.570233,
        id: 'ols1JHe5fNOKeZIvFvZWkQMGqIo200x5l201BHetDyqRQ',
        max_frame_rate: 29.97,
        max_height: 2048,
        max_width: 1696,
        type: 'video',
      },
    ],
    upload_id: 'coE8geRBv02LxydphxyYlWx8e6ev5MxHzi01Qer00Z93GI',
  },
  playbackId: 'm1weLb881V5Vp0202k00FBPBgbfLe3oPMrzgwHm55Ety3E',
  status: 'ready',
  uploadId: 'coE8geRBv02LxydphxyYlWx8e6ev5MxHzi01Qer00Z93GI',
}

const videotestlandscape = {
  _createdAt: '2021-09-07T16:39:48Z',
  _id: '3d160653-8c2b-46d8-b433-ae660dc70fba',
  _rev: '16V2helLsKTu97tM4wgXJM',
  _type: 'mux.videoAsset',
  _updatedAt: '2021-09-07T16:40:42Z',
  assetId: 'r8oMNMUIETUq7XWc027w2WGuuvsPBRAw02EF2ebmy8Ydo',
  data: {
    aspect_ratio: '427:240',
    created_at: '1631032804',
    duration: 10.301967,
    id: 'r8oMNMUIETUq7XWc027w2WGuuvsPBRAw02EF2ebmy8Ydo',
    master_access: 'none',
    max_stored_frame_rate: 23.976,
    max_stored_resolution: 'SD',
    mp4_support: 'none',
    passthrough: '3d160653-8c2b-46d8-b433-ae660dc70fba',
    playback_ids: [
      {
        id: 'jZMASUq9Pn16a02Ehb4M022P67hPuHSnVp3idYW300X1zw',
        policy: 'public',
      },
    ],
    status: 'ready',
    test: true,
    tracks: [
      {
        duration: 30.071708,
        id: 'dqwuc6DaT1kaSlzwRpwTcTFMXes02WmqXIMDgE3eEzUk',
        max_frame_rate: 23.976,
        max_height: 480,
        max_width: 854,
        type: 'video',
      },
      {
        duration: 30.004,
        id: 'ow6mpaVkjFIGZqNn02s015ZzFWJnnPWDN3bpnG7JP3aGc',
        max_channel_layout: 'stereo',
        max_channels: 2,
        type: 'audio',
      },
    ],
    upload_id: '7l34Z01seyyRB1mBOXMbi7mhNMzVp013hWoa3kTdxgPWo',
  },
  playbackId: 'jZMASUq9Pn16a02Ehb4M022P67hPuHSnVp3idYW300X1zw',
  status: 'ready',
  thumbTime: 8,
  uploadId: '7l34Z01seyyRB1mBOXMbi7mhNMzVp013hWoa3kTdxgPWo',
}
