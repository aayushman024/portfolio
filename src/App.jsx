import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, FileText, Figma, X, ChevronDown, ChevronUp,
  Code, Menu, GraduationCap, Calendar, MapPin, Award, ArrowRight
} from 'lucide-react';

// assets
import logo from './assets/logo.jpg';
import nokiaLogo from './assets/nokia.png';
import celebalLogo from './assets/ct.jpeg';
import microsoftLogo from './assets/microsoft.jpg';
import mujarLogo from './assets/muj.png';
import dpsLogo from './assets/dps.png';
import davLogo from './assets/dav.png';
import mniveshLogo from './assets/mnivesh.png';
import me from './assets/me.png';

// intersection observer for scroll reveals
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedExpId, setExpandedExpId] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navItems = [
    { id: 'hero', label: '01. Home' },
    { id: 'experience', label: '02. Experience' },
    { id: 'projects', label: '03. Work' },
    { id: 'achievements', label: '04. Achievements' },
    { id: 'education', label: '05. Education' }
  ];

  // track scroll for nav styling and active sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 150;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + rect.height) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const personalInfo = {
    name: "Aayushman Ranjan",
    title: "Software Engineer",
    description: "Results-driven Software Engineer with 1+ years of experience in mobile and full-stack development. Proven ability to build, optimize, and deploy production-ready applications utilizing Android, Flutter, and tailored backend architectures.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/aayushmanranjan",
      github: "https://github.com/aayushman024",
      figma: "https://www.figma.com/design/vjWil3kZIgbbUQDqpHB2qy/UI-UX-Samples",
      resume: "#"
    }
  };

  const experience = [
    {
      id: 0,
      company: "mNivesh",
      position: "Software Developer (SDE-1)",
      duration: "Sept 2025 - Present",
      location: "Delhi, India",
      logo: mniveshLogo,
      shortDescription: "Leading mobile dev for enterprise Android/Flutter products and a unified FinTech platform managing INR 750 Cr+ AUM.",
      whatIDid: [
        "Primary mobile engineer developing enterprise Flutter and Android applications for financial services and workforce management, using Node.js, MongoDB, and Azure in production environments.",
        "Building a full-stack wealth management platform that unifies Mutual Funds, Insurance, and Stocks, serving 8,000+ clients managing over INR 750 Cr AUM.",
        "Developed a secure internal enterprise super app with SSO, RBAC, and GPS-based attendance, consolidating CRM tools, leave management, and internal app distribution; implemented an OTA update pipeline using Shorebird and FCM for automated deployments.",
        "Engineered a custom Android dialer using the Android Telecom Framework with real-time CRM data overlays and offline-first architecture using RoomDB, Coroutines, and WorkManager, eliminating manual call logging and improving sales team efficiency by 40%."
      ],
      skills: ["Flutter", "Android/Kotlin", "Node.js", "MongoDB", "Azure"]
    },
    {
      id: 1,
      company: "Nokia Solutions & Networks",
      position: "Software Engineering Intern",
      duration: "Jul 2024 - May 2025",
      location: "Gurugram, India",
      logo: nokiaLogo,
      shortDescription: "Delivered production applications across Flutter, React, and Django REST, improving workflows for 1,000+ engineers.",
      whatIDid: [
        "Delivered 5+ production applications across Flutter, React, and Django REST, improving operational workflows for 1,000+ telecom field engineers and increasing task efficiency by 35%.",
        "Built a multilingual field support platform using Flutter, Django REST, and Firebase with speech-to-text search, training quizzes, and a centralized documentation hub, reducing troubleshooting time by 25%."
      ],
      skills: ["Flutter", "React", "Django REST", "Firebase"]
    },
    {
      id: 2,
      company: "Celebal Technologies",
      position: "Summer Intern",
      duration: "May 2024 - Jul 2024",
      location: "Remote",
      logo: celebalLogo,
      shortDescription: "Developed REST APIs with Django and integrated them with React frontends.",
      whatIDid: [
        "Developed and optimized RESTful APIs and microservices using Django REST.",
        "Integrated APIs with React frontends, ensuring seamless UI interactions."
      ],
      skills: ["Django REST", "React", "Git"]
    },
    {
      id: 3,
      company: "Microsoft Future Ready Talent",
      position: "Virtual Intern",
      duration: "May 2023 - Jul 2023",
      location: "Remote",
      logo: microsoftLogo,
      shortDescription: "Completed guided modules focusing on cloud computing, Azure, and AI fundamentals.",
      whatIDid: [
        "Explored core concepts of Microsoft Azure, Git, GitHub, and Artificial Intelligence through guided modules.",
        "Built foundational awareness of how cloud and AI integrate into modern enterprise solutions."
      ],
      skills: ["Azure", "Cloud", "AI"]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "mNivesh Central",
      description: "Secure enterprise super app unifying CRM, leave management, and proprietary app distribution into a unified employee platform.",
      expandedDescription: "Leading development of a secure enterprise super app with SSO, RBAC, and location-based check-in/check-out. Architected a background download engine with OTA updates via Shorebird, automated APK delivery, and FCM notifications under MVVM/Provider for real-time workforce alignment.",
      technologies: ["Flutter", "Node.js", "MongoDB", "FCM", "Shorebird"],
      year: "2026",
      images: []
    },
    {
      id: 2,
      title: "Callyn",
      description: "Enterprise custom dialer using Android Telecom Framework with a real-time In-Call Screen and live client data.",
      expandedDescription: "Engineered an enterprise custom dialer using Android Telecom Framework with a real-time In-Call Screen, live client data, and dual-profile data isolation, eliminating 100% of manual CRM logging. Followed MVVM with Room DB caching, Kotlin Coroutines, and WorkManager for battery-efficient sync, boosting employee efficiency by 40%.",
      technologies: ["Kotlin", "Node.js", "MongoDB", "RoomDB", "Android Telecom"],
      year: "2025-2026",
      images: []
    },
    {
      id: 3,
      title: "Lighthouse",
      description: "Real-time location tracking Android app and secure web dashboard.",
      expandedDescription: "Developed a real-time location tracking Android app using Flutter foreground services to stream device location on movement detection or every 15 minutes, storing data in Firebase Firestore, and optimizing background processing to limit battery usage to about 4% per hour. Built a secure Flutter Web dashboard with Firebase Authentication to monitor device locations centrally.",
      technologies: ["Flutter", "Firebase", "Firestore"],
      year: "2025",
      images: []
    },
    {
      id: 4,
      title: "GoStash",
      description: "Productivity app to organize digital resources and explore curated collections.",
      expandedDescription: "Built a productivity app that helps users organize and retrieve 1000+ digital resources and bookmarks, designed through insights from 100+ user feedback surveys. Improved information discovery and navigation through iterative UX optimization, achieving a 40% reduction in link retrieval time during internal testing.",
      technologies: ["React Native", "Node.js", "MongoDB"],
      year: "2025",
      images: []
    },
    {
      id: 5,
      title: "CareAssist",
      description: "Multilingual field engineer app simplifying telecom equipment troubleshooting.",
      expandedDescription: "Cross-platform mobile application supporting field engineers working with clients like Airtel and BSNL. Provides troubleshooting guides, videos, and alarms, reducing triage time by 25%.",
      technologies: ["React Native", "Django REST", "MySQL"],
      year: "2024",
      images: []
    },
    {
      id: 6,
      title: "Project Management System",
      description: "Web app streamlining team progress tracking and reporting with custom dashboards.",
      expandedDescription: "Full-stack web application developed using React and Django REST Framework, designed to simplify project tracking and team management. Improved team reporting efficiency by 60%.",
      technologies: ["React", "Tailwind CSS", "Django REST"],
      year: "2024",
      images: []
    },
    {
      id: 7,
      title: "Hot Issues Dashboard",
      description: "Dashboard for tracking critical issues in Nokia’s NI product lineup.",
      expandedDescription: "Real-time mobile and web application built using Flutter, React and Django REST to monitor and manage major issues across Nokia’s Network Infrastructure products.",
      technologies: ["Flutter", "React", "Django REST"],
      year: "2024",
      images: []
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Cisco CCNAv7: Switching, Routing, and Wireless Essentials",
      description: "Completed comprehensive certification covering networking fundamentals, routing, switching, and wireless concepts."
    },
    {
      id: 2,
      title: "Dean's List - Computer Science Department",
      description: "Recognized for academic excellence, achieving the highest grade point average in the 6th and 8th semesters at Manipal University Jaipur."
    },
    {
      id: 3,
      title: "President - Cyber Space Club",
      description: "Led the club's operations and strategy, organizing 15+ tech events and initiatives that promoted innovation, teamwork, and leadership, impacting over 2500 students across campus."
    },
  ];

  const education = [
    {
      id: 1,
      institution: "Manipal University Jaipur",
      course: "B.Tech Computer Science & Engineering",
      duration: "2021 - 2025",
      location: "Jaipur, Rajasthan",
      marks: "CGPA: 8.04",
      logo: mujarLogo,
      description: "Specialized in software engineering, data structures, algorithms, and mobile app development."
    },
    {
      id: 2,
      institution: "Delhi Public School, Ranchi",
      course: "Senior Secondary (Class XII)",
      duration: "2019 - 2021",
      location: "Ranchi, Jharkhand",
      marks: "95%",
      logo: dpsLogo,
      description: "Science stream with PCM (Physics, Chemistry, Mathematics) and Computer Science."
    },
    {
      id: 3,
      institution: "DAV Public School, Hehal, Ranchi",
      course: "Secondary (Class X)",
      duration: "2018 - 2019",
      location: "Ranchi, Jharkhand",
      marks: "93.6%",
      logo: davLogo,
      description: "Comprehensive secondary education with focus on Science and Mathematics."
    }
  ];

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-300 relative selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden font-sans">

      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 40%)`
        }}
      />

      {/* Modern Enterprise Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(24,24,27,1),rgba(10,10,11,1))]">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-indigo-900/10 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-slate-800/20 blur-[150px] mix-blend-screen" />
      </div>

      {/* enhanced glassmorphism nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl shadow-black/50' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection('hero')} className="flex items-center gap-3 group relative">
              <div className="absolute inset-0 bg-zinc-200 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border border-zinc-700/50 group-hover:border-zinc-500/80 transition-all duration-300 relative z-10" />
              <span className="font-extrabold text-xl tracking-tighter text-zinc-100 group-hover:text-zinc-100 transition-colors">
                <span className="text-zinc-100">A</span>R.
              </span>
            </button>

            <div className="hidden md:flex items-center gap-8 font-mono text-xs font-medium">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 hover:text-zinc-300 hover:-translate-y-0.5 ${activeSection === item.id ? 'text-zinc-100' : 'text-zinc-400'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={personalInfo.socialLinks.resume}
                target="_blank" rel="noreferrer"
                className="px-5 py-2 border border-white/10 text-zinc-100 rounded hover:bg-zinc-100/10 hover:border-zinc-500 hover:shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-all duration-300"
              >
                Resume
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20 px-6 max-w-6xl mx-auto relative z-10 w-full">
        <RevealOnScroll>
          <div className="w-full flex flex-col">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-zinc-100 tracking-tighter mb-8 lg:mb-10 pl-4 md:pl-0">
              Hi, I'm {personalInfo.name}.
            </h1>
            
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch w-full">
              <div className="lg:col-span-7 relative flex flex-col">
                <div className="bg-[#111113]/60 p-8 md:p-12 rounded-3xl border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-colors duration-500 h-full flex flex-col justify-center">
                  {/* Optional: subtle ambient inner shine */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* punchy gradient text */}
                  <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 text-2xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight relative z-10">
                    Delivering impactful full-stack & mobile experiences.
                  </h2>

                  <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-12 font-light relative z-10">
                    {personalInfo.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-5 font-mono text-sm relative z-10 mt-auto">
                    <a
                      href="mailto:aayushmanranjan24@gmail.com"
                      className="px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-black font-semibold tracking-wide rounded hover:-translate-y-1 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_14px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_20px_rgba(255,255,255,0.15)]"
                    >
                      Say Hello
                    </a>
                    <a
                      href={personalInfo.socialLinks.github}
                      target="_blank" rel="noreferrer"
                      className="p-4 bg-white/5 border border-white/10 rounded hover:border-white/20 hover:bg-zinc-100/10 hover:text-zinc-100 hover:-translate-y-1 transition-all duration-300 text-zinc-300 backdrop-blur-sm"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank" rel="noreferrer"
                      className="p-4 bg-white/5 border border-white/10 rounded hover:border-white/20 hover:bg-zinc-100/10 hover:text-zinc-100 hover:-translate-y-1 transition-all duration-300 text-zinc-300 backdrop-blur-sm"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right side image - Hidden on smaller screens but clearly visible on large screens */}
              <div className="lg:col-span-5 hidden lg:flex justify-center items-stretch relative">
                <div className="relative w-full h-full bg-[#111113]/60 rounded-3xl border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden pt-12 px-6 flex justify-center items-end group hover:border-white/10 transition-colors duration-500">
                  
                  {/* Optional: subtle ambient inner shine */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* ambient background glow specifically for the image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none"></div>

                  <img 
                    src={me} 
                    alt="Aayushman Ranjan" 
                    className="relative z-10 w-full max-w-[320px] h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 transition-all duration-500 origin-bottom group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-6 max-w-4xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
              <span className="text-zinc-100 font-mono text-xl">02.</span> Experience
            </h2>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>
        </RevealOnScroll>

        <div className="space-y-12">
          {experience.map((exp, index) => {
            const isExpanded = expandedExpId === exp.id;

            return (
              <RevealOnScroll key={exp.id} delay={index * 100}>
                <div className="relative pl-8 md:pl-0 group">
                  <div className="md:grid md:grid-cols-12 md:gap-8 items-start">
                    <div className="md:col-span-3 text-zinc-400 font-mono text-sm mt-1 mb-2 md:mb-0 flex flex-col md:items-end md:pr-4">
                      <span>{exp.duration}</span>
                    </div>

                    <div className="md:col-span-9 relative">
                      <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full border-2 border-zinc-500 bg-black md:hidden"></div>

                      <div className="flex items-center gap-4 mb-2">
                        {exp.logo && (
                          <img src={exp.logo} alt={exp.company} className="w-10 h-10 rounded-full border border-zinc-700 object-cover" />
                        )}
                        <h3 className="text-xl font-bold text-zinc-200">
                          {exp.position} <span className="text-zinc-100">@ {exp.company}</span>
                        </h3>
                      </div>

                      <div
                        className="mt-3 cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors"
                        onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                      >
                        <p className="text-sm md:text-base leading-relaxed">{exp.shortDescription}</p>

                        {/* smooth accordion expansion */}
                        <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                          <div className="overflow-hidden">
                            <div className="space-y-3 pb-4">
                              {exp.whatIDid.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <span className="text-zinc-100 mt-1.5 text-xs">▹</span>
                                  <p className="text-zinc-300 leading-relaxed text-sm md:text-base">{item}</p>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-2 pb-2">
                              {exp.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 rounded-full bg-zinc-200/10 text-zinc-300 text-xs font-mono">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <span className="text-zinc-100 text-sm flex items-center gap-1 font-mono mt-2 hover:translate-x-1 transition-transform inline-flex">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold text-zinc-100"><span className="text-zinc-100 font-mono text-xl mr-2">03.</span> Selected Work</h2>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6 transition-all duration-500">
          {visibleProjects.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 100}>
              <div
                className="bg-[#111113] p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.8)] hover:border-white/10 relative overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <Code className="text-zinc-100 group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-zinc-500 font-mono text-sm">{project.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-200 group-hover:text-zinc-100 transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-3 font-mono text-xs text-zinc-500 mt-4">
                  {project.technologies.map(tech => (
                    <li key={tech} className="group-hover:text-zinc-300/80 transition-colors">{tech}</li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {projects.length > 4 && (
          <RevealOnScroll delay={200}>
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-6 py-3 border border-white/20 text-zinc-100 rounded font-mono text-sm hover:bg-zinc-100/10 transition-colors flex items-center gap-2 group"
              >
                {showAllProjects ? 'Show Less' : 'Show More'}
                {showAllProjects ? <ChevronUp size={16} /> : <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />}
              </button>
            </div>
          </RevealOnScroll>
        )}
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold text-zinc-100"><span className="text-zinc-100 font-mono text-xl mr-2">04.</span> Achievements</h2>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <RevealOnScroll key={achievement.id} delay={index * 150}>
              <div className="bg-[#111113] p-8 rounded-2xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col group border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.8)] hover:border-white/10">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-white/5 rounded-lg mr-4 group-hover:bg-zinc-100/10 transition-colors flex-shrink-0 border border-white/5">
                    <Award className="text-zinc-100" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-200 mb-3 group-hover:text-zinc-100 transition-colors">{achievement.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{achievement.description}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold text-zinc-100"><span className="text-zinc-100 font-mono text-xl mr-2">05.</span> Education</h2>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <RevealOnScroll key={edu.id} delay={index * 150}>
              <div className="bg-[#111113] p-6 rounded-2xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col group border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.8)] hover:border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  {edu.logo ? (
                    <img src={edu.logo} alt={edu.institution} className="w-12 h-12 rounded-full border border-zinc-700 bg-zinc-900 object-contain p-1" />
                  ) : (
                    <div className="p-3 bg-white/5 rounded-full group-hover:bg-zinc-100/10 transition-colors border border-white/5">
                      <GraduationCap className="text-zinc-100" size={24} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-zinc-200 leading-tight">{edu.institution}</h3>
                    <div className="flex items-center text-zinc-400 text-xs mt-1 font-mono">
                      <MapPin size={12} className="mr-1" />
                      {edu.location}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-zinc-100 mb-2 text-sm">{edu.course}</h4>
                  <div className="flex items-center text-zinc-400 text-xs mb-3 font-mono">
                    <Calendar size={12} className="mr-2" />
                    <span>{edu.duration}</span>
                  </div>
                  <p className="text-zinc-300 text-sm mb-4">{edu.marks}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{edu.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 pb-32 text-center font-mono text-xs text-zinc-500 border-t border-white/5 relative z-10">
        <p>Built with <span className="text-zinc-100">☕</span> by Aayushman Ranjan</p>
      </footer>

      {/* Project Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0a0a0a] w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto border border-white/10">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white z-10 p-2 bg-white/5 rounded-full hover:rotate-90 transition-transform"
            >
              <X size={20} />
            </button>
            <div className="p-8 sm:p-10">
              <span className="text-zinc-100 font-mono text-sm mb-2 block">{selectedProject.year}</span>
              <h3 className="text-3xl font-bold text-zinc-100 mb-6">{selectedProject.title}</h3>

              <div className="bg-white/5 p-6 rounded text-zinc-300 leading-relaxed mb-8 border border-white/5">
                {selectedProject.expandedDescription}
              </div>

              <div>
                <h4 className="font-mono text-sm text-zinc-500 mb-4 flex items-center gap-2">
                  <Code size={16} /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 text-zinc-300 rounded font-mono text-xs border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;