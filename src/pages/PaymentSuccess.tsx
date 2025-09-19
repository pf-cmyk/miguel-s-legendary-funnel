import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="chamber-glass rounded-3xl p-12 mb-8">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="chapter-title mb-6">The Wisdom Has Been Passed</h1>
          <p className="poetic-text mb-8">
            Miguel's ancient knowledge now flows through you, eh?<br/>
            Check your email for the sacred scrolls and access to the chambers.<br/>
            Your journey of elegant mastery begins now, sí.
          </p>
          <div className="text-accent text-xl italic mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            "The algorithm—it bows to you now."
          </div>
          <Link to="/">
            <Button variant="default" size="lg" className="relic-glow">
              Return to the Beginning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;