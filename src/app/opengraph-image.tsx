import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ISBN Code Vault';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 60,
            background: 'rgba(8, 131, 195, 0.1)',
            border: '2px solid rgba(8, 131, 195, 0.3)',
            marginBottom: 40,
          }}
        >
          {/* Key Icon simplified */}
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.75 3.75C13.2647 3.75 11.25 5.76472 11.25 8.25C11.25 9.06016 11.464 9.82024 11.8396 10.4856L3.96967 18.3556C3.82902 18.4962 3.75 18.687 3.75 18.8859V20.25H5.86396C6.06291 20.25 6.25368 20.171 6.39434 20.0303L7.5 18.9246L8.60566 20.0303C8.74632 20.171 8.93709 20.25 9.13604 20.25H11.25V18.136C11.25 17.9371 11.171 17.7463 11.0303 17.6057L10.0246 16.5999L11.4856 15.1389C12.1509 15.5146 12.911 15.7285 13.7212 15.7285C16.2065 15.7285 18.2212 13.7138 18.2212 11.2285C18.2212 8.74322 16.2065 6.7285 13.7212 6.7285" stroke="#0883c3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#0f172a',
            margin: 0,
            padding: 0,
            marginBottom: 20,
            fontFamily: 'sans-serif',
            letterSpacing: '-0.05em',
          }}
        >
          ISBN Code Vault
        </h1>
        <p
          style={{
            fontSize: 40,
            color: '#475569',
            margin: 0,
            padding: '0 100px',
            textAlign: 'center',
            lineHeight: 1.4,
            fontFamily: 'sans-serif',
          }}
        >
          Securely reveal and claim unique ISBN codes. <span style={{ color: '#0883c3', marginLeft: '10px' }}>Issued once, permanently yours.</span>
        </p>
      </div>
    )
  );
}
