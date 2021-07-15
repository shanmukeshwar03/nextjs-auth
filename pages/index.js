import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'

const Home = () => {
  const router = useRouter()

  useEffect(() => router.push('/login'), [])

  return (
    <Head>
      <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      <link
        rel='apple-touch-icon-precomposed'
        href='/lock-icon-152-167830.png'
      />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/lock-icon-144-167830.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='152x152'
        href='/lock-icon-152-167830.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='144x144'
        href='/lock-icon-144-167830.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='120x120'
        href='/lock-icon-120-167830.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='114x114'
        href='/lock-icon-114-167830.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='72x72'
        href='/lock-icon-72-167830.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        href='/lock-icon-57-167830.png'
      />
      <link rel='icon' href='/lock-icon-32-167830.png' sizes='32x32' />
      <meta name='title' content='Authentication' />
      <meta
        name='description'
        content='Authentication system for shanmukeshwar.ml'
      />
      <meta
        name='keywords'
        content='authentication auth login register signin signup forgotpassword shanmukeshwar.ml '
      />
      <meta name='robots' content='index, follow' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='language' content='English' />
    </Head>
  )
}

export default Home
