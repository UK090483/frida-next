/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from 'part:@sanity/base/client'
import { assemblePageUrl } from './frontend-utils'
import styles from './seo-preview.css'
import { url } from 'inspector'
import { SeoProps } from './seo-preview'
// import useSeo from '../../../../lib/useSeo'

const builder = imageUrlBuilder(sanityClient)

const urlFor = source => {
  return builder.image(source)
}

const FacebookShare: React.FC<SeoProps & { width: number }> = props => {
  const { shareTitle, shareDesc, shareGraphic, url, width } = props
  const websiteUrlWithoutProtocol = url && url.split('://')[1]

  return (
    <div className={styles.seoItem}>
      <h3 className={styles.seoItemTitle}>Facebook share</h3>
      <div className={styles.seoItemContent}>
        {shareTitle ? (
          <div className={styles.seoItemCard}>
            <div className={styles.facebookWrapper} style={{ width }}>
              <div className={styles.facebookImageContainer}>
                {shareGraphic ? (
                  <img
                    className={styles.facebookCardImage}
                    src={urlFor(shareGraphic)
                      .width(1200)
                      .height(630)
                      .url()}
                  />
                ) : (
                  <span className={styles.imagePlaceholder} />
                )}
              </div>
              <div className={styles.facebookCardContent}>
                <div className={styles.facebookCardUrl}>
                  {websiteUrlWithoutProtocol}
                </div>
                <div className={styles.facebookCardTitle}>
                  <a href={url} target="_blank">
                    {shareTitle}
                  </a>
                </div>
                {shareDesc && (
                  <div className={styles.facebookCardDescription}>
                    {shareDesc}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Please add a title and fill out your SEO fields first.</p>
        )}
      </div>
    </div>
  )
}

export default FacebookShare
