import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-static';

export async function GET() {
  const avatar = await readFile(path.join(process.cwd(), 'public/avatar.jpg'));
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: '#0a0a0c',
          color: '#fafafa',
          padding: 80,
        }}
      >
        {/* The original illustrated avatar carries the same identity when shared. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${avatar.toString('base64')}`}
          alt=""
          width={190}
          height={190}
          style={{
            borderRadius: 100,
            border: '4px solid #4567da',
            marginRight: 56,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>
            Youlong Ma
          </div>
          <div style={{ fontSize: 26, color: '#9db6ff', marginTop: 18 }}>
            Full-Stack Engineer &amp; AI Developer
          </div>
          <div
            style={{
              width: 64,
              height: 4,
              background: '#4567da',
              marginTop: 36,
            }}
          />
          <div style={{ fontSize: 25, color: '#aaaab4', marginTop: 30 }}>
            AI-powered tools. Thoughtful systems.
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
