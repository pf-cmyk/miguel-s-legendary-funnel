import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import miguelHero from '@/assets/miguel-sunset-hero.jpg';
import velvetCave from '@/assets/velvet-cave.jpg';
import observatoryRegret from '@/assets/observatory-regret.jpg';

const MiguelStoryFunnel = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const handlePayment = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { email }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
        if (entry.isIntersecting) {
          setVisibleSections(prev => [...new Set([...prev, sectionIndex])]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
      rootMargin: '-50px 0px'
    });

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const FloatingSymbols = ({ symbols, className = "" }: { symbols: string[], className?: string }) => (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {symbols.map((symbol, index) => (
        <div
          key={index}
          className="floating-symbol"
          style={{
            top: `${20 + (index * 25) % 60}%`,
            left: `${10 + (index * 30) % 80}%`,
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section - The Pigeon Escape */}
      <section 
        ref={el => sectionsRef.current[0] = el}
        data-section="0"
        className={`min-h-screen relative flex items-center justify-center px-4 py-20 story-reveal ${visibleSections.includes(0) ? 'in-view' : ''}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${miguelHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <FloatingSymbols symbols={['🕊️', '🔥', '✨', '🪶']} />
        <div className="text-center z-10 max-w-4xl">
          <h1 className="chapter-title mb-8">The Escape of the Pigeons</h1>
          <p className="poetic-text mb-8">
            In the beginning, Miguel, he walked among algoritmos rotos<br/>
            and pages that promise but never deliver, you know?<br/>
            The burning pigeons—they are not birds, eh?<br/>
            They are symbols of every CTA that has lost its soul in the code.
          </p>
          <div className="relative">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="feather-float absolute"
                style={{
                  top: `${Math.random() * 100}px`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              >
                🪶
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 1 - The Velvet Cave */}
      <section 
        ref={el => sectionsRef.current[1] = el}
        data-section="1"
        className={`min-h-screen relative flex items-center justify-center px-4 py-20 story-reveal ${visibleSections.includes(1) ? 'in-view' : ''}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${velvetCave})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <FloatingSymbols symbols={['🧵', '💎', '🌟', '🔮']} />
        <div className="text-center z-10 max-w-4xl">
          <h2 className="chapter-title mb-8">The Cave of Velvet</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8">
            <p className="poetic-text mb-6">
              "Here, Miguel, he discovered the secret chambers<br/>
              where user experience, she whispers her deepest confessions—<br/>
              not in the dashboards of analytics, no, but in the silence of velvet<br/>
              between one perfect button and the hand that presses it, sí?"
            </p>
            <div className="text-center space-y-4">
              <div className="text-accent font-semibold text-xl animate-pulse" style={{ fontFamily: 'Georgia, serif' }}>
                "If the algorithm, it resists, Miguel will challenge it at dawn"
              </div>
              <div className="text-accent font-semibold text-xl animate-pulse" style={{ animationDelay: '1.5s', fontFamily: 'Georgia, serif' }}>
                "Each pixel, it has a purpose, each purpose has its story"
              </div>
              <div className="text-accent font-semibold text-xl animate-pulse" style={{ animationDelay: '3s', fontFamily: 'Georgia, serif' }}>
                "Elegance—it is not coded, eh? It is conjured"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2 - The Observatory of Regret */}
      <section 
        ref={el => sectionsRef.current[2] = el}
        data-section="2"
        className={`min-h-screen relative flex items-center justify-center px-4 py-20 story-reveal ${visibleSections.includes(2) ? 'in-view' : ''}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${observatoryRegret})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <FloatingSymbols symbols={['🧠', '👻', '📱', '💔']} />
        <div className="text-center z-10 max-w-4xl">
          <h2 className="chapter-title mb-8">The Observatory of the Regret</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8">
            <p className="poetic-text mb-8">
              In this chamber, Miguel, he met the Ghost of Features Past—<br/>
              a specter who had built for complexity, not for clarity, you see,<br/>
              forever haunted by research that never happened, eh?<br/>
              And the quiet desperation of journeys without optimization.
            </p>
            <div className="text-center">
              <p className="text-destructive text-2xl font-medium mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                "I added seventeen dropdowns to one simple form, Miguel..."
              </p>
              <p className="poetic-text text-lg">
                Miguel, he wept. Then he rebuilt, sí.<br/>
                Not with features, but with grace. Not with complexity, but with breath.<br/>
                This is the way of the elegant founder, you understand?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3 - The Mirror of Proof */}
      <section 
        ref={el => sectionsRef.current[3] = el}
        data-section="3"
        className={`min-h-screen relative flex items-center justify-center px-4 py-20 story-reveal ${visibleSections.includes(3) ? 'in-view' : ''}`}
      >
        <FloatingSymbols symbols={['🪞', '✨', '👁️', '🔍']} />
        <div className="text-center z-10 max-w-4xl">
          <h2 className="chapter-title mb-8">The Mirror of the Truth</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8 relative">
            <div className="mirror-shimmer absolute inset-0 rounded-3xl opacity-20"></div>
            <div className="relative z-10">
              <p className="poetic-text mb-8">
                The final chamber, she revealed her secret—<br/>
                not a mirror showing what was, but what could be, no?<br/>
                In her surface: your reflection as the founder<br/>
                who builds with Miguel's rhythm, not the noise of the market.
              </p>
              <div className="text-center">
                <p className="text-primary text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  "You—you are the algorithm."
                </p>
                <p className="text-accent italic text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                  — Miguel, from the chamber of the infinite scroll
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Claim the Final Relic */}
      <section 
        ref={el => sectionsRef.current[4] = el}
        data-section="4"
        className={`min-h-screen relative flex items-center justify-center px-4 py-12 sm:py-20 story-reveal ${visibleSections.includes(4) ? 'in-view' : ''}`}
      >
        <FloatingSymbols symbols={['🛒', '👑', '⚡', '💫']} />
        <div className="text-center z-10 max-w-4xl">
          <h2 className="chapter-title mb-8">Take What Miguel Left Behind</h2>
          <div className="chamber-glass rounded-3xl p-8 sm:p-12 mb-8 sm:mb-12">
            <p className="poetic-text mb-6 sm:mb-8">
              The final choice of the chamber, she waits for you.<br/>
              Miguel's complete wisdom mastery—the algorithms of the heart,<br/>
              the conversion methods that whisper instead of shout, you see?<br/>
              Only $197 to inherit what took Miguel seventeen years to discover.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-center mb-4">
                <div className="text-primary text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  $197
                </div>
                <p className="text-accent text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                  Miguel's Wisdom Mastery
                </p>
              </div>
              <Input
                type="email"
                placeholder="Enter your email to claim Miguel's wisdom..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-center text-lg py-3"
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <Button 
                onClick={handlePayment}
                disabled={isLoading}
                variant="default" 
                size="lg" 
                className="relic-glow w-full text-lg px-8 py-4 hover:scale-105 transition-all duration-300" 
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {isLoading ? 'Opening sacred chambers...' : 'Claim Miguel\'s Ancient Wisdom'}
              </Button>
            </div>
          </div>
          <div className="mt-6 sm:mt-12 pb-8 sm:pb-0">
            <p className="text-accent text-lg sm:text-2xl italic opacity-90 animate-pulse mb-2 sm:mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              "Clarity—it is not coded, eh? It is conjured. And Miguel, he conjures with velvet, not with spreadsheets."
            </p>
            <p className="text-muted-foreground text-sm sm:text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              — Miguel's final transmission, encoded in the walls of the chamber
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiguelStoryFunnel;