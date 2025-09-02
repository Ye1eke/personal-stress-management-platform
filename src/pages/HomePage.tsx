import {
  Heart,
  Users,
  TrendingUp,
  Shield,
  Star,
  Quote,
  MapPin,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/Card';
import { StressAssessment } from '../components/features/StressAssessment';

export const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Heart,
      title: t('homepage.features.assessment.title'),
      description: t('homepage.features.assessment.description'),
    },
    {
      icon: Users,
      title: t('homepage.features.daily_tools.title'),
      description: t('homepage.features.daily_tools.description'),
    },
    {
      icon: TrendingUp,
      title: t('homepage.features.progress.title'),
      description: t('homepage.features.progress.description'),
    },
    {
      icon: Shield,
      title: t('homepage.features.local_support.title'),
      description: t('homepage.features.local_support.description'),
    },
  ];

  // Local testimonials from Kazakhstan users
  const testimonials = [
    {
      name: 'Айгүл Нұрланова',
      location: 'Алматы',
      role: 'Мұғалім',
      content: t('homepage.testimonials.aigul.content'),
      rating: 5,
      image: '👩‍🏫',
    },
    {
      name: 'Дмитрий Петров',
      location: 'Нұр-Сұлтан',
      role: 'IT маманы',
      content: t('homepage.testimonials.dmitry.content'),
      rating: 5,
      image: '👨‍💻',
    },
    {
      name: 'Мәдина Қасымова',
      location: 'Шымкент',
      role: 'Дәрігер',
      content: t('homepage.testimonials.madina.content'),
      rating: 5,
      image: '👩‍⚕️',
    },
  ];

  const scrollToAssessment = () => {
    const assessmentSection = document.getElementById('assessment');
    assessmentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
        {/* Kazakhstan cultural background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl">🏔️</div>
          <div className="absolute top-20 right-20 text-4xl">🌾</div>
          <div className="absolute bottom-20 left-20 text-5xl">🐎</div>
          <div className="absolute bottom-10 right-10 text-3xl">⭐</div>
          <div className="absolute top-1/2 left-1/4 text-2xl">🏛️</div>
          <div className="absolute top-1/3 right-1/3 text-3xl">🌙</div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Trust indicator with Kazakhstan flag */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-blue-100">
              <span className="text-2xl">🇰🇿</span>
              <Heart className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-800">
                {t('homepage.hero.trust_indicator')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {t('homepage.hero.title')}
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
              {t('homepage.hero.description')}
            </p>

            {/* Cultural subtitle */}
            <p className="text-base sm:text-lg text-blue-700 mb-12 font-medium max-w-3xl mx-auto">
              {t('homepage.hero.cultural_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={scrollToAssessment}
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold"
              >
                <Heart className="h-5 w-5 mr-2" />
                {t('homepage.hero.cta')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-blue-300 text-blue-700 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
              >
                {t('homepage.hero.secondary_cta')}
              </Button>
            </div>

            {/* Key benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="font-medium text-gray-800">
                  {t('homepage.hero.benefit_1')}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-gray-800">
                  {t('homepage.hero.benefit_2')}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                <Clock className="h-6 w-6 text-purple-600" />
                <span className="font-medium text-gray-800">
                  {t('homepage.hero.benefit_3')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('homepage.features.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('homepage.features.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
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

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('homepage.testimonials.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('homepage.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="relative bg-white shadow-xl border-0 overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.image}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {testimonial.location} • {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <Quote className="h-8 w-8 text-blue-200 mb-4" />
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
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
              Start Your Mental Health Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Take our comprehensive assessment to understand your stress levels
              and get personalized recommendations tailored for life in
              Kazakhstan.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <StressAssessment />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Kazakhstan cultural elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🏔️</div>
          <div className="absolute bottom-10 right-10 text-6xl">⭐</div>
          <div className="absolute top-1/2 right-1/4 text-4xl">🌙</div>
        </div>

        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl">🇰🇿</span>
              <span className="text-sm font-medium">
                {t('homepage.cta.badge')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t('homepage.cta.title')}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl mb-12 opacity-95 leading-relaxed">
              {t('homepage.cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                onClick={scrollToAssessment}
                className="text-lg px-10 py-4 bg-white text-blue-700 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 font-semibold"
              >
                <Heart className="h-5 w-5 mr-2" />
                {t('homepage.cta.primary_button')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-4 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
              >
                {t('homepage.cta.secondary_button')}
              </Button>
            </div>

            {/* Statistics with Kazakhstan context */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">
                  {t('homepage.stats.users')}
                </div>
                <div className="text-white/80 text-sm">
                  {t('homepage.stats.users_label')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">
                  {t('homepage.stats.success_rate')}
                </div>
                <div className="text-white/80 text-sm">
                  {t('homepage.stats.success_label')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">
                  {t('homepage.stats.cities')}
                </div>
                <div className="text-white/80 text-sm">
                  {t('homepage.stats.cities_label')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">
                  {t('homepage.stats.languages')}
                </div>
                <div className="text-white/80 text-sm">
                  {t('homepage.stats.languages_label')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
