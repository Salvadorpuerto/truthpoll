/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for World App Mini Apps
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
