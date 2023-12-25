/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path');

const nextConfig = {
  transpilePackages: ['three'],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      styles: path.resolve(__dirname, 'src/styles'),
    };
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {icon: true, dimensions: false},
          },
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ];
    return config;
  },
};

module.exports = {
  ...nextConfig,
  compiler: {
    styledComponents: true,
  },
};
