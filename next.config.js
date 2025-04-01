/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com', 
      'images.unsplash.com', 
      'scontent-gru1-2.xx.fbcdn.net', 
      'upload.wikimedia.org',
      'bemol.vtexassets.com',
      "encrypted-tbn0.gstatic.com",
      "media.licdn.com",
      "www.atomosquimica.com.br",
      "officemaisdistribuidora.com.br",
      "cdn.iset.io",
      "www.unilever.com.br",
      "bordipecas.com.br",
      "64.media.tumblr.com",
      "cdn.awsli.com.br",
      "genco.com.br",
      "http2.mlstatic.com",
      // Domínios adicionais para imagens de produtos
      "m.media-amazon.com",
      "cdn-cosmos.bluesoft.com.br",
      "a-static.mlcdn.com.br",
      "img.irroba.com.br",
      "lojadarley.fbitsstatic.net",
      "d2r9epyceweg5n.cloudfront.net",
      "i.imgur.com",
      "www.netuno.com.br",
      "www.lasertools.com.br",
      "www.iquattro.com.br",
      "server-bucket.s3.amazonaws.com"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ],
    unoptimized: true
  },
}

module.exports = nextConfig 