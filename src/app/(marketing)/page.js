'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headerRef = useRef(null);
  const resultsWallRef = useRef(null);
  const resultsContentRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Animate headline on load
    const headline = headerRef.current?.querySelector('h1');
    if (headline) {
      gsap.fromTo(
        headline.querySelectorAll('span'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out' }
      );
    }

    // Results Wall horizontal scroll
    if (resultsWallRef.current && resultsContentRef.current) {
      const panels = gsap.utils.toArray('.result-panel');
      const containerWidth = panels.reduce((width, panel) => width + panel.offsetWidth, 0) + (panels.length - 1) * 30; // 30px gap between panels

      gsap.to(resultsContentRef.current, {
        x: () => -(containerWidth - resultsWallRef.current.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: resultsWallRef.current,
          start: 'top top',
          end: () => `+=${containerWidth}`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Animate individual panels on scroll
      panels.forEach((panel, index) => {
        gsap.fromTo(
          panel,
          { opacity: 0.5, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'left center+=100',
              end: 'right center-=100',
              scrub: true
            }
          }
        );
      });
    }

    // Reveal sections on scroll
    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)]">
      {/* Hero Section */}
      <section
        ref={headerRef}
        className="min-h-[85vh] flex flex-col items-center justify-center px-6 py-12 md:py-20 text-center relative overflow-hidden"
      >
        <div className="relative z-10">
          {/* We'll split the heading into words for animation */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[var(--font-display)] tracking-tighter leading-none mb-6 text-white"
          >
            <span className="inline-block">One</span>{' '}
            <span className="inline-block">classroom</span>{' '}
            <span className="inline-block">philosophy.</span><br className="hidden md:inline-block"/>
            <span className="inline-block">Every</span>{' '}
            <span className="inline-block">state.</span><br className="hidden md:inline-block"/>
            <span className="inline-block">Real</span>{' '}
            <span className="inline-block">results.</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl text-[#8a8b8c] mb-8">
            A franchise of Indian schools spanning one school per state, delivering
            trusted results (board rankings, JEE/NEET scores, 20+ years legacy)
            while feeling current for Gen Z students and digitally-fluent parents.
          </p>
          <div className="flex space-x-4 flex-wrap justify-center">
            <a href="/school-locator" className="bg-[#f65215] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Find your nearest school
            </a>
            <a href="/admissions" className="border border-[#f65215] text-[#f65215] px-6 py-3 rounded-lg font-medium hover:bg-[rgba(246,82,21,0.1)] transition-all">
              Book a visit
            </a>
          </div>
        </div>

        {/* Floating glass stat pills (background decoration) */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-12 bg-[rgba(246,82,21,0.1)] backdrop-blur-sm rounded-2xl border border-[rgba(246,82,21,0.2)]"
          ></div>
          <div
            className="absolute bottom-20 right-1/4 w-28 h-10 bg-[rgba(246,82,21,0.08)] backdrop-blur-sm rounded-xl border border-[rgba(246,82,21,0.15)]"
          ></div>
          <div
            className="absolute top-1/3 left-10 w-24 h-8 bg-[rgba(246,82,21,0.06)] backdrop-blur-sm rounded-lg border border-[rgba(246,82,21,0.1)]"
          ></div>
        </div>
      </section>

      {/* Results Wall - The Signature Element */}
      <section
        ref={resultsWallRef}
        className="relative bg-[var(--background)] overflow-hidden"
      >
        <div className="relative z-10 pt-20 pb-16">
          <h2 className="sr-only">Results Wall</h2>
          <div
            ref={resultsContentRef}
            className="flex w-full h-[600px] overflow-hidden relative"
          >
            {/* State cards for horizontal scroll */}
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((index) => (
              <div
                key={index}
                className="result-panel shrink-0 w-[300px] flex-shrink-0 mr-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-[#f65215] font-bold text-xl">{index}</span>
                </div>
                <h3 className="font-[var(--font-display)] text-lg mb-2 text-white">State {index}</h3>
                <p className="text-[#8a8b8c] text-sm">98.2% Board Pass</p>
                <p className="text-[#8a8b8c] text-sm mt-2">Top 100 JEE Rank</p>
              </div>
            ))}
          </div>
        </div>

        {/* India Map Preview (unpins after scroll) */}
        <div ref={mapRef} className="relative mt-16" id="map-preview">
          <div
            className="w-[90%] max-w-6xl mx-auto h-[400px] bg-[var(--muted)] rounded-xl overflow-hidden relative"
          >
            <div className="absolute inset-0 flex items-center justify-center text-[#8a8b8c]">
              Interactive India Map with Ember Pins<br/>
              (GSAP ScrollTrigger implementation placeholder)
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section - Chalt background with light glass cards */}
      <section
        className="bg-[var(--muted)] py-20 reveal-section"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-[var(--font-display)] text-center text-[var(--foreground)] mb-12">
            Programs for Every Stage
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Nursery */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-[#f65215] font-bold text-sm">N</span>
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-lg mb-2 text-[var(--foreground)]">Nursery</h3>
                  <p className="text-[#8a8b8c]">Play-based learning foundation for ages 2.5-4</p>
                </div>
              </div>
            </div>

            {/* Primary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-[#f65215] font-bold text-sm">P</span>
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-lg mb-2 text-[var(--foreground)]">Primary</h3>
                  <p className="text-[#8a8b8c]">Building core competencies in literacy and numeracy</p>
                </div>
              </div>
            </div>

            {/* Secondary - Science */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-[#f65215] font-bold text-sm">S</span>
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-lg mb-2 text-[var(--foreground)]">Science</h3>
                  <p className="text-[#8a8b8c]">Physics, Chemistry, Biology with lab focus</p>
                </div>
              </div>
            </div>

            {/* Secondary - Humanities */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-[#f65215] font-bold text-sm">H</span>
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-lg mb-2 text-[var(--foreground)]">Humanities</h3>
                  <p className="text-[#8a8b8c]">History, Geography, Economics, Languages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section - Dark background */}
      <section className="bg-[var(--background)] py-20 reveal-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-[var(--font-display)] text-center text-white mb-12">
            Why Choose Our Franchise
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
              <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#f65215] font-bold text-xl">👩‍🏫</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl mb-4 text-white">Qualified Faculty</h3>
              <p className="text-[#8a8b8c]">CBSE/ICSE/State board certified teachers with 10+ years avg experience</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
              <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#f65215] font-bold text-xl">📱</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl mb-4 text-white">Digital Progress Tracking</h3>
              <p className="text-[#8a8b8c]">Parent portal with real-time attendance, grades, and teacher feedback</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
              <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#f65215] font-bold text-xl">📊</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl mb-4 text-white">Proven Results</h3>
              <p className="text-[#8a8b8c]">92% average board pass rate, Top 1000 JEE ranks nationally</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
              <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#f65215] font-bold text-xl">🌍</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl mb-4 text-white">Nationwide Presence</h3>
              <p className="text-[#8a8b8c]">One school per state - consistent quality across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Light background */}
      <section className="bg-[var(--muted)] py-20 reveal-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-[var(--font-display)] text-center text-[var(--foreground)] mb-12">
            What Parents Say
          </h2>

          <div className="relative overflow-hidden">
            <div className="flex space-x-6">
              {/* Parent Testimonial 1 */}
              <div className="min-w-[320px] bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] flex-shrink-0">
                <p className="text-[#8a8b8c] italic mb-4">"Both my children have shown remarkable improvement since joining. The individual attention they receive is unmatched."</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#f65215] font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-[var(--font-display)] text-lg text-[var(--foreground)]">Meera Sharma</h4>
                    <p className="text-sm text-[#8a8b8c]">Delhi Parent</p>
                  </div>
                </div>
              </div>

              {/* Parent Testimonial 2 */}
              <div className="min-w-[320px] bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] flex-shrink-0">
                <p className="text-[#8a8b8c] italic mb-4">"The digital portfolio system lets me see my daughter's progress weekly. Teachers are incredibly responsive."</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#f65215] font-bold">P</span>
                  </div>
                  <div>
                    <h4 className="font-[var(--font-display)] text-lg text-[var(--foreground)]">Priya Menon</h4>
                    <p className="text-sm text-[#8a8b8c]">Bangalore Parent</p>
                  </div>
                </div>
              </div>

              {/* Alumnus Testimonial */}
              <div className="min-w-[320px] bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] flex-shrink-0">
                <p className="text-[#8a8b8c] italic mb-4">"The foundation I received here prepared me for IIT. The focus on conceptual learning made all the difference."</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#f65215] font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-[var(--font-display)] text-lg text-[var(--foreground)]">Arjun Patel</h4>
                    <p className="text-sm text-[#8a8b8c]">IIT Bombay Alumni</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions CTA Banner - Dark background with Ember accent */}
      <section className="bg-[var(--background)] py-16 reveal-section">
        <div className="container mx-auto px-6">
          <div className="bg-[rgba(246,82,21,0.08)] backdrop-blur-sm rounded-2xl p-10 text-center border border-[rgba(246,82,21,0.2)]">
            <h3 className="font-[var(--font-display)] text-2xl mb-4 text-[#f65215]">
              Ready to Join Our Educational Journey?
            </h3>
            <p className="text-lg text-[#8a8b8c] max-w-2xl mx-auto mb-6">
              Experience the difference of a modern, results-driven education system
              with traditional values at its core.
            </p>
            <a href="/admissions" className="bg-[#f65215] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Start Admission Process
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Dark background */}
      <footer className="bg-[var(--background)] py-12 reveal-section">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-[#8a8b8c]">
            <div>
              <h4 className="font-[var(--font-display)] text-lg mb-4 text-white">SchoolSaaS</h4>
              <p className="mb-2">Empowering education across India with technology-enabled learning</p>
              <p className="mb-4">One school per state. Consistent quality. Proven results.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-opacity">Facebook</a>
                <a href="#" className="hover:text-white transition-opacity">Instagram</a>
                <a href="#" className="hover:text-white transition-opacity">Twitter</a>
                <a href="#" className="hover:text-white transition-opacity">YouTube</a>
              </div>
            </div>
            <div>
              <h4 className="font-[var(--font-display)] text-lg mb-4 text-white">Quick Links</h4>
              <nav className="space-y-2">
                <a href="#" className="hover:text-white transition-opacity">Home</a>
                <a href="#" className="hover:text-white transition-opacity">School Locator</a>
                <a href="#" className="hover:text-white transition-opacity">Admissions</a>
                <a href="#" className="hover:text-white transition-opacity">About</a>
                <a href="#" className="hover:text-white transition-opacity">Contact</a>
              </nav>
            </div>
            <div>
              <h4 className="font-[var(--font-display)] text-lg mb-4 text-white">Resources</h4>
              <nav className="space-y-2">
                <a href="#" className="hover:text-white transition-opacity">Curriculum</a>
                <a href="#" className="hover:text-white transition-opacity">Fee Structure</a>
                <a href="#" className="hover:text-white transition-opacity">Academic Calendar</a>
                <a href="#" className="hover:text-white transition-opacity">Careers</a>
              </nav>
            </div>
            <div>
              <h4 className="font-[var(--font-display)] text-lg mb-4 text-white">Contact Info</h4>
              <p className="mb-2">123 Education Plaza, New Delhi 110001</p>
              <p className="mb-2">+91-11-2345-6789</p>
              <p className="mb-2">info@schoolsaas.edu.in</p>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-[rgba(255,255,255,0.1)] text-center text-sm text-[#8a8b8c]">
            © {new Date().getFullYear()} SchoolSaaS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}