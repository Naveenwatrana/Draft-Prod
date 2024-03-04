import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Environment = 'production' | 'development' | 'other';

export function middleware(req: NextRequest) {
  const status = 301;
  const environments = ['production'];
  const currentEnv = process.env.NODE_ENV as Environment;

  if (environments.includes(currentEnv) && req.headers.get('x-forwarded-proto') !== 'https') {
    const hostname = req.headers.get('host') || req.nextUrl.hostname;
    return NextResponse.redirect(`https://${hostname}${req.nextUrl.pathname}`, status);
  }
  return NextResponse.next();
}
