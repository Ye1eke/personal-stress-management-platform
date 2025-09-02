import { Heart, Menu } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header = () => {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">
            Stress-Free Relationships
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#assessment" className="text-gray-600 hover:text-gray-900">
            Assessment
          </a>
          <a href="#resources" className="text-gray-600 hover:text-gray-900">
            Resources
          </a>
          <a href="#support" className="text-gray-600 hover:text-gray-900">
            Support
          </a>
          <Button size="sm">Get Started</Button>
        </nav>

        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
