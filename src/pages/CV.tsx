
import { useState } from "react";
import { Download, Github, FileText, ExternalLink, User, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import CVPreview from "@/components/CVPreview";

const CV = () => {
  const [activeTab, setActiveTab] = useState("Skills");
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  
  const tabs = ["Skills", "Roles", "Education"];
  
  const skillCategories = {
    "Programming Languages": {
      items: ["Python", "R", "C++", "SQL", "MATLAB", "JavaScript"],
      proficiency: [95, 10, 0, 50, 0, 75]
    },
    "Frameworks & Libraries": {
      items: ["NumPy/Pandas", "TensorFlow", "PyTorch", "Scikit-learn", "QuantLib", "Bloomberg API"],
      proficiency: [65, 25, 20, 40, 10, 15]
    },
    "Research Methods": {
      items: ["Time Series Analysis", "Machine Learning", "Statistical Modeling", "Signal Processing", "Bayesian Methods", "Monte Carlo"],
      proficiency: [45, 40, 50, 35, 30, 25]
    },
    "Tools & Platforms": {
      items: ["Git", "Docker", "AWS", "Jupyter", "LaTeX", "Bloomberg Terminal"],
      proficiency: [50, 20, 10, 65, 40, 5]
    }
  };

  const roles = [
    {
      title: "Quantitative Researcher",
      company: "WorldQuant Brain",
      period: "2023 – Present",
      location: "Nairobi, Kenya",
      description: "Independent quant researcher focused on signal generation and alpha system building; mentoring peers in quant finance and software tooling.",
      achievements: [
        "Built and evaluated 100+ alpha signals across macro, fundamental, and tick-level data",
        "Developing a research toolkit in Python/Django with React front-end to streamline alpha workflows",
        "Mentored peers on signal research, model robustness, and applied validation",
        "Exploring IC‑preserving meta-models for regime-adaptive signal selection"
      ]
    },
    {
      title: "Founder & Technical Lead",
      company: "Valurise",
      period: "2024 – Present",
      location: "Nairobi, Kenya",
      description: "Creating Valurise—a mission-driven platform to alleviate youth unemployment in Kenya by matching skills to paid opportunities.",
      achievements: [
        "Led full-stack build using Django, React, and PostgreSQL",
        "Designed core logic to match talents and micro-task jobs algorithmically",
        "Piloted community rollout with selected beta cohort",
        "Combines tech and social impact to drive sustainable innovation"
      ]
    },
    {
      title: "Software Developer (Self‑Taught)",
      company: "Personal Projects",
      period: "2022 – Present",
      location: "Remote",
      description: "Full-stack hobbyist building tools in Python, Django, React; integrates quant research with practical application.",
      achievements: [
        "Built dashboard and backend tooling for alpha tracking and visualization",
        "Developed data ingestion pipelines using pandas, NumPy, and APIs",
        "Created interactive UIs in React for research navigation and signal inspection",
        "Shipped reusable modules for data analysis and model diagnostics"
      ]
    }
  ];

  const education = [
    {
      degree: "Certificate, Data Science",
      school: "ALX (ALX Africa)",
      period: "May(2025) – Present",
      description: "Currently enrolled in the full-stack Data Science program offered by ALX, covering Python, machine learning, data pipelines, and applied predictive modeling.",
      highlights: [
        "Hands-on modules in Python, Pandas, Scikit‑Learn and model deployment",
        "Applied capstone project: building a quant research tool for alpha testing",
        "Peer mentorship and collaborative modules across African learner cohort",
        "Ongoing performance-based reviews and project feedback"
      ]
    },
    {
      degree: "B.Sc. Actuarial Science",
      school: "University of Nairobi",
      period: "2022 – Present",
      description: "Studying for a degree in Actuarial Science within the School of Mathematics, developing strong foundation in probabilistic modeling, risk theory, and quantitative finance.",
      highlights: [
        "Core coursework in probability, financial mathematics, survival analysis, and stochastic modeling",
        "Exposure to Advanced Financial Modelling and Bayesian inference techniques",
        "Participating in student research groups around statistical inference and actuarial applications",
        "Maintaining strong academic standing in a competitive cohort"
      ]
    }
  ];

  const ProficiencyBar = ({ skill, proficiency }: { skill: string; proficiency: number }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="serif-body text-sm font-medium text-white drop-shadow-sm">{skill}</span>
        <span className="serif-body text-xs text-white/80 drop-shadow-sm">{proficiency}%</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
        <div 
          className="bg-blue-400 h-2 rounded-full elegant-transition shadow-lg" 
          style={{ width: `${proficiency}%` }}
        ></div>
      </div>
    </div>
  );

  const handleOpenPDFViewer = () => {
    setIsPDFViewerOpen(true);
  };

  return (
    <div className="section-spacing min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <h1 className="serif-heading text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Curriculum Vitae
            </h1>
            <p className="serif-body text-xl text-white/90 leading-relaxed drop-shadow-md">
              A comprehensive overview of professional experience, technical expertise, and academic background spanning quantitative finance and research.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="drop-shadow-sm">Experience: 2+ Years</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-purple-400 rounded-full"></div>
                <span className="drop-shadow-sm">Education: BSc Level</span>
              </div>
            </div>
            
            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button 
                size="lg" 
                className="bg-blue-500/80 hover:bg-blue-500/90 text-white elegant-transition backdrop-blur-sm"
                onClick={handleOpenPDFViewer}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <a
                href="https://github.com/ngari-qds"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="elegant-transition bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
          
          {/* Right - Visual Element */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-green-500/20 rounded-2xl blur-xl"></div>
            <div className="relative p-8 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
              <div className="space-y-6">
                {/* Career Highlights */}
                <div className="text-center mb-6">
                  <h3 className="serif-heading text-lg font-semibold text-white mb-2 drop-shadow-lg">Career Highlights</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                    <User className="h-5 w-5 text-blue-400 mr-3" />
                    <div>
                      <div className="text-sm font-semibold text-white drop-shadow-sm">Quantitative Researcher</div>
                      <div className="text-xs text-white/80 drop-shadow-sm">WorldQuant Brain</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                    <Award className="h-5 w-5 text-green-400 mr-3" />
                    <div>
                      <div className="text-sm font-semibold text-white drop-shadow-sm">Alpha Signal Portfolio</div>
                      <div className="text-xs text-white/80 drop-shadow-sm">200+ Alphas Engineered, Ongoing IC Tracking</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                    <GraduationCap className="h-5 w-5 text-purple-400 mr-3" />
                    <div>
                      <div className="text-sm font-semibold text-white drop-shadow-sm">B.Sc. Actuarial Science (UoN)</div>
                      <div className="text-xs text-white/80 drop-shadow-sm">+ ALX Data Science Program (Ongoing)</div>
                    </div>
                  </div>
                </div>
                
                {/* Core Competencies */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-white/80 mb-3 text-center drop-shadow-sm">Core Competencies</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Python", "Machine Learning", "Signal Processing", "Risk Management"].map((skill, index) => (
                      <div 
                        key={skill}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/90 animate-fade-in backdrop-blur-sm"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="min-h-[700px] border border-white/20 rounded-lg bg-black/20 backdrop-blur-md shadow-2xl">
          {/* Main Content Panel */}
          <ResizablePanel defaultSize={75} minSize={60}>
            <div className="p-6 h-full">
              {/* Tab Navigation */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-1 rounded-lg border border-white/20">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 rounded-md elegant-transition serif-body font-medium ${
                        activeTab === tab
                          ? "bg-blue-500/80 text-white shadow-lg"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Tab */}
              {activeTab === "Skills" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(skillCategories).map(([category, data]) => (
                    <div key={category} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-xl">
                      <h3 className="serif-heading text-lg font-semibold text-white mb-4 drop-shadow-lg">
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {data.items.map((skill, index) => (
                          <ProficiencyBar 
                            key={skill} 
                            skill={skill} 
                            proficiency={data.proficiency[index]} 
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Roles Tab */}
              {activeTab === "Roles" && (
                <div className="space-y-6">
                  {roles.map((role, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-xl">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="serif-heading text-xl font-semibold text-white drop-shadow-lg">
                            {role.title}
                          </h3>
                          <p className="serif-body text-lg text-blue-400 font-medium drop-shadow-md">{role.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="serif-body text-white/90 font-medium drop-shadow-sm">{role.period}</p>
                          <p className="serif-body text-sm text-white/80 drop-shadow-sm">{role.location}</p>
                        </div>
                      </div>
                      
                      <p className="serif-body text-white/90 mb-4 leading-relaxed drop-shadow-md">
                        {role.description}
                      </p>
                      
                      <div>
                        <h4 className="serif-heading text-lg font-medium text-white mb-3 drop-shadow-lg">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {role.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="serif-body text-white/90 flex items-start drop-shadow-sm">
                              <span className="text-blue-400 mr-3 mt-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Education Tab */}
              {activeTab === "Education" && (
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-xl">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div>
                          <h3 className="serif-heading text-xl font-semibold text-white drop-shadow-lg">
                            {edu.degree}
                          </h3>
                          <p className="serif-body text-lg text-blue-400 font-medium drop-shadow-md">{edu.school}</p>
                          <p className="serif-body text-white/90 mt-2 drop-shadow-sm">{edu.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="serif-body text-white/90 font-medium drop-shadow-sm">{edu.period}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="serif-heading text-lg font-medium text-white mb-3 drop-shadow-lg">
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {edu.highlights.map((highlight, hlIndex) => (
                            <li key={hlIndex} className="serif-body text-white/90 flex items-start drop-shadow-sm">
                              <span className="text-blue-400 mr-3 mt-1">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Sidebar Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="p-6 h-full bg-black/30 backdrop-blur-sm">
              <h3 className="serif-heading text-lg font-semibold mb-4 text-white drop-shadow-lg">Professional Summary</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400 drop-shadow-lg">7+</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Years Experience</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-400 drop-shadow-lg">$2.5B</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Assets Managed</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-400 drop-shadow-lg">15+</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Publications</div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="serif-heading font-medium mb-3 text-white drop-shadow-lg">Expertise Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {["Quant Research", "Machine Learning", "Risk Management", "Signal Processing", "Portfolio Optimization"].map((area) => (
                    <div key={area} className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90 backdrop-blur-sm">
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact CTA in Sidebar */}
              <div className="mt-8 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30 backdrop-blur-sm">
                <h4 className="serif-heading font-semibold text-white mb-2 drop-shadow-lg">Connect</h4>
                <p className="text-sm text-white/80 mb-3 drop-shadow-sm">
                  Interested in collaboration or discussing opportunities?
                </p>
                <Button asChild size="sm" className="w-full elegant-transition bg-blue-500/80 hover:bg-blue-500/90 text-white">
                  <a href="/contact">
                    Get in Touch
                  </a>
                </Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* CV Preview Modal */}
      <CVPreview
        isOpen={isPDFViewerOpen}
        onClose={() => setIsPDFViewerOpen(false)}
        pdfUrl="/Fred Mwaniki_CV_ATS.pdf"
        title="Fred Ngari Mwaniki - Professional CV"
      />
    </div>
  );
};

export default CV;
