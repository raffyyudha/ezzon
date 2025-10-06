import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                About EZON RENOVATION
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Over two decades of experience in providing genuine and sincere renovation services
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Our Story & Commitment
                </h2>

                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    Our company has over <strong className="text-primary">two decades of experience</strong> in this industry,
                    consistently upholding a commitment to providing genuine and sincere service to our customers.
                  </p>

                  <p className="text-lg">
                    We believe in <strong className="text-primary">a dedication to craftsmanship, reliability, and above all,
                    the enduring bonds we forge with each and every client</strong>. This philosophy has been the cornerstone
                    of our success throughout the years.
                  </p>

                  <p className="text-lg">
                    For many years, our valued clients have not only trusted us to renovate their houses, offices,
                    and other spaces, but have also provided referrals of their friends and family.
                    <strong className="text-primary"> This signifies not just satisfaction but a profound trust in our
                    ongoing commitment to service and after service.</strong>
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
                  >
                    Get In Touch
                  </a>
                  <a
                    href="/services"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center"
                  >
                    View Our Work
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                    }}
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-lg"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Lifetime</div>
                <div className="text-gray-600">Warranty Coverage</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality Craftsmanship</h3>
                <p className="text-gray-600">
                  We take pride in delivering exceptional quality in every project,
                  using only the finest materials and proven techniques.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Client Relationships</h3>
                <p className="text-gray-600">
                  Building lasting relationships with our clients through trust,
                  transparency, and exceptional service.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Reliable Service</h3>
                <p className="text-gray-600">
                  Consistent, dependable service that you can count on,
                  delivered on time and within budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
