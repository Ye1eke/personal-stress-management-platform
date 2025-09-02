import { Heart, Users, TrendingUp, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/Card';
import { StressAssessment } from '../components/features/StressAssessment';

const features = [
  {
    icon: Heart,
    title: 'Stress Assessment',
    description:
      'Identify stress levels and their impact on your relationship with our comprehensive assessment tool.',
  },
  {
    icon: Users,
    title: 'Couple Check-ins',
    description:
      'Daily mood and relationship quality tracking to monitor progress together.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Visualize your relationship health improvements over time with detailed analytics.',
  },
  {
    icon: Shield,
    title: 'Local Support',
    description:
      'Access to Kazakhstan-based therapists and support groups in your preferred language.',
  },
];

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm">
              <Heart className="h-5 w-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">
                Trusted by 1000+ couples in Kazakhstan
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Build Stronger
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                Relationships
              </span>
              <span className="text-4xl md:text-5xl text-gray-700">
                Stress-Free
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Help couples in Kazakhstan manage stress before it damages their
              relationships. Get personalized tools, local support, and expert
              guidance in
              <span className="font-semibold text-gray-800">
                {' '}
                Kazakh and Russian
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Start Free Assessment
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-4 border-2 border-gray-300 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200"
              >
                Learn More
              </Button>
            </div>

            <div className="mt-16 flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Local Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Multi-language</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                {' '}
                Healthy Relationship
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform provides comprehensive tools to identify, understand,
              and manage relationship stress before it becomes a problem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 text-center">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section
        id="assessment"
        className="py-24 bg-gradient-to-br from-gray-50 to-rose-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-rose-100 rounded-full px-4 py-2 mb-6">
              <Heart className="h-4 w-4 text-rose-600" />
              <span className="text-sm font-medium text-rose-700">
                Free Assessment
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Start Your Relationship
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                {' '}
                Health Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Take our comprehensive assessment to understand how stress is
              affecting your relationship and get personalized recommendations
              tailored for couples in Kazakhstan.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <StressAssessment />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Strengthen Your Relationship?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-95 leading-relaxed">
              Join thousands of couples in Kazakhstan who are building stronger,
              stress-free relationships with our proven approach.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-10 py-4 bg-white text-rose-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 font-semibold"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-4 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
              >
                Contact Support
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-white/80">Couples Helped</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
