const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Find the project by ID
  const project = projects.find(p => p.id === parseInt(id));

  // Auto-scroll carousel
  useEffect(() => {
    if (!project || !isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [project, isAutoScrolling]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 glass rounded-full hover:bg-cyan-500/20 transition-all"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="animate-spin-slow absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent"></div>
          <div className="animate-spin-reverse-slow absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-transparent via-purple-500/10 to-transparent"></div>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        <div className="glass-strong border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center hover:scale-105 transition-transform duration-300 group"
              >
                <ArrowLeft size={24} className="mr-3" />
                <span className="text-lg font-medium">Back to Portfolio</span>
              </button>
              
              <div className="flex items-center space-x-4">
                {project.githubLink && (
                  <a 
                    href={project.githubLink}
                    className="flex items-center px-4 py-2 glass rounded-full hover:bg-gray-500/20 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} className="mr-2" />
                    <span>Code</span>
                  </a>
                )}
                {project.figmaLink && (
                  <a 
                    href={project.figmaLink}
                    className="flex items-center px-4 py-2 glass rounded-full hover:bg-purple-500/20 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Figma size={20} className="mr-2" />
                    <span>Design</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Enhanced Image Carousel */}
          <div className="glass-strong rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <div className="relative h-[60vh] md:h-[70vh]">
              <img 
                src={project.images[currentImageIndex]} 
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Auto-scroll controls */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className={`px-4 py-2 glass rounded-full text-sm transition-all ${
                    isAutoScrolling ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {isAutoScrolling ? 'Auto ON' : 'Auto OFF'}
                </button>
              </div>

              {/* Navigation arrows */}
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={() => { setIsAutoScrolling(false); prevImage(); }}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 glass rounded-full hover:bg-white/20 transition-all hover:scale-110"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button 
                    onClick={() => { setIsAutoScrolling(false); nextImage(); }}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 glass rounded-full hover:bg-white/20 transition-all hover:scale-110"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {/* Image indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => { setIsAutoScrolling(false); setCurrentImageIndex(index); }}
                    className={`w-4 h-4 rounded-full transition-all hover:scale-125 ${
                      index === currentImageIndex 
                        ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                        : 'glass hover:bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Progress bar for auto-scroll */}
              {isAutoScrolling && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-75"
                    style={{
                      width: `${((currentImageIndex + 1) / project.images.length) * 100}%`
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Tech Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.technologies.map((tech, index) => (
                    <div key={index} className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-all hover:scale-105">
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem Statement */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Problem Statement
                </h2>
                <p className="text-gray-200 leading-relaxed text-lg">
                  {/* You'll need to add this to your project data */}
                  This project addresses the need for better digital resource management and organization in today's information-heavy work environment.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Solution */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Solution
                </h2>
                <p className="text-gray-200 leading-relaxed text-lg mb-6">
                  {project.expandedDescription}
                </p>
              </div>

              {/* Features */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Key Features
                </h2>
                <ul className="space-y-4">
                  {/* You'll need to add features array to your project data */}
                  {['Intuitive User Interface', 'Real-time Synchronization', 'Cross-platform Compatibility', 'Advanced Search & Filtering', 'Collaborative Features'].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-200 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Impact & Results
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center glass rounded-xl p-4">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">40%</div>
                    <div className="text-gray-300 text-sm">Faster Resource Retrieval</div>
                  </div>
                  <div className="text-center glass rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                    <div className="text-gray-300 text-sm">Active Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};