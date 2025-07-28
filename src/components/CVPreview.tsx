
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  User, 
  Award, 
  GraduationCap,
  MapPin,
  Calendar,
  ExternalLink,
  Briefcase,
  Code,
  Target,
  TrendingUp,
  Star
} from 'lucide-react';

interface CVPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const CVPreview: React.FC<CVPreviewProps> = ({ isOpen, onClose, pdfUrl, title }) => {
  const [activeSection, setActiveSection] = useState('overview');

  // CV Data - extracted from the existing CV page
  const personalInfo = {
    name: "Fred Ngari Mwaniki",
    title: "Quantitative Researcher & Data Scientist",
    location: "Nairobi, Kenya",
    email: "fred@example.com",
    github: "https://github.com/ngari-qds",
    linkedin: "https://linkedin.com/in/fred-mwaniki"
  };

  const overview = {
    experience: "2+ Years",
    education: "BSc Level",
    alphasBuilt: "200+",
    languages: ["Python", "R", "JavaScript", "C++"],
    specialties: ["Quantitative Finance", "Machine Learning", "Signal Processing", "Risk Management"]
  };

  const roles = [
    {
      title: "Quantitative Researcher",
      company: "WorldQuant Brain",
      period: "2023 – Present",
      location: "Nairobi, Kenya",
      description: "Independent quant researcher focused on signal generation and alpha system building; mentoring peers in quant finance and software tooling.",
      highlights: [
        "Built and evaluated 200+ alpha signals across macro, fundamental, and tick-level data",
        "Developing research toolkit in Python/Django with React front-end",
        "Mentored peers on signal research and model robustness",
        "Exploring IC‑preserving meta-models for regime-adaptive signal selection"
      ]
    },
    {
      title: "Founder & Technical Lead",
      company: "Valurise",
      period: "2024 – Present",
      location: "Nairobi, Kenya",
      description: "Creating Valurise—a mission-driven platform to alleviate youth unemployment in Kenya by matching skills to paid opportunities.",
      highlights: [
        "Led full-stack build using Django, React, and PostgreSQL",
        "Designed algorithmic matching for talents and micro-task jobs",
        "Piloted community rollout with selected beta cohort",
        "Combines tech and social impact for sustainable innovation"
      ]
    }
  ];

  const education = [
    {
      degree: "Certificate, Data Science",
      school: "ALX (ALX Africa)",
      period: "May 2025 – Present",
      status: "Current",
      highlights: ["Python & Machine Learning", "Data Pipelines", "Applied Predictive Modeling", "Peer Mentorship"]
    },
    {
      degree: "B.Sc. Actuarial Science",
      school: "University of Nairobi",
      period: "2022 – Present",
      status: "Current",
      highlights: ["Financial Mathematics", "Stochastic Modeling", "Risk Theory", "Bayesian Inference"]
    }
  ];

  const skills = [
    { category: "Languages", items: [
      { name: "Python", level: 95 },
      { name: "R", level: 85 },
      { name: "JavaScript", level: 75 },
      { name: "SQL", level: 70 }
    ]},
    { category: "Frameworks", items: [
      { name: "NumPy/Pandas", level: 90 },
      { name: "TensorFlow", level: 70 },
      { name: "Django", level: 80 },
      { name: "React", level: 75 }
    ]},
    { category: "Research", items: [
      { name: "Time Series Analysis", level: 85 },
      { name: "Machine Learning", level: 80 },
      { name: "Statistical Modeling", level: 85 },
      { name: "Signal Processing", level: 75 }
    ]}
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Fred_Ngari_Mwaniki_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] p-0 overflow-hidden bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-0 border-b border-white/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="serif-heading text-2xl font-bold text-white drop-shadow-lg">
                  {personalInfo.name}
                </DialogTitle>
                <p className="serif-body text-white/90 drop-shadow-md">
                  {personalInfo.title}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleDownload}
                className="bg-blue-500/80 hover:bg-blue-500/90 text-white elegant-transition backdrop-blur-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={onClose} className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex h-[600px]">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-black/30 border-r border-white/30 p-6 backdrop-blur-sm">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg elegant-transition ${
                      activeSection === section.id
                        ? 'bg-blue-500/80 text-white shadow-lg'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="serif-body font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 space-y-4">
              <h4 className="serif-heading font-semibold text-white drop-shadow-lg">Quick Stats</h4>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3 border border-white/20 backdrop-blur-sm">
                  <div className="text-lg font-bold text-white drop-shadow-md">{overview.alphasBuilt}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Alpha Signals Built</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-white/20 backdrop-blur-sm">
                  <div className="text-lg font-bold text-blue-300 drop-shadow-md">{overview.experience}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Years Experience</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-white/20 backdrop-blur-sm">
                  <div className="text-lg font-bold text-green-300 drop-shadow-md">4+</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Technologies</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="serif-heading text-3xl font-bold text-white drop-shadow-lg">Professional Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
                    <h3 className="serif-heading text-xl font-semibold text-white mb-4 drop-shadow-lg">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-blue-300" />
                        <span className="serif-body text-white/90 drop-shadow-sm">{personalInfo.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ExternalLink className="h-4 w-4 text-purple-300" />
                        <a href={personalInfo.github} className="serif-body text-white/90 hover:text-blue-300 elegant-transition drop-shadow-sm">
                          GitHub Profile
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
                    <h3 className="serif-heading text-xl font-semibold text-white mb-4 drop-shadow-lg">Core Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {overview.specialties.map((specialty, index) => (
                        <Badge 
                          key={specialty} 
                          variant="secondary" 
                          className="animate-fade-in elegant-transition hover:scale-105 bg-white/20 text-white/90 border-white/30 backdrop-blur-sm"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
                  <h3 className="serif-heading text-xl font-semibold text-white mb-4 drop-shadow-lg">Professional Summary</h3>
                  <p className="serif-body text-white/90 leading-relaxed drop-shadow-md">
                    Quantitative researcher and data scientist with expertise in signal generation, alpha system building, and machine learning applications in finance. 
                    Currently developing innovative research tools and mentoring peers in quantitative finance methodologies. 
                    Passionate about combining rigorous quantitative methods with practical software engineering to drive impactful solutions.
                  </p>
                </div>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="serif-heading text-3xl font-bold text-white drop-shadow-lg">Professional Experience</h2>
                
                <div className="space-y-6">
                  {roles.map((role, index) => (
                    <div 
                      key={index} 
                      className="bg-black/30 rounded-xl p-6 border border-white/20 hover:shadow-2xl elegant-transition animate-scale-in backdrop-blur-sm"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="serif-heading text-xl font-bold text-white drop-shadow-lg">{role.title}</h3>
                          <p className="serif-body text-lg text-blue-300 font-semibold drop-shadow-md">{role.company}</p>
                          <p className="serif-body text-white/90 mt-2 leading-relaxed drop-shadow-md">{role.description}</p>
                        </div>
                        <div className="text-right mt-2 lg:mt-0">
                          <div className="flex items-center space-x-2 text-white/90">
                            <Calendar className="h-4 w-4" />
                            <span className="serif-body font-medium drop-shadow-sm">{role.period}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/90 mt-1">
                            <MapPin className="h-4 w-4" />
                            <span className="serif-body text-sm drop-shadow-sm">{role.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="serif-heading text-lg font-semibold text-white mb-3 flex items-center drop-shadow-lg">
                          <Target className="h-5 w-5 mr-2 text-green-300" />
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {role.highlights.map((highlight, hlIndex) => (
                            <div 
                              key={hlIndex} 
                              className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg animate-fade-in backdrop-blur-sm"
                              style={{ animationDelay: `${(index * 200) + (hlIndex * 100)}ms` }}
                            >
                              <Star className="h-4 w-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                              <span className="serif-body text-white/90 text-sm drop-shadow-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="serif-heading text-3xl font-bold text-white drop-shadow-lg">Education</h2>
                
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div 
                      key={index} 
                      className="bg-black/30 rounded-xl p-6 border border-white/20 hover:shadow-2xl elegant-transition animate-scale-in backdrop-blur-sm"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="serif-heading text-xl font-bold text-white drop-shadow-lg">{edu.degree}</h3>
                            {edu.status === 'Current' && (
                              <Badge variant="default" className="bg-green-500/20 text-green-200 border-green-300/30 backdrop-blur-sm">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="serif-body text-lg text-blue-300 font-semibold drop-shadow-md">{edu.school}</p>
                        </div>
                        <div className="text-right mt-2 lg:mt-0">
                          <div className="flex items-center space-x-2 text-white/90">
                            <Calendar className="h-4 w-4" />
                            <span className="serif-body font-medium drop-shadow-sm">{edu.period}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="serif-heading text-lg font-semibold text-white mb-3 drop-shadow-lg">Course Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.highlights.map((highlight, hlIndex) => (
                            <Badge 
                              key={hlIndex} 
                              variant="outline" 
                              className="animate-fade-in bg-white/10 text-white/90 border-white/20 backdrop-blur-sm"
                              style={{ animationDelay: `${(index * 200) + (hlIndex * 100)}ms` }}
                            >
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="serif-heading text-3xl font-bold text-white drop-shadow-lg">Technical Skills</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {skills.map((skillGroup, groupIndex) => (
                    <div 
                      key={skillGroup.category} 
                      className="bg-black/30 rounded-xl p-6 border border-white/20 hover:shadow-2xl elegant-transition animate-scale-in backdrop-blur-sm"
                      style={{ animationDelay: `${groupIndex * 200}ms` }}
                    >
                      <h3 className="serif-heading text-lg font-semibold text-white mb-4 drop-shadow-lg">{skillGroup.category}</h3>
                      <div className="space-y-4">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="serif-body text-sm font-medium text-white drop-shadow-sm">{skill.name}</span>
                              <span className="serif-body text-xs text-white/80 drop-shadow-sm">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full elegant-transition animate-fade-in" 
                                style={{ 
                                  width: `${skill.level}%`,
                                  animationDelay: `${(groupIndex * 200) + (skillIndex * 100)}ms`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreview;
