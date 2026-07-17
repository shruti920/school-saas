"use client";

export default function SchoolLocator() {
  return (
    <div className="min-h-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)]">
      {/* Page Header */}
      <header className="py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-[var(--font-display)] tracking-tighter text-white mb-4">
          Find Your Nearby School
        </h1>
        <p className="text-xl text-[#8a8b8c] max-w-2xl mx-auto">
          With one school per state, quality education is never far away. Use our
          interactive locator to find the school nearest to you.
        </p>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-16">
        {/* Search Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-[rgba(255,255,255,0.1)]">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-[#8a8b8c] mb-2">State</label>
                <select className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215]">
                  <option value="">All States</option>
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
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-[#8a8b8c] mb-2">Board</label>
                <select className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f65215]">
                  <option value="">All Boards</option>
                  <option value="cbse">CBSE</option>
                  <option value="icse">ICSE</option>
                  <option value="state-board">State Board</option>
                  <option value="ib">IB</option>
                  <option value="cambridge">Cambridge</option>
                </select>
              </div>
              <button
                onClick={() => alert('Search functionality would be implemented here')}
                className="bg-[#f65215] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Search Schools
              </button>
            </div>
          </div>
        </div>

        {/* Results Map & List */}
        <div className="grid gap-8">
          {/* Interactive Map */}
          <div className="col-span-2 lg:col-span-2">
            <div className="aspect-[16/9] w-full bg-[var(--muted)] rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0">
                {/* Map container - would integrate with Mapbox/Google Maps */}
                <div className="w-full h-full" id="school-map">
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--foreground)] bg-black/50">
                    Interactive Map of India<br/>
                    <span className="block text-sm">(GSAP-powered zoom/rotate on scroll)</span>
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 left-4 z-10 flex space-x-3">
                <button
                  onClick={() => alert('Zoom in functionality')}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
                <button
                  onClick={() => alert('Zoom out functionality')}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button
                  onClick={() => alert('Locate me functionality')}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12.08 22l4.59-4.59L18 8.06l-6-6-6 6 3.51 3.51L12.08 22z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* School List */}
          <div className="col-span-2 lg:col-span-2">
            <div className="space-y-6">
              {/* School Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] hover:bg-white/20 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-[#f65215] font-bold text-xl">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[var(--font-display)] text-lg mb-2 text-white">Delhi Public School</h3>
                    <div className="flex items-center space-x-3 text-sm text-[#8a8b8c] mb-2">
                      <span>📍 Sector 24, Rohini, Delhi 110085</span>
                      <span>•</span>
                      <span>📞 +91-11-2704-1234</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">CBSE</span>
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">Co-ed</span>
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">Est. 1995</span>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => alert('View details functionality')}
                        className="bg-[#f65215] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => alert('Enquire functionality')}
                        className="ml-3 border border-[#f65215] text-[#f65215] px-4 py-2 rounded-lg font-medium hover:bg-[rgba(246,82,21,0.1)] transition-all"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] hover:bg-white/20 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-[#f65215] font-bold text-xl">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[var(--font-display)] text-lg mb-2 text-white">Mumbai International School</h3>
                    <div className="flex items-center space-x-3 text-sm text-[#8a8b8c] mb-2">
                      <span>📍 Bandra Kurla Complex, Mumbai 400051</span>
                      <span>•</span>
                      <span>📞 +91-22-2642-1234</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">IB</span>
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">Co-ed</span>
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">Est. 2001</span>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => alert('View details functionality')}
                        className="bg-[#f65215] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Visit Details
                      </button>
                      <button
                        onClick={() => alert('Enquire functionality')}
                        className="ml-3 border border-[#f65215] text-[#f65215] px-4 py-2 rounded-lg font-medium hover:bg-[rgba(246,82,21,0.1)] transition-all"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Card 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] hover:bg-white/20 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#f65215]/20 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-[#f65215] font-bold text-xl">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[var(--font-display)] text-lg mb-2 text-white">Bangalore Public School</h3>
                    <div className="flex items-center space-x-3 text-sm text-[#8a8b8c] mb-2">
                      <span>📍 Jayanagar, Bangalore 560011</span>
                      <span>•</span>
                      <span>📞 +91-80-2244-1234</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">ICSE</span>
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">Co-ed</span>
                      <span className="bg-[#f65215]/20 text-[#f65215] px-3 py-1 rounded text-sm font-medium">Est. 1987</span>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => alert('View details functionality')}
                        className="bg-[#f65215] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => alert('Enquire functionality')}
                        className="ml-3 border border-[#f65215] text-[#f65215] px-4 py-2 rounded-lg font-medium hover:bg-[rgba(246,82,21,0.1)] transition-all"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}