'use client'
import { SessionProvider } from 'next-auth/react'

// export default function UserProvider({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

export default function UserProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}
