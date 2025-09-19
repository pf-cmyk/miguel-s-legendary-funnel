import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import miguelHero from '@/assets/miguel-hero.jpg';
import velvetCave from '@/assets/velvet-cave.jpg';
import observatoryRegret from '@/assets/observatory-regret.jpg';

const MiguelStoryFunnel = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${miguelHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <FloatingSymbols symbols={['🕊️', '🔥', '✨', '🪶']} />
        <div className="text-center z-10 max-w-4xl">
          <h1 className="chapter-title mb-8">The Pigeon Escape</h1>
          <p className="poetic-text mb-8">
            In the beginning, Miguel walked among conversion rates<br/>
            that refused to convert, and landing pages that landed nowhere.<br/>
            The pigeons? They were metaphors for bad user flows.<br/>
            Miguel escaped not by running, but by building something beautiful.
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url(${velvetCave})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <FloatingSymbols symbols={['🧵', '💎', '🌟', '🔮']} />
        <div className="text-center z-10 max-w-4xl">
          <h2 className="chapter-title mb-8">The Velvet Cave</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8">
            <p className="poetic-text mb-6">
              "Here, Miguel discovered the secret chambers<br/>
              where user experience whispers its deepest confessions—<br/>
              not in analytics dashboards, but in the velvet silence<br/>
              between a perfect button and the hand that clicks it."
            </p>
            <div className="text-center space-y-4">
              <div className="text-accent font-semibold text-lg animate-pulse">
                "If the algorithm doesn't work, Miguel will personally challenge it to a duel"
              </div>
              <div className="text-accent font-semibold text-lg animate-pulse" style={{ animationDelay: '1s' }}>
                "Every pixel has a purpose, every purpose has a story"
              </div>
              <div className="text-accent font-semibold text-lg animate-pulse" style={{ animationDelay: '2s' }}>
                "Elegance isn't coded—it's conjured"
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url(${observatoryRegret})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <FloatingSymbols symbols={['🧠', '👻', '📱', '💔']} />
        <div className="text-center z-10 max-w-4xl">
          <h2 className="chapter-title mb-8">The Observatory of Regret</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8">
            <p className="poetic-text mb-8">
              In this chamber, Miguel met the Ghost of Features Past—<br/>
              a specter who had built for complexity, not clarity,<br/>
              forever haunted by user research that never happened<br/>
              and the quiet desperation of unoptimized journeys.
            </p>
            <div className="text-center">
              <p className="text-destructive text-xl font-medium mb-4">
                "I added seventeen dropdowns to a simple form..."
              </p>
              <p className="poetic-text text-sm">
                Miguel wept. Then he rebuilt.<br/>
                Not with features, but with grace. Not with complexity, but with breath.<br/>
                This is the way of the elegant founder.
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
          <h2 className="chapter-title mb-8">The Mirror of Truth</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8 relative">
            <div className="mirror-shimmer absolute inset-0 rounded-3xl opacity-20"></div>
            <div className="relative z-10">
              <p className="poetic-text mb-8">
                The final chamber revealed its secret—<br/>
                not a mirror showing what was, but what could be.<br/>
                In its surface: your reflection as the founder<br/>
                who builds with Miguel's rhythm, not the market's noise.
              </p>
              <div className="text-center">
                <p className="text-primary text-2xl font-bold mb-4">
                  "You are the algorithm."
                </p>
                <p className="text-accent italic">
                  — Miguel, from the chamber of infinite scroll
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
        className={`min-h-screen relative flex items-center justify-center px-4 py-20 story-reveal ${visibleSections.includes(4) ? 'in-view' : ''}`}
      >
        <FloatingSymbols symbols={['🛒', '👑', '⚡', '💫']} />
        <div className="text-center z-10 max-w-4xl">
          <h2 className="chapter-title mb-8">Take What Miguel Left Behind</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-12">
            <p className="poetic-text mb-8">
              The chamber's final choice awaits.<br/>
              Two paths diverge in this velvet wood—<br/>
              one to learn Miguel's methods, one to inherit his magic.<br/>
              Choose not with urgency, but with the quiet certainty of knowing.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                Trace Miguel's Journey Through the Scrolls
              </Button>
              <Button variant="default" size="lg" className="relic-glow text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                Take What Miguel Left Behind—If You're Ready
              </Button>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-accent text-xl italic opacity-80 animate-pulse">
              "Clarity isn't coded—it's conjured. And Miguel conjures with velvet, not spreadsheets."
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              — Miguel's final transmission, encoded in the chamber walls
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiguelStoryFunnel;