
import { useState } from "react";
import { Search, Filter, Calendar, Clock, ArrowRight, Grid, List, BookOpen, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import BlogCard from "@/components/BlogCard";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const blogPosts = [
    {
      id: "1",
      title: "The Signal-to-Noise Ratio in Modern Markets",
      excerpt: "Exploring the challenges of extracting meaningful signals from increasingly noisy financial data.",
      content: "In today's hyper-connected financial markets, the volume of data available to traders and researchers has grown exponentially. Yet paradoxically, finding genuine alpha-generating signals has become more challenging than ever. This post explores why this is the case and what it means for quantitative researchers.",
      tags: ["quantitative-research", "market-analysis", "signal-processing"],
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Research",
      featured: true
    },
    {
      id: "2",
      title: "Building Robust Backtesting Frameworks",
      excerpt: "A practical guide to creating backtesting systems that actually reflect real-world trading conditions.",
      content: "One of the most critical aspects of quantitative research is building backtesting frameworks that provide realistic assessments of strategy performance. This post walks through the key considerations and common pitfalls to avoid.",
      tags: ["backtesting", "python", "risk-management"],
      date: "2024-01-08",
      readTime: "12 min read",
      category: "Technical"
    },
    {
      id: "3",
      title: "The Philosophy of Risk in Systematic Trading",
      excerpt: "Understanding risk not as a mathematical construct, but as a fundamental aspect of market participation.",
      content: "Risk management in systematic trading goes beyond VaR calculations and correlation matrices. This post explores the philosophical underpinnings of risk and how they should inform our approach to portfolio construction.",
      tags: ["risk-management", "philosophy", "portfolio-theory"],
      date: "2023-12-22",
      readTime: "6 min read",
      category: "Philosophy"
    },
    {
      id: "4",
      title: "Alternative Data: Promise vs Reality",
      excerpt: "A critical examination of alternative data sources and their practical applications in quantitative research.",
      content: "Alternative data has been hailed as the next frontier in quantitative finance. But how much value do these datasets actually provide? This post examines the promise and limitations of alternative data sources.",
      tags: ["alternative-data", "machine-learning", "data-science"],
      date: "2023-12-15",
      readTime: "10 min read",
      category: "Research"
    },
    {
      id: "5",
      title: "Regime Detection in Financial Markets",
      excerpt: "Methods for identifying and adapting to changing market conditions in systematic strategies.",
      content: "Financial markets are not stationary systems. They evolve, shift, and change character over time. This post explores various approaches to regime detection and their practical implementation.",
      tags: ["regime-detection", "machine-learning", "time-series"],
      date: "2023-12-01",
      readTime: "14 min read",
      category: "Technical"
    },
    {
      id: "6",
      title: "The Art of Feature Engineering",
      excerpt: "Creative approaches to transforming raw market data into predictive features for machine learning models.",
      content: "Feature engineering is often the difference between a mediocre model and a breakthrough. This post explores creative approaches to feature engineering in the context of financial markets.",
      tags: ["feature-engineering", "machine-learning", "data-transformation"],
      date: "2023-11-18",
      readTime: "9 min read",
      category: "Technical"
    }
  ];

  const categories = ["all", "Research", "Technical", "Philosophy", "Markets"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);
  const totalReadTime = blogPosts.reduce((sum, post) => sum + parseInt(post.readTime), 0);

  const handleReadPost = (postId: string) => {
    setExpandedPost(postId);
  };

  return (
    <div className="section-spacing min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6">
            <h1 className="serif-heading text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Insights & Research
            </h1>
            <p className="serif-body text-xl text-white/90 leading-relaxed drop-shadow-md">
              Deep dives into quantitative research, market analysis, and the intersection 
              of mathematics and finance. Sharing insights from the frontlines of systematic trading.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="drop-shadow-sm">Posts: {blogPosts.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <span className="drop-shadow-sm">Total Read Time: {totalReadTime}min</span>
              </div>
            </div>
          </div>
          
          {/* Right - Visual Element */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-green-500/20 rounded-2xl blur-xl"></div>
            <div className="relative p-8 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="serif-heading text-lg font-semibold text-white mb-2 drop-shadow-lg">Latest Insights</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                    <BookOpen className="h-5 w-5 text-blue-400 mr-3" />
                    <div>
                      <div className="text-sm font-semibold text-white drop-shadow-sm">Featured Article</div>
                      <div className="text-xs text-white/80 drop-shadow-sm">{featuredPost?.title.substring(0, 30)}...</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                    <TrendingUp className="h-5 w-5 text-green-400 mr-3" />
                    <div>
                      <div className="text-sm font-semibold text-white drop-shadow-sm">Most Recent</div>
                      <div className="text-xs text-white/80 drop-shadow-sm">{recentPosts[0]?.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                    <Clock className="h-5 w-5 text-purple-400 mr-3" />
                    <div>
                      <div className="text-sm font-semibold text-white drop-shadow-sm">Total Content</div>
                      <div className="text-xs text-white/80 drop-shadow-sm">{totalReadTime} minutes of reading</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-white/80 mb-3 text-center drop-shadow-sm">Popular Topics</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Research", "Technical", "Philosophy", "Markets"].map((topic, index) => (
                      <div 
                        key={topic}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/90 animate-fade-in backdrop-blur-sm"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="min-h-[700px] border border-white/20 rounded-lg bg-black/20 backdrop-blur-md shadow-2xl">
          <ResizablePanel defaultSize={75} minSize={60}>
            <div className="p-6 h-full">
              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/80" />
                    <Input
                      placeholder="Search articles..."
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

              {/* Blog Posts Grid */}
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <BlogCard
                      post={post}
                      variant={post.featured ? "featured" : "default"}
                      onRead={handleReadPost}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="p-6 h-full bg-black/30 backdrop-blur-sm">
              <h3 className="serif-heading text-lg font-semibold mb-4 text-white drop-shadow-lg">Blog Analytics</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400 drop-shadow-lg">{blogPosts.length}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Total Articles</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-400 drop-shadow-lg">{totalReadTime}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Minutes of Content</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-400 drop-shadow-lg">{categories.length - 1}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Categories</div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="serif-heading font-medium mb-3 text-white drop-shadow-lg">Recent Posts</h4>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <h5 className="text-sm font-medium text-white mb-1 drop-shadow-sm line-clamp-2">
                        {post.title}
                      </h5>
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <span className="drop-shadow-sm">{post.date}</span>
                        <Badge variant="secondary" className="text-xs bg-white/10 text-white/90 border-white/20 backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="serif-heading font-medium mb-3 text-white drop-shadow-lg">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1).map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs bg-white/10 text-white/90 border-white/20 backdrop-blur-sm">
                      {category}
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

export default Blog;
