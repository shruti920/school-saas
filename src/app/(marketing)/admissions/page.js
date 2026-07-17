"use client";

export default function Admissions() {
  return (
    <div className="min-h-(--background) text-foreground font-(--font-sans)">
      {/* Page Header */}
      <header className="py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-(--font-display) tracking-tighter text-white mb-4">
          Join Our Educational Journey
        </h1>
        <p className="text-xl text-[#8a8b8c] max-w-2xl mx-auto">
          A clear, transparent process designed for families seeking excellence
          in education with proven results across India.
        </p>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16">
        {/* 4-Step Admissions Process */}
        <section className="mb-20">
          <h2 className="text-4xl font-(--font-display) text-center text-white mb-16">
            Our Admission Process
          </h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Step 1: Enquire */}
            <div className="flex items-start space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#f65215] font-bold text-2xl">01</span>
              </div>
              <div className="flex-1">
                <h3 className="font-(--font-display) text-xl mb-3 text-white">Enquire</h3>
                <p className="text-[#8a8b8c] mb-4">
                  Begin by filling out our online inquiry form or visiting our
                  campus for an initial consultation with our admissions team.
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#8a8b8c]">
                  <li>Submit online inquiry form</li>
                  <li>Schedule campus visit (optional)</li>
                  <li>Receive information packet</li>
                  <li>Ask questions about curriculum, facilities, fees</li>
                </ul>
              </div>
            </div>

            {/* Step 2: School Visit */}
            <div className="flex items-start space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#f65215] font-bold text-2xl">02</span>
              </div>
              <div className="flex-1">
                <h3 className="font-(--font-display) text-xl mb-3 text-white">School Visit</h3>
                <p className="text-[#8a8b8c] mb-4">
                  Experience our learning environment firsthand. Tour our
                  facilities, meet teachers, and observe classroom dynamics.
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#8a8b8c]">
                  <li>Guided campus tour</li>
                  <li>Classroom observation</li>
                  <li>Meet with academic coordinators</li>
                  <li>Discuss extracurricular opportunities</li>
                </ul>
              </div>
            </div>

            {/* Step 3: Assessment */}
            <div className="flex items-start space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#f65215] font-bold text-2xl">03</span>
              </div>
              <div className="flex-1">
                <h3 className="font-(--font-display) text-xl mb-3 text-white">Assessment</h3>
                <p className="text-[#8a8b8c] mb-4">
                  Age-appropriate evaluation to understand your child's
                  current level and learning needs.
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#8a8b8c]">
                  <li>Developmental assessment (Pre-K to Grade 2)</li>
                  <li>Academic evaluation (Grade 3 and above)</li>
                  <li>Interaction with teachers</li>
                  <li>Review of previous academic records</li>
                </ul>
              </div>
            </div>

            {/* Step 4: Enrollment */}
            <div className="flex items-start space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#f65215] font-bold text-2xl">04</span>
              </div>
              <div className="flex-1">
                <h3 className="font-(--font-display) text-xl mb-3 text-white">Enrollment</h3>
                <p className="text-[#8a8b8c] mb-4">
                  Complete the enrollment process and prepare for your child's
                  first day at our school.
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#8a8b8c]">
                  <li>Submit required documents</li>
                  <li>Complete enrollment forms</li>
                  <li>Pay admission and first term fees</li>
                  <li>Receive welcome kit and academic calendar</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="mb-20">
          <h2 className="text-4xl font-(--font-display) text-center text-white mb-12">
            Start Your Inquiry Today
          </h2>
          <p className="text-xl text-[#8a8b8c] text-center max-w-2xl mx-auto mb-12">
            Our admissions team will respond within 24 hours to answer your
            questions and guide you through the next steps.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submission would be handled here');
            }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215] placeholder-[#8a8b8c]/50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215] placeholder-[#8a8b8c]/50"
                  placeholder="Enter your email"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215] placeholder-[#8a8b8c]/50"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Child's Current Grade</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215] placeholder-[#8a8b8c]/50"
                >
                  <option value="">Select current grade</option>
                  <option value="pre-nursery">Pre-Nursery</option>
                  <option value="nursery">Nursery</option>
                  <option value="lkg">LKG</option>
                  <option value="ukg">UKG</option>
                  <option value="grade-1">Grade 1</option>
                  <option value="grade-2">Grade 2</option>
                  <option value="grade-3">Grade 3</option>
                  <option value="grade-4">Grade 4</option>
                  <option value="grade-5">Grade 5</option>
                  <option value="grade-6">Grade 6</option>
                  <option value="grade-7">Grade 7</option>
                  <option value="grade-8">Grade 8</option>
                  <option value="grade-9">Grade 9</option>
                  <option value="grade-10">Grade 10</option>
                  <option value="grade-11">Grade 11</option>
                  <option value="grade-12">Grade 12</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Preferred Campus Location</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215] placeholder-[#8a8b8c]/50"
                >
                  <option value="">Select preferred location</option>
                  <option value="delhi">Delhi/NCR</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="chennai">Chennai</option>
                  <option value="kolkata">Kolkata</option>
                  <option value="pune">Pune</option>
                  <option value="ahmedabad">Ahmedabad</option>
                  <option value="jaipur">Jaipur</option>
                  <option value="lucknow">Lucknow</option>
                  <option value="kochi">Kochi</option>
                  <option value="goa">Goa</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-[#f65215] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mt-4"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-(--font-display) text-center text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="border-b border-[rgba(255,255,255,0.1)] pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-(--font-display) text-lg mb-2 text-white">What is the student-teacher ratio in your classrooms?</h3>
              <p className="text-[#8a8b8c]">We maintain an optimal student-teacher ratio of 1:15 in primary grades and 1:20 in secondary grades to ensure personalized attention while fostering collaborative learning.</p>
            </div>

            <div className="border-b border-[rgba(255,255,255,0.1)] pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-(--font-display) text-lg mb-2 text-white">Do you offer transportation facilities?</h3>
              <p className="text-[#8a8b8c]">Yes, we provide GPS-enabled bus services with trained drivers and female attendants on all routes. Routes are planned based on student density for optimal pickup times.</p>
            </div>

            <div className="border-b border-[rgba(255,255,255,0.1)] pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-(--font-display) text-lg mb-2 text-white">What curriculum do you follow?</h3>
              <p className="text-[#8a8b8c]">We offer multiple curriculum options including CBSE, ICSE, State Board, and IB, allowing parents to choose based on their child's future academic goals.</p>
            </div>

            <div className="border-b border-[rgba(255,255,255,0.1)] pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-(--font-display) text-lg mb-2 text-white">Are meals provided at school?</h3>
              <p className="text-[#8a8b8c]">We offer a nutritious lunch program designed by certified nutritionists. Meals are prepared fresh daily in our hygienic kitchen facilities with options for vegetarian and non-vegetarian diets.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}