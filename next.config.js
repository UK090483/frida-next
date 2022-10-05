// @ts-nocheck
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  webpack(config, options) {
    const { dev, isServer } = options

    config.experiments = {
      layers: true,
    }
    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }

    return config
  },
  // experimental: { scrollRestoration: true },
  images: {
    domains: ['cdn.sanity.io'],
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'de',
  },
}

module.exports = withBundleAnalyzer(config)
