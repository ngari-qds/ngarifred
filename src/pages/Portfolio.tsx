
import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import PortfolioCard from "@/components/PortfolioCard";

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projects = [
    {
      id: "1",
      title: "Algorithmic Trading System",
      description: "High-frequency trading platform with ML-based signal generation",
      longDescription: "A comprehensive algorithmic trading system that leverages machine learning for signal generation and risk management. Built with Python, PostgreSQL, and real-time data processing capabilities.",
      image: "/placeholder.svg",
      tags: ["Python", "ML", "Trading", "PostgreSQL"],
      date: "2024",
      performance: "+23.4% YTD",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      status: "active" as const
    },
    {
      id: "2",
      title: "Options Pricing Research",
      description: "Advanced volatility modeling and options pricing strategies",
      longDescription: "Research project focusing on advanced volatility modeling techniques and their application to options pricing. Includes novel approaches to volatility surface construction and risk-neutral calibration.",
      image: "/placeholder.svg",
      tags: ["Research", "Options", "Volatility", "R"],
      date: "2023",
      performance: "Published",
      status: "completed" as const
    },
    {
      id: "3",
      title: "Alternative Data Integration",
      description: "Exploring alternative data sources for alpha generation",
      longDescription: "Ongoing research into the integration of alternative data sources including satellite imagery, social sentiment, and economic indicators for enhanced alpha generation in quantitative strategies.",
      image: "/placeholder.svg",
      tags: ["Alternative Data", "Alpha", "Research"],
      date: "2024",
      status: "research" as const
    }
  ];

  const filters = ["all", "active", "completed", "research"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="section-spacing min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <h1 className="serif-heading text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Portfolio
            </h1>
            <p className="serif-body text-xl text-gray-100 leading-relaxed drop-shadow-md">
              A collection of quantitative research, trading systems, and academic work 
              spanning signal generation, risk management, and market microstructure.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse shadow-sm"></div>
                <span className="drop-shadow-sm">Active Projects: 8</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full shadow-sm"></div>
                <span className="drop-shadow-sm">Publications: 12</span>
              </div>
            </div>
          </div>
          
          {/* Right - Visual Element */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-green-500/20 rounded-2xl backdrop-blur-sm"></div>
            <div className="relative p-8 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
              <div className="grid grid-cols-3 gap-4">
                {/* Performance Metrics */}
                <div className="col-span-3 text-center mb-4">
                  <h3 className="serif-heading text-lg font-semibold text-white mb-2 drop-shadow-md">Performance Overview</h3>
                </div>
                
                <div className="text-center p-3 bg-blue-500/20 rounded-xl border border-blue-300/30 backdrop-blur-sm shadow-md">
                  <div className="text-2xl font-bold text-white drop-shadow-md">+23.4%</div>
                  <div className="text-xs text-blue-200 drop-shadow-sm">YTD Return</div>
                </div>
                
                <div className="text-center p-3 bg-green-500/20 rounded-xl border border-green-300/30 backdrop-blur-sm shadow-md">
                  <div className="text-2xl font-bold text-white drop-shadow-md">0.89</div>
                  <div className="text-xs text-green-200 drop-shadow-sm">Sharpe Ratio</div>
                </div>
                
                <div className="text-center p-3 bg-red-500/20 rounded-xl border border-red-300/30 backdrop-blur-sm shadow-md">
                  <div className="text-2xl font-bold text-white drop-shadow-md">-12.3%</div>
                  <div className="text-xs text-red-200 drop-shadow-sm">Max DD</div>
                </div>
                
                {/* Technology Stack Visualization */}
                <div className="col-span-3 mt-4">
                  <div className="flex justify-center space-x-2">
                    {["Python", "R", "PostgreSQL", "ML", "Trading"].map((tech, index) => (
                      <div 
                        key={tech}
                        className="px-2 py-1 bg-white/20 border border-white/30 rounded-lg text-xs text-white animate-fade-in backdrop-blur-sm drop-shadow-sm"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] border border-white/20 rounded-2xl backdrop-blur-md bg-black/20 shadow-2xl">
          {/* Main Content Panel */}
          <ResizablePanel defaultSize={75} minSize={60}>
            <div className="p-6 h-full">
              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-md"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-300" />
                    <div className="flex space-x-1">
                      {filters.map((filter) => (
                        <Button
                          key={filter}
                          variant={selectedFilter === filter ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setSelectedFilter(filter)}
                          className={`capitalize ${
                            selectedFilter === filter 
                              ? "bg-blue-500/80 text-white border-blue-400/50" 
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          } backdrop-blur-md`}
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`${
                      viewMode === "grid" 
                        ? "bg-blue-500/80 text-white" 
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    } backdrop-blur-md`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`${
                      viewMode === "list" 
                        ? "bg-blue-500/80 text-white" 
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    } backdrop-blur-md`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Projects Grid */}
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 lg:grid-cols-2" 
                  : "grid-cols-1"
              }`}>
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PortfolioCard
                      project={project}
                      onExpand={setExpandedCard}
                      isExpanded={expandedCard === project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Sidebar Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="p-6 h-full bg-black/30 backdrop-blur-md rounded-r-2xl border-l border-white/20">
              <h3 className="serif-heading text-lg font-semibold mb-4 text-white drop-shadow-md">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-300/30 backdrop-blur-sm shadow-md">
                  <div className="text-2xl font-bold text-white drop-shadow-md">8</div>
                  <div className="text-sm text-blue-200 drop-shadow-sm">Active Projects</div>
                </div>
                
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-300/30 backdrop-blur-sm shadow-md">
                  <div className="text-2xl font-bold text-white drop-shadow-md">+15.2%</div>
                  <div className="text-sm text-green-200 drop-shadow-sm">Avg Performance</div>
                </div>
                
                <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-300/30 backdrop-blur-sm shadow-md">
                  <div className="text-2xl font-bold text-white drop-shadow-md">12</div>
                  <div className="text-sm text-purple-200 drop-shadow-sm">Publications</div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="serif-heading font-medium mb-3 text-white drop-shadow-md">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "R", "PostgreSQL", "ML", "Trading", "Research"].map((tech) => (
                    <Badge key={tech} className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs drop-shadow-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Portfolio;
