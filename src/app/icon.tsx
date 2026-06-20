import { ImageResponse } from 'next/og';
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#050508',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#B4F74C',
          borderRadius: '20%',
          fontWeight: 800,
          fontFamily: 'system-ui, sans-serif',
          border: '2px solid rgba(180, 247, 76, 0.5)',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
