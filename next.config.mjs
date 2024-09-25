/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir:'dist',
    images:{
      unoptimized:true,
    },
    trailingSlash: true, // Añade una barra inclinada al final de las rutas
  };
  
  export default nextConfig;
  