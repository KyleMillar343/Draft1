import Hero from '../components/Hero';
import Features from '../components/Features';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

interface HomePageProps {
  onAuthClick: (mode: 'signin' | 'signup') => void;
}

export default function HomePage({ onAuthClick }: HomePageProps) {
  return (
    <>
      <Hero onAuthClick={onAuthClick} />
      <Features />
      <ContactForm />
      <Footer />
    </>
  );
}
