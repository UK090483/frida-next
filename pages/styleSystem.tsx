import Button from '@components/buttons/button'
import Layout from '@components/generic/Layout'
import Icon from '@components/Icon'
import Section from '@components/Section'
import * as React from 'react'

const StyleSystem: React.FC = () => {
  return (
    <Layout title="style" lang="de" preview={false}>
      <div className="h-vh/3"></div>

      <p className="pl-8 text-xl-fluid underline font-mono pt-32 pb-10">Typo</p>
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
      <p className="pl-8 text-xl-fluid underline font-mono pt-32 pb-10">
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
      <p className="pl-8 text-xl-fluid underline font-mono pt-32 pb-10">
        Icons
      </p>
      <Section backgroundColor="pink">
        <div className="flex py-4 justify-around mt-9">
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
        <div className="flex py-4 justify-around">
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
    </Layout>
  )
}

export default StyleSystem
