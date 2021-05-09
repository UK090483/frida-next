import React from 'react'
import Section from '@components/container/section'

// import TextFlow from './TextFlow/textFlow'
// import AllSupporter from '@components/Supporter/allSupporter'
import Infos from './Infos/infos'
// import NewsLetter from '../../newsletter/newsletter'
import BigButton from '../../lib/buttons/bigButton'

const Footer: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      {!['OurSupporters', 'OurOutdoor-Gallery'].includes(title) && (
        <>
          <Section backgroundColor="pink">
            <div style={{ padding: '200px 0 50px 0' }}>
              <div className="subheader">SUPPORTER</div>
              <div className="header-medium">
                Ohne Euch wäre diese Aktion nicht möglich.
                <span style={{ color: 'white' }}> Danke.</span>
              </div>
            </div>
          </Section>
          <Section backgroundColor="pink" type={'full'}>
            {/* <AllSupporter></AllSupporter> */}
          </Section>
          {/* <TextFlow></TextFlow> */}
        </>
      )}
      {/* {!['OurOutdoor-Gallery'].includes(title) && <NewsLetter />} */}
      <Section backgroundColor="red">
        <div style={{ padding: '50px 0' }}>
          <div className={'text-xl-fluid text-frida-white font-bold'}>
            GET IN TOUCH WITH FRIDA
          </div>
        </div>
      </Section>
      <BigButton></BigButton>
      <Infos />
    </div>
  )
}

export default Footer
