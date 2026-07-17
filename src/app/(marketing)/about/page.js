export default function About() {
  return (
    <div className="min-h-(--background) text-foreground font-(--font-sans)">
      {/* Page Header */}
      <header className="py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-(--font-display) tracking-tighter text-white mb-4">
          Our Educational Legacy
        </h1>
        <p className="text-xl text-[#8a8b8c] max-w-2xl mx-auto">
          For over two decades, we've been transforming education across India
          with a consistent philosophy of excellence and innovation.
        </p>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16">
        {/* Timeline Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-(--font-display) text-center text-white mb-16">
            Our Journey Through the Years
          </h2>
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-[rgba(246,82,21,0.3)]"></div>

            {/* Timeline Items */}
            <div className="relative pt-12 pb-8">
              {/* 2001 - Founding */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f65215] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2001</span>
              </div>
              <div className="relative pl-8 pt-4">
                <h3 className="font-(--font-display) text-lg mb-2 text-white">Founding Vision</h3>
                <p className="text-[#8a8b8c]">
                  Established with a mission to provide world-class education
                  accessible to students across India's diverse landscapes.
                </p>
              </div>
            </div>

            <div className="relative pt-12">
              {/* 2005 - First Expansion */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f65215] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2005</span>
              </div>
              <div className="relative pl-8 pt-4">
                <h3 className="font-(--font-display) text-lg mb-2 text-white">First Expansion</h3>
                <p className="text-[#8a8b8c]">
                  Expanded beyond Delhi NCR to establish our first southern
                  campus in Bangalore, bringing our educational philosophy to
                  Silicon Valley of India.
                </p>
              </div>
            </div>

            <div className="relative pt-12">
              {/* 2010 - Technology Integration */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f65215] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2010</span>
              </div>
              <div className="relative pl-8 pt-4">
                <h3 className="font-(--font-display) text-lg mb-2 text-white">Digital Transformation</h3>
                <p className="text-[#8a8b8c]">
                  Introduced smart classrooms and digital learning platforms,
                  becoming pioneers in educational technology adoption.
                </p>
              </div>
            </div>

            <div className="relative pt-12">
              {/* 2015 - National Presence */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f65215] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2015</span>
              </div>
              <div className="relative pl-8 pt-4">
                <h3 className="font-(--font-display) text-lg mb-2 text-white">Pan-India Reach</h3>
                <p className="text-[#8a8b8c]">
                  Achieved our core mission of establishing one quality
                  educational institution in each major state of India.
                </p>
              </div>
            </div>

            <div className="relative pt-12 pb-8">
              {/* 2020 - Adaptive Learning */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f65215] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2020</span>
              </div>
              <div className="relative pl-8 pt-4">
                <h3 className="font-(--font-display) text-lg mb-2 text-white">Adaptive Learning Systems</h3>
                <p className="text-[#8a8b8c]">
                  Implemented personalized learning pathways using AI-driven
                  analytics to cater to individual student needs.
                </p>
              </div>
            </div>

            <div className="relative pt-12">
              {/* 2023 - Present */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f65215] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2023</span>
              </div>
              <div className="relative pl-8 pt-4">
                <h3 className="font-(--font-display) text-lg mb-2 text-white">Excellence Continues</h3>
                <p className="text-[#8a8b8c]">
                  Today we serve over 50,000 students across 28 states with
                  consistent academic excellence and holistic development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-(--font-display) text-center text-white mb-12">
            Leadership & Governance
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Founder */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#f65215] font-bold text-xl">F</span>
                </div>
                <div>
                  <h3 className="font-(--font-display) text-lg mb-1 text-white">Dr. Ananya Sharma</h3>
                  <p className="text-sm text-[#8a8b8c]">Founder & Chairperson</p>
                </div>
              </div>
              <p className="text-[#8a8b8c]">
                With a PhD in Educational Leadership from Oxford and 25 years
                of experience in progressive education, Dr. Sharma founded our
                institution with the vision of creating globally competitive
                learners rooted in Indian values.
              </p>
            </div>

            {/* Academic Director */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#f65215] font-bold text-xl">A</span>
                </div>
                <div>
                  <h3 className="font-(--font-display) text-lg mb-1 text-white">Mr. Vikram Mehta</h3>
                  <p className="text-sm text-[#8a8b8c]">Director of Academics</p>
                </div>
              </div>
              <p className="text-[#8a8b8c]">
                A former IIT professor with expertise in curriculum design,
                Mr. Mehta oversees our academic programs ensuring they meet
                international standards while being culturally relevant.
              </p>
            </div>

            {/* Operations Head */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#f65215] font-bold text-xl">O</span>
                </div>
                <div>
                  <h3 className="font-(--font-display) text-lg mb-1 text-white">Ms. Priya Desai</h3>
                  <p className="text-sm text-[#8a8b8c]">Head of Operations</p>
                </div>
              </div>
              <p className="text-[#8a8b8c]">
                With extensive experience in educational institution
                management, Ms. Desai ensures seamless day-to-day operations
                across all our campuses while maintaining quality standards.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="mb-20 bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-[rgba(255,255,255,0.1)]">
          <h2 className="text-4xl font-(--font-display) text-center text-white mb-8">
            Our Mission & Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-(--font-display) text-lg mb-4 text-[#f65215]">Our Mission</h3>
              <p className="text-[#8a8b8c] mb-4">
                To empower every student with knowledge, skills, and values
                necessary to thrive in an ever-changing world while staying
                rooted in their cultural heritage.
              </p>
              <p className="text-[#8a8b8c]">
                We strive to create lifelong learners who are critical
                thinkers, compassionate leaders, and responsible global
                citizens.
              </p>
            </div>
            <div>
              <h3 className="font-(--font-display) text-lg mb-4 text-[#f65215]">Our Values</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-[#f65215]/20 rounded flex items-center justify-center shrink-0">
                    <span className="text-[#f65215] font-bold">🌟</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Academic Excellence</h4>
                    <p className="text-sm text-[#8a8b8c]">Rigorous standards that challenge and nurture intellectual growth</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-[#f65215]/20 rounded flex items-center justify-center shrink-0">
                    <span className="text-[#f65215] font-bold">🌟</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Holistic Development</h4>
                    <p className="text-sm text-[#8a8b8c]">Balanced focus on intellectual, physical, emotional, and social growth</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-[#f65215]/20 rounded flex items-center justify-center shrink-0">
                    <span className="text-[#f65215] font-bold">🌟</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Innovation & Technology</h4>
                    <p className="text-sm text-[#8a8b8c]">Embracing modern tools to enhance learning experiences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-[#f65215]/20 rounded flex items-center justify-center shrink-0">
                    <span className="text-[#f65215] font-bold">🌟</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Inclusivity & Diversity</h4>
                    <p className="text-sm text-[#8a8b8c]">Celebrating differences and fostering mutual respect</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-[#f65215]/20 rounded flex items-center justify-center shrink-0">
                    <span className="text-[#f65215] font-bold">🌟</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Environmental Stewardship</h4>
                    <p className="text-sm text-[#8a8b8c]">Teaching responsibility towards our planet and sustainable practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}