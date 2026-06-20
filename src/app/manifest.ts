import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Abhigyan Dwivedi | Portfolio',
    short_name: 'Abhigyan',
    description: 'Frontend Engineer and Product Designer bridging the gap between beautiful design and seamless engineering.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#B4F74C',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
