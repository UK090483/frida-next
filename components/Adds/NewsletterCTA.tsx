import Newsletter from '@components/Forms/NewsletterForm'
import Frida from '@components/Frida'
import Icon from '@components/Icon'
import * as React from 'react'

interface INewsLetterCTAProps {
  close: () => void
}

const NewsLetterCTA: React.FunctionComponent<INewsLetterCTAProps> = ({
  close,
}) => {
  return (
    <div className="bg-frida-white mx-frida_side  md:w-vw/2 max-w-xl   relative">
      <Icon
        onClick={close}
        icon="x"
        className="absolute top-2 right-2 border-frida-black border-2"
      />
      <div className="text-lg-fluid font-bold bg-frida-black text-frida-white py-14 pl-frida_7%  ">
        <Frida textColor="pink" color="white" /> <span> News</span>
      </div>
      <div className="p-8">
        <div className="text-sm-fluid font-bold mt-6 mb-6">
          Sign up and save: Bis zu 10% Preisreduktion für Dein Newsletter-Abo
        </div>
        <p className=" list-disc list-inside text-xs-fluid mb-6">
          Bestelle unseren monatlichen Newsletter und erhalte exklusive
          Angebote.
        </p>
        <Newsletter></Newsletter>
      </div>
    </div>
  )
}

export default NewsLetterCTA
