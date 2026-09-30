import { Link } from 'react-router-dom';
import { ChefHat, MessageSquare, Utensils, Star, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg text-primary-foreground">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight">MessMind</span>
            </div>
            <div>
              <Link
                to="/login"
                className="btn-primary"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-success/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

        <div className="max-w-4xl w-full space-y-10 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 text-secondary text-sm font-medium border border-border shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-success"></span>
            Elevating campus dining experiences
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-tight font-display">
            Your Voice, <br className="hidden md:block"/>
            <span className="text-accent">
              Better Food.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto leading-relaxed">
            MessMind is the ultimate feedback loop between students and mess management. Rate meals, share ideas, and help build a healthier, tastier community.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="btn-primary text-base px-8 py-4 rounded-full"
            >
              Get Started <ChefHat className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl w-full mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Rate Daily Meals</h3>
            <p className="text-muted-foreground leading-relaxed">Easily log your feedback on breakfast, lunch, and dinner. Help the management understand what you love.</p>
          </div>
          
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Community Forums</h3>
            <p className="text-muted-foreground leading-relaxed">Discuss the menu, suggest improvements, and connect with fellow students in the open forum.</p>
          </div>
          
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-success/10 text-success rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Data-Driven Insights</h3>
            <p className="text-muted-foreground leading-relaxed">Management gets real-time analytics to make informed decisions and improve food quality constantly.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-muted-foreground bg-card">
        <p className="flex items-center justify-center gap-2">
          Made with <Utensils className="w-4 h-4 text-primary" /> for better campus dining.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
