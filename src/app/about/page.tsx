import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/about.jpg')`,
            }}
          />
          {/* Overlay with same opacity as hero */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                EZON RENOVATION<br/>PTE LTD
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Over two decades of experience in providing genuine and sincere renovation services
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/about2.jpg')`,
            }}
          />
          {/* Overlay with same opacity as hero */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">
                  Our Story & Commitment
                </h2>

                <div className="space-y-6 text-gray-200 leading-relaxed">
                  <p className="text-lg">
                    In a landscape crowded with competitors, our company stands out through the enduring loyalty of our customers. For many years, they've not only let our company renovation their house, office, and other but also with the referrals of their friends and family. <strong className="text-primary">This signifies not just satisfaction but a profound trust in our Ongoing commitment to service and aftercare.</strong>
                  </p>

                  <p className="text-lg">
                    We understand renovations, the greatest fear is completion without after services. For over two decades, we've safeguarded against such scenarios, ensuring that unfinished projects and lost connections are never part of our narrative.
                  </p>

                  <p className="text-lg">
                    <strong className="text-primary">It's a testament to our ethos: a dedication to craftsmanship, reliability, and above all, the enduring bonds we forge with each and every client.</strong>
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
                      backgroundImage: `url('/images/mall.jpg')`,
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

        {/* Stats & Values Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/about3.jpg')`,
            }}
          />
          {/* Overlay with same opacity as hero */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <div className="text-gray-200">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-200">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-200">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Lifetime</div>
                <div className="text-gray-200">Warranty Coverage</div>
              </div>
            </div>

            {/* Core Values */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Quality Craftsmanship</h3>
                <p className="text-gray-200">
                  We take pride in delivering exceptional quality in every project,
                  using only the finest materials and proven techniques.
                </p>
              </div>

              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Client Relationships</h3>
                <p className="text-gray-200">
                  Building lasting relationships with our clients through trust,
                  transparency, and exceptional service.
                </p>
              </div>

              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Reliable Service</h3>
                <p className="text-gray-200">
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
