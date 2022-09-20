import React from 'react'

import { assemblePageUrl } from './frontend-utils'
import styles from './seo-preview.css'
import { SeoProps } from './seo-preview'

const GoogleSearchResult: React.FC<SeoProps & { width: number }> = props => {
  const { url, metaDesc, metaTitle, width } = props

  const websiteUrlWithoutProtocol = url && url.split('://')[1]

  return (
    <div className={styles.seoItem}>
      <h3 className={styles.seoItemTitle}>Google search result preview</h3>
      <div className={styles.seoItemContent}>
        {metaTitle ? (
          <div className={styles.seoItemCard}>
            <div className={styles.googleWrapper} style={{ width }}>
              <div className={styles.googleUrl}>
                {websiteUrlWithoutProtocol}
              </div>
              <div className={styles.googleTitle}>{metaTitle}</div>

              {metaDesc && <div className={styles.googleDesc}>{metaDesc}</div>}
            </div>
          </div>
        ) : (
          <p>Please add a title and fill out your SEO fields first.</p>
        )}
      </div>
    </div>
  )
}

export default GoogleSearchResult
