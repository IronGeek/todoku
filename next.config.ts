import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cleanDistDir: true,
  distDir: 'dist',
  sassOptions: {
    implementation: 'sass-embedded'
  },
  webpack: (config) => {
    const svgLoader = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        ...svgLoader,
        test: /\.svg$/i,
        resourceQuery: { and: [/url/, { not: svgLoader.resourceQuery.not } ] }
      },
      {
        test: /\.svg$/i,
        issuer: svgLoader.issuer,
        resourceQuery: { not: [/url/, ...svgLoader.resourceQuery.not] },
        use: [{
          loader: '@svgr/webpack',
          options: {
            icon: true,
            title: true,
            replaceAttrValues: {
              currentColor: `{props.color || 'currentColor'}`,
              '1em': `{props.size ?? '1em'}`
            }
          }
        }],
      },
    )

    svgLoader.exclude = /\.svg$/i;

    return config;
  }
};

export default nextConfig;
