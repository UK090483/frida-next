import Button from '@components/buttons/button'
import Frida from '@components/Frida'
// import Layout from '@components/generic/Layout'
import Icon from '@components/Icon'

import ProductName from '@components/ProductComponents/ProductName'
import Section from '@components/Section'
import * as React from 'react'

const StyleSystem: React.FC = () => {
  return (
    <>
      <div className="h-vh/3"></div>

      <p className="pt-32 pb-10 pl-8 font-mono underline text-xl-fluid">Typo</p>
      <Section>
        <p className="header-big">Header-big</p>
        <p className="header-medium">Header-medium</p>
        <p className="header-small">Header-small</p>
        <p className="subheader">Subheader</p>

        <p className="text-base-fluid">
          Text-Normal Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla ac ultrices nunc. Suspendisse hendrerit sem vel metus aliquet,
          sed elementum enim venenatis. Vivamus libero dolor, lobortis vitae
          enim et, consequat dapibus turpis. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
        <p className="text-base-fluid">
          Nunc aliquam eu elit ac rutrum. Vivamus molestie faucibus ipsum, eu
          eleifend metus tempus nec. Suspendisse nibh risus, efficitur in turpis
          et, feugiat tincidunt sem. Nullam est tellus, tristique vitae
          convallis in, semper id urna. Cras sit amet vulputate est, at volutpat
          massa. Vestibulum efficitur tellus molestie mi ornare pretium. Nulla
          pellentesque ultrices viverra. Fusce venenatis commodo ligula ac
          faucibus.
        </p>
      </Section>
      <p className="pt-32 pb-10 pl-8 font-mono underline text-xl-fluid">
        Buttons
      </p>
      <Section>
        <Button label="Button" type="click" onClick={() => ''} />
        <Button size="s" label="Button small" type="click" onClick={() => ''} />
        <Button color="red" label="Button" type="click" onClick={() => ''} />
        <Button
          color="red"
          size="s"
          label="Button small"
          type="click"
          onClick={() => ''}
        />
        <Button color="green" label="Button" type="click" onClick={() => ''} />
        <Button
          color="green"
          size="s"
          label="Button small"
          type="click"
          onClick={() => ''}
        />
      </Section>
      <p className="pt-32 pb-10 pl-8 font-mono underline text-xl-fluid">
        Icons
      </p>
      <Section backgroundColor="pink">
        <div className="flex justify-around py-4 mt-9">
          <Icon icon="menu" />
          <Icon icon="x" />
          <Icon icon="arrowLeft" />
          <Icon icon="arrowRight" />
          <Icon icon="cart" />
          <Icon icon="creditCard" />
          <Icon icon="minus" />
          <Icon icon="plus" />
          <Icon icon="share" />
          <Icon icon="twitter" />
          <Icon icon="whatsApp" />
          <Icon icon="facebook" />
          <Icon icon="email" />
        </div>
        <div className="flex justify-around py-4">
          <Icon icon="menu" size="s" />
          <Icon icon="x" size="s" />
          <Icon icon="arrowLeft" size="s" />
          <Icon icon="arrowRight" size="s" />
          <Icon icon="cart" size="s" />
          <Icon icon="creditCard" size="s" />
          <Icon icon="minus" size="s" />
          <Icon icon="plus" size="s" />
          <Icon icon="share" size="s" />
          <Icon icon="twitter" size="s" />
          <Icon icon="whatsApp" size="s" />
          <Icon icon="facebook" size="s" />
          <Icon icon="email" size="s" />
        </div>
      </Section>
      <p className="pt-32 pb-10 pl-8 font-mono underline text-xl-fluid">
        Frida
      </p>

      <Section backgroundColor="pink">
        <p className="header-big">
          <Frida text="Jason Engelhart i" />
        </p>
        <p className="header-medium">
          <Frida text="Jason Engelhart i" />
        </p>
        <p className="header-small">
          <Frida text="Jason Engelhart i" />
        </p>
        <p className="subheader">
          <Frida text="Jason Engelhart i" />
        </p>
        <p className="text-base-fluid">
          <Frida text="Jason Engelhart i" /> Nunc aliquam eu elit ac rutrum.
          Vivamus molestie faucibus ipsum, eu eleifend metus tempus nec.
          Suspendisse nibh risus, efficitur in turpis et, feugiat tincidunt sem.
          Nullam est tellus, tristique vitae
        </p>

        <div className="w-1/2 overflow-hidden truncate border-2 subheader text-frida-white">
          <Frida text="TruncatedOOOOOOOOOOOOOO" />
        </div>
      </Section>

      <p className="pt-32 pb-10 pl-8 font-mono underline text-xl-fluid">
        Product Elements
      </p>

      <Section backgroundColor="white" className="h-screen">
        <ProductName availability={true} name="Test pro duct" size="m" />
        <ProductName availability={false} name="Test pro duct sold" size="m" />
        <ProductName availability={true} name="Test pro duct" size="l" />
        <ProductName availability={false} name="Test pro duct sold" size="l" />
        <div className="w-1/3 border-2">
          <ProductName
            availability={false}
            name="Test wordbrake product sold"
            size="l"
          />
        </div>

        <div className="w-1/3 border-2">
          <ProductName
            truncate
            availability={false}
            name="Test truncate pro duct sold"
            size="l"
          />
        </div>
      </Section>

      <Section backgroundColor="white" className="h-screen"></Section>
    </>
  )
}

export default StyleSystem
