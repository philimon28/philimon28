import Head from 'next/head';
import HomePage from '@/scenes/Home';

const Header = () => (
  <Head>
    <title>BloomsExpert</title>
    <meta name="description" content="Generated by create next app" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <meta
      name="description"
      content="Search and apply for the latest jobs in your field. Explore opportunities from top companies and make your career dreams come true."
    />
    <meta
      name="keywords"
      content="job portal, job search, career opportunities, employment, job listings, job openings, job vacancies, job postings, hiring, recruitment"
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://job-portal-teal.vercel.app/" />
    <meta name="author" content="Negasi and Jossi" />
    <meta property="og:title" content="Find Your Dream Job | Job Portal Name" />
    <meta
      name="twitter:title"
      content="Find Your Dream Job | Job Portal Name"
    />
    <meta name="language" content="en-US" />
  </Head>
);

export default function Home() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}
