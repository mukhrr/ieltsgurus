import {NextResponse} from 'next/server'
import {updateSession} from '@/lib/supabase/middleware'
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";

export async function middleware(req, event) {
    // const {pathname} = request.nextUrl
    // const writingSlug = pathname.match(/\/writing\/(.*)/)?.[1]

    // async function sendAnalytics() {
    //     const URL =
    //         process.env.NODE_ENV === 'production'
    //             ? 'https://onur.dev/api/increment-views'
    //             : 'http://localhost:3000/api/increment-views'
    //
    //     try {
    //         const res = await fetch(`${URL}?slug=${writingSlug}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //
    //         if (res.status !== 200) console.error('Failed to send analytics', res)
    //     } catch (error) {
    //         console.error('Error sending analytics', error)
    //     }
    // }

    /**
     * The `event.waitUntil` function is the real magic here.
     * It enables the response to proceed without waiting for the completion of `sendAnalytics()`.
     * This ensures that the user experience remains uninterrupted and free from unnecessary delays.
     */
    // if (writingSlug) event.waitUntil(sendAnalytics())
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();

    return res;
}

export const config = {
    // matcher: '/writing/:path/'
    // The below solution also filters out the user navigations which is not desired:
    // See: https://github.com/vercel/next.js/discussions/37736#discussioncomment-7886601
    matcher: [
        // {
        //     source: '/writing/:path/',
        //     missing: [
        //         {type: 'header', key: 'next-router-prefetch'},
        //         {type: 'header', key: 'purpose', value: 'prefetch'}
        //     ]
        // },
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
}
