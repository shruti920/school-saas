"use client";

export default function Contact() {
  return (
    <div className="min-h-(--background) text-foreground font-(--font-sans)">
      {/* Page Header */}
      <header className="py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-(--font-display) tracking-tighter text-white mb-4">
          Get In Touch
        </h1>
        <p className="text-xl text-[#8a8b8c] max-w-2xl mx-auto">
          Have questions? We're here to help. Reach out to us through any of
          the channels below or visit your nearest campus.
        </p>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16">
        {/* Contact Information & Map */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
            <h2 className="text-3xl font-(--font-display) text-white mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#f65215] font-bold text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-(--font-display) text-lg mb-2 text-white">Headquarters</h3>
                  <p className="text-[#8a8b8c]">
                    123 Education Plaza<br/>
                    New Delhi 110001<br/>
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#f65215] font-bold text-xl">📞</span>
                </div>
                <div>
                  <h3 className="font-(--font-display) text-lg mb-2 text-white">Phone</h3>
                  <p className="text-[#8a8b8c]">
                    +91-11-2345-6789<br/>
                    +91-11-2345-6790 (Admissions)<br/>
                    +91-11-2345-6791 (Accounts)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#f65215] font-bold text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="font-(--font-display) text-lg mb-2 text-white">Email</h3>
                  <p className="text-[#8a8b8c]">
                    info@schoolsaas.edu.in<br/>
                    admissions@schoolsaas.edu.in<br/>
                    careers@schoolsaas.edu.in
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#f65215] font-bold text-xl">🌐</span>
                </div>
                <div>
                  <h3 className="font-(--font-display) text-lg mb-2 text-white">Website</h3>
                  <p className="text-[#8a8b8c]">
                    www.schoolsaas.edu.in
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#f65215]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#f65215] font-bold text-xl">🕐</span>
                </div>
                <div>
                  <h3 className="font-(--font-display) text-lg mb-2 text-white">Office Hours</h3>
                  <p className="text-[#8a8b8c]">
                    Monday - Friday: 8:00 AM - 6:00 PM<br/>
                    Saturday: 9:00 AM - 1:00 PM<br/>
                    Sunday & Public Holidays: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
            <h2 className="text-3xl font-(--font-display) text-white mb-6">Send Us a Message</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Message sent successfully!'); // Would integrate with backend in production
              }}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
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
                  <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215] placeholder-[#8a8b8c]/50"
                    placeholder="Enter subject"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Message</label>
                <textarea
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215] placeholder-[#8a8b8c]/50"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-[#f65215] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Campus Locator */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
            <h2 className="text-3xl font-(--font-display) text-white mb-6">Find Your Campus</h2>
            <p className="text-[#8a8b8c] mb-6">
              With one school per state, quality education is nearby. Select
              your state to see campus details.
            </p>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Select State</label>
              <select
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215]"
                onChange={(e) => {
                  alert(`Showing details for ${e.target.value}`);
                }}
              >
                <option value="">Select a state</option>
                <option value="andhra-pradesh">Andhra Pradesh</option>
                <option value="arunachal-pradesh">Arunachal Pradesh</option>
                <option value="assam">Assam</option>
                <option value="bihar">Bihar</option>
                <option value="chhattisgarh">Chhattisgarh</option>
                <option value="goa">Goa</option>
                <option value="gujarat">Gujarat</option>
                <option value="haryana">Haryana</option>
                <option value="himachal-pradesh">Himachal Pradesh</option>
                <option value="jharkhand">Jharkhand</option>
                <option value="karnataka">Karnataka</option>
                <option value="kerala">Kerala</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="manipur">Manipur</option>
                <option value="meghalaya">Meghalaya</option>
                <option value="mizoram">Mizoram</option>
                <option value="nagaland">Nagaland</option>
                <option value="odisha">Odisha</option>
                <option value="punjab">Punjab</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="sikkim">Sikkim</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="telangana">Telangana</option>
                <option value="tripura">Tripura</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="west-bengal">West Bengal</option>
                {/* Union Territories */}
                <option value="delhi">Delhi</option>
                <option value="puducherry">Puducherry</option>
                <option value="chandigarh">Chandigarh</option>
                <option value="lakshadweep">Lakshadweep</option>
                <option value="andaman-nicobar">Andaman & Nicobar</option>
                <option value="dadra-nagar-haveli">Dadra & Nagar Haveli</option>
                <option value="daman-diu">Daman & Diu</option>
                <option value="ladakh">Ladakh</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}