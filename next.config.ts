import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cleanDistDir: true,
  distDir     : 'dist',
  sassOptions : {
    implementation: 'sass-embedded'
  },
  webpack: (config) => {
    const svgLoader = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...svgLoader,
        resourceQuery: { and: [/url/u, { not: svgLoader.resourceQuery.not }]},
        test         : /\.svg$/iu
      },
      {
        issuer       : svgLoader.issuer,
        resourceQuery: { not: [/url/u, ...svgLoader.resourceQuery.not]},
        test         : /\.svg$/iu,
        use          : [
          {
            loader : '@svgr/webpack',
            options: {
              icon             : true,
              replaceAttrValues: {
                '1em'       : `{props.size ?? '1em'}`,
                currentColor: `{props.color || 'currentColor'}`
              },
              title: true
            }
          }
        ]
      }
    );

    svgLoader.exclude = /\.svg$/iu;

    return config;
  }
};

export default nextConfig;
