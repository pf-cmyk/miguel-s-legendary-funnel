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
          <h1 className="chapter-title mb-8">El Escape de las Palomas</h1>
          <p className="poetic-text mb-8">
            En el principio, Miguel caminaba entre algoritmos rotos<br/>
            y páginas que prometían pero nunca entregaban.<br/>
            Las palomas ardientes no eran pájaros—eran símbolos<br/>
            de cada CTA que había perdido su alma en el código.
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
          <h2 className="chapter-title mb-8">La Cueva de Terciopelo</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8">
            <p className="poetic-text mb-6">
              "Aquí, Miguel descubrió las cámaras secretas<br/>
              donde la experiencia del usuario susurra sus confesiones más profundas—<br/>
              no en dashboards de analytics, sino en el silencio de terciopelo<br/>
              entre un botón perfecto y la mano que lo presiona."
            </p>
            <div className="text-center space-y-4">
              <div className="text-accent font-semibold text-xl animate-pulse" style={{ fontFamily: 'Georgia, serif' }}>
                "Si el algoritmo resiste, Miguel lo desafiará al amanecer"
              </div>
              <div className="text-accent font-semibold text-xl animate-pulse" style={{ animationDelay: '1.5s', fontFamily: 'Georgia, serif' }}>
                "Cada píxel tiene un propósito, cada propósito una historia"
              </div>
              <div className="text-accent font-semibold text-xl animate-pulse" style={{ animationDelay: '3s', fontFamily: 'Georgia, serif' }}>
                "La elegancia no se codifica—se conjura"
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
          <h2 className="chapter-title mb-8">El Observatorio del Pesar</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8">
            <p className="poetic-text mb-8">
              Aquí Miguel encontró el Fantasma de las Funciones Perdidas—<br/>
              un espectro que había construido para la complejidad, no la claridad,<br/>
              eternamente atormentado por investigación que nunca ocurrió<br/>
              y la desesperación silenciosa de jornadas sin optimizar.
            </p>
            <div className="text-center">
              <p className="text-destructive text-2xl font-medium mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                "Agregué diecisiete dropdowns a un formulario simple..."
              </p>
              <p className="poetic-text text-lg">
                Miguel lloró. Después reconstruyó.<br/>
                No con funciones, sino con gracia. No con complejidad, sino con respiración.<br/>
                Este es el camino del fundador elegante.
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
          <h2 className="chapter-title mb-8">El Espejo de la Verdad</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-8 relative">
            <div className="mirror-shimmer absolute inset-0 rounded-3xl opacity-20"></div>
            <div className="relative z-10">
              <p className="poetic-text mb-8">
                La cámara final reveló su secreto—<br/>
                no un espejo que muestra lo que fue, sino lo que puede ser.<br/>
                En su superficie: tu reflejo como el fundador<br/>
                que construye con el ritmo de Miguel, no el ruido del mercado.
              </p>
              <div className="text-center">
                <p className="text-primary text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  "Tú eres el algoritmo."
                </p>
                <p className="text-accent italic text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                  — Miguel, desde la cámara del scroll infinito
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
          <h2 className="chapter-title mb-8">Toma Lo Que Miguel Dejó Atrás</h2>
          <div className="chamber-glass rounded-3xl p-12 mb-12">
            <p className="poetic-text mb-8">
              La elección final de la cámara aguarda.<br/>
              Dos senderos se bifurcan en este bosque de terciopelo—<br/>
              uno para aprender los métodos de Miguel, otro para heredar su magia.<br/>
              Elige no con urgencia, sino con la certeza silenciosa de saber.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4" style={{ fontFamily: 'Georgia, serif' }}>
                Trace el Viaje de Miguel a Través de los Pergaminos
              </Button>
              <Button variant="default" size="lg" className="relic-glow text-lg px-8 py-4 hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Georgia, serif' }}>
                Toma Lo Que Miguel Dejó—Si Estás Listo
              </Button>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-accent text-2xl italic opacity-90 animate-pulse" style={{ fontFamily: 'Georgia, serif' }}>
              "La claridad no se codifica—se conjura. Y Miguel conjura con terciopelo, no con hojas de cálculo."
            </p>
            <p className="text-muted-foreground text-lg mt-3" style={{ fontFamily: 'Georgia, serif' }}>
              — Última transmisión de Miguel, grabada en las paredes de la cámara
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiguelStoryFunnel;