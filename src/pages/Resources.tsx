
import { useState } from "react";
import { Search, Filter, Grid, List, Book, Wrench, Mic, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import BookCard from "@/components/BookCard";
import ToolCard from "@/components/ToolCard";
import SpeakingCard from "@/components/SpeakingCard";
import PublicationCard from "@/components/PublicationCard";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const readingList = [
    {
      title: "The Man Who Solved the Market",
      author: "Gregory Zuckerman", 
      category: "Biography",
      description: "The definitive account of Renaissance Technologies and Jim Simons' quantitative revolution.",
      rating: 5,
      link: "#"
    },
    {
      title: "Advances in Financial Machine Learning",
      author: "Marcos López de Prado",
      category: "Technical", 
      description: "Essential reading for anyone applying ML to finance. Practical and theoretically sound.",
      rating: 5,
      link: "#"
    },
    {
      title: "Dynamic Hedging",
      author: "Nassim Nicholas Taleb",
      category: "Risk Management",
      description: "Classic text on options and risk. Dense but invaluable for understanding derivatives.",
      rating: 4,
      link: "#"
    },
    {
      title: "The Econometrics of Financial Markets",
      author: "Campbell, Lo, MacKinlay",
      category: "Academic",
      description: "Comprehensive treatment of empirical methods in finance. Graduate-level rigor.",
      rating: 5,
      link: "#"
    },
    {
      title: "Market Microstructure Theory",
      author: "Maureen O'Hara",
      category: "Academic",
      description: "Fundamental concepts for understanding how markets actually work at the micro level.",
      rating: 4,
      link: "#"
    },
    {
      title: "The Little Book of Behavioral Investing",
      author: "James Montier",
      category: "Behavioral",
      description: "Concise overview of cognitive biases that affect investment decisions.",
      rating: 4,
      link: "#"
    }
  ];

  const tools = [
    {
      name: "Python",
      category: "Programming",
      description: "Primary language for research, backtesting, and production systems.",
      icon: "🐍",
      link: "https://python.org"
    },
    {
      name: "Bloomberg Terminal",
      category: "Data",
      description: "Indispensable for market data, news, and fundamental analysis.",
      icon: "📊",
      link: "#"
    },
    {
      name: "QuantLib",
      category: "Libraries",
      description: "Comprehensive library for quantitative finance calculations.",
      icon: "📈",
      link: "https://quantlib.org"
    },
    {
      name: "Jupyter",
      category: "Development",
      description: "Interactive development environment perfect for exploratory research.",
      icon: "📓",
      link: "https://jupyter.org"
    },
    {
      name: "Git",
      category: "Version Control",
      description: "Essential for code management and collaboration in research teams.",
      icon: "🔧",
      link: "https://git-scm.com"
    },
    {
      name: "LaTeX",
      category: "Documentation",
      description: "Professional typesetting for research papers and documentation.",
      icon: "📝",
      link: "https://latex-project.org"
    },
    {
      name: "Docker",
      category: "Infrastructure",
      description: "Containerization for reproducible research environments.",
      icon: "🐳",
      link: "https://docker.com"
    },
    {
      name: "AWS",
      category: "Cloud",
      description: "Scalable computing infrastructure for large-scale backtesting.",
      icon: "☁️",
      link: "https://aws.amazon.com"
    }
  ];

  const speaking = [
    {
      title: "Signal Decay in Systematic Strategies",
      venue: "CFA Institute Annual Conference",
      date: "2024-03-15",
      type: "Keynote",
      description: "Exploring the mechanisms behind alpha degradation and strategies for signal longevity."
    },
    {
      title: "Alternative Data Integration",
      venue: "Quantitative Finance Summit",
      date: "2023-11-08",
      type: "Panel",
      description: "Discussion on challenges and opportunities in incorporating non-traditional data sources."
    },
    {
      title: "Model Risk in Systematic Trading",
      venue: "Risk Management Association",
      date: "2023-09-22",
      type: "Workshop",
      description: "Interactive session on identifying and mitigating model risk in algorithmic trading."
    },
    {
      title: "The Future of Quantitative Research",
      venue: "MIT Finance Forum",
      date: "2023-05-14",
      type: "Guest Lecture",
      description: "Perspectives on emerging trends and challenges in quantitative finance research."
    }
  ];

  const papers = [
    {
      title: "Regime-Dependent Signal Extraction in Equity Markets",
      venue: "Journal of Financial Economics",
      year: "2024",
      coauthors: "Chen, L., Rodriguez, M.",
      abstract: "We develop a framework for identifying market regimes and extracting signals conditional on regime state...",
      citations: 23
    },
    {
      title: "High-Frequency Market Making with Adverse Selection",
      venue: "Journal of Finance",
      year: "2023",
      coauthors: "Thompson, K.",
      abstract: "This paper examines optimal market making strategies in the presence of informed traders...",
      citations: 47
    },
    {
      title: "Machine Learning Applications in Portfolio Construction",
      venue: "Financial Analysts Journal",
      year: "2022",
      coauthors: "Liu, X., Patel, S., Wang, Y.",
      abstract: "We explore the application of modern ML techniques to portfolio optimization problems...",
      citations: 89
    }
  ];

  const categories = ["all", "books", "tools", "speaking", "publications"];

  const getAllResources = () => {
    let allResources: any[] = [];
    
    if (selectedCategory === "all" || selectedCategory === "books") {
      allResources = [...allResources, ...readingList.map(item => ({ ...item, type: "book" }))];
    }
    if (selectedCategory === "all" || selectedCategory === "tools") {
      allResources = [...allResources, ...tools.map(item => ({ ...item, type: "tool" }))];
    }
    if (selectedCategory === "all" || selectedCategory === "speaking") {
      allResources = [...allResources, ...speaking.map(item => ({ ...item, type: "speaking" }))];
    }
    if (selectedCategory === "all" || selectedCategory === "publications") {
      allResources = [...allResources, ...papers.map(item => ({ ...item, type: "publication" }))];
    }

    return allResources.filter(resource => {
      const searchableText = `${resource.title} ${resource.description || resource.abstract || ''} ${resource.author || resource.venue || ''}`.toLowerCase();
      return searchableText.includes(searchTerm.toLowerCase());
    });
  };

  const filteredResources = getAllResources();

  return (
    <div className="section-spacing min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6">
            <h1 className="serif-heading text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Resources
            </h1>
            <p className="serif-body text-xl text-white/90 leading-relaxed drop-shadow-md">
              Curated collection of books, tools, and references that shape thinking 
              and enable effective quantitative research.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="drop-shadow-sm">Books: {readingList.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <span className="drop-shadow-sm">Tools: {tools.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-purple-400 rounded-full"></div>
                <span className="drop-shadow-sm">Publications: {papers.length}</span>
              </div>
            </div>
          </div>
          
          {/* Right - Visual Element */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-green-500/20 rounded-2xl blur-xl"></div>
            <div className="relative p-8 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                  <Book className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white drop-shadow-lg">{readingList.length}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Essential Books</div>
                </div>
                
                <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                  <Wrench className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white drop-shadow-lg">{tools.length}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Core Tools</div>
                </div>
                
                <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                  <Mic className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white drop-shadow-lg">{speaking.length}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Speaking Events</div>
                </div>
                
                <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                  <FileText className="h-6 w-6 text-red-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white drop-shadow-lg">{papers.length}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Publications</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] border border-white/20 rounded-lg bg-black/20 backdrop-blur-md shadow-2xl">
          <ResizablePanel defaultSize={75} minSize={60}>
            <div className="p-6 h-full">
              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/80" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-white/80" />
                    <div className="flex space-x-1">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={`capitalize ${
                            selectedCategory === category
                              ? "bg-blue-500/80 text-white hover:bg-blue-500/90"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          } backdrop-blur-sm`}
                        >
                          {category}
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
                        ? "bg-blue-500/80 text-white hover:bg-blue-500/90"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    } backdrop-blur-sm`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`${
                      viewMode === "list"
                        ? "bg-blue-500/80 text-white hover:bg-blue-500/90"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    } backdrop-blur-sm`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Resources Grid */}
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 lg:grid-cols-2" 
                  : "grid-cols-1"
              }`}>
                {filteredResources.map((resource, index) => {
                  const key = resource.title;
                  
                  return (
                    <div
                      key={key}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {resource.type === "book" && (
                        <BookCard
                          book={resource}
                          onExpand={setExpandedItem}
                          isExpanded={expandedItem === key}
                        />
                      )}
                      {resource.type === "tool" && (
                        <ToolCard
                          tool={resource}
                          onExpand={setExpandedItem}
                          isExpanded={expandedItem === key}
                        />
                      )}
                      {resource.type === "speaking" && (
                        <SpeakingCard
                          event={resource}
                          onExpand={setExpandedItem}
                          isExpanded={expandedItem === key}
                        />
                      )}
                      {resource.type === "publication" && (
                        <PublicationCard
                          paper={resource}
                          onExpand={setExpandedItem}
                          isExpanded={expandedItem === key}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="p-6 h-full bg-black/30 backdrop-blur-sm">
              <h3 className="serif-heading text-lg font-semibold mb-4 text-white drop-shadow-lg">Resource Overview</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400 drop-shadow-lg">{readingList.length}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Essential Books</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-400 drop-shadow-lg">{tools.length}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Core Tools</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-400 drop-shadow-lg">{speaking.length}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Speaking Events</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-red-400 drop-shadow-lg">{papers.length}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Publications</div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="serif-heading font-medium mb-3 text-white drop-shadow-lg">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {["Technical", "Academic", "Programming", "Research"].map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs bg-white/10 text-white/90 border-white/20 backdrop-blur-sm">
                      {cat}
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

export default Resources;
