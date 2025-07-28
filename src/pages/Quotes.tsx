import { useState } from "react";
import { Search, Filter, Grid, List, Quote, TrendingUp, Heart, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useToast } from "@/hooks/use-toast";
import QuoteCard from "@/components/QuoteCard";

const Quotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const quotes = [
    {
      id: "1",
      text: "Precision is peace.",
      context: "On the clarity that comes from mathematical rigor",
      category: "philosophy",
      shares: 42
    },
    {
      id: "2", 
      text: "Not everything that burns is signal.",
      context: "On distinguishing meaningful patterns from market noise",
      category: "markets",
      shares: 38
    },
    {
      id: "3",
      text: "Even if I only reach a few, I'll reach them fully.",
      context: "On the value of depth over breadth in communication",
      category: "wisdom",
      shares: 29
    },
    {
      id: "4",
      text: "The best alpha is often found in the spaces between conventional wisdom.",
      context: "On contrarian thinking in quantitative research",
      category: "research",
      shares: 51
    },
    {
      id: "5",
      text: "Elegance in mathematics is not decoration—it's efficiency of thought.",
      context: "On the beauty of simple, powerful solutions",
      category: "philosophy",
      shares: 34
    },
    {
      id: "6",
      text: "Every model is wrong, but some models are useful. The art is knowing which ones.",
      context: "On practical application of statistical models",
      category: "research",
      shares: 46
    },
    {
      id: "7",
      text: "Silence often contains more information than noise.",
      context: "On the importance of what isn't there",
      category: "wisdom",
      shares: 33
    },
    {
      id: "8",
      text: "The market rewards patience until it doesn't, and speed until it won't.",
      context: "On the paradoxes of timing in systematic trading",
      category: "markets",
      shares: 41
    },
    {
      id: "9",
      text: "True diversification is not just across assets, but across ways of thinking.",
      context: "On intellectual portfolio construction",
      category: "philosophy",
      shares: 37
    },
    {
      id: "10",
      text: "In a world of infinite data, attention becomes the scarcest resource.",
      context: "On focus in the age of information overload",
      category: "technology",
      shares: 44
    },
    {
      id: "11",
      text: "The most dangerous phrase in quantitative research is 'this time is different.'",
      context: "On the persistence of patterns and the trap of exceptionalism",
      category: "research",
      shares: 39
    },
    {
      id: "12",
      text: "Risk is not the chance of losing money; it's the chance of not understanding why you lost it.",
      context: "On the nature of true risk in systematic trading",
      category: "risk",
      shares: 48
    },
    {
      id: "13",
      text: "Great researchers don't just find signals—they understand why the signals exist.",
      context: "On the importance of causality in quantitative work",
      category: "research",
      shares: 35
    },
    {
      id: "14",
      text: "The market is a complex system masquerading as a complicated one.",
      context: "On the difference between complexity and complication",
      category: "markets",
      shares: 42
    },
    {
      id: "15",
      text: "Code is poetry that computers happen to understand.",
      context: "On the art of programming in quantitative finance",
      category: "technology",
      shares: 31
    },
    {
      id: "16",
      text: "The most valuable insights are often the ones that prevent us from making mistakes.",
      context: "On defensive research and risk management",
      category: "wisdom",
      shares: 36
    }
  ];

  const filters = ["all", "philosophy", "markets", "research", "risk", "technology", "wisdom", "favorites"];

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.context.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         quote.category === selectedFilter ||
                         (selectedFilter === "favorites" && favorites.has(quote.id));
    return matchesSearch && matchesFilter;
  }).map(quote => ({
    ...quote,
    favorite: favorites.has(quote.id)
  }));

  const toggleFavorite = (quoteId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(quoteId)) {
        newFavorites.delete(quoteId);
        toast({
          title: "Removed from favorites",
          description: "Quote removed from your collection.",
        });
      } else {
        newFavorites.add(quoteId);
        toast({
          title: "Added to favorites",
          description: "Quote saved to your collection.",
        });
      }
      return newFavorites;
    });
  };

  const shuffleQuotes = () => {
    setExpandedCard(null);
    toast({
      title: "Fresh perspective",
      description: "Quotes reshuffled for new inspiration.",
    });
  };

  const mostSharedQuote = quotes.reduce((prev, current) => 
    (prev.shares || 0) > (current.shares || 0) ? prev : current
  );

  const totalShares = quotes.reduce((sum, quote) => sum + (quote.shares || 0), 0);
  const avgShares = Math.round(totalShares / quotes.length);

  return (
    <div className="section-spacing min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <h1 className="serif-heading text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Collected Thoughts
            </h1>
            <p className="serif-body text-xl text-white/90 leading-relaxed drop-shadow-md">
              Distilled observations from years of working at the intersection of mathematics, 
              markets, and meaning. Each thought captures a moment of clarity worth preserving.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="drop-shadow-sm">Active Collection: {quotes.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <span className="drop-shadow-sm">Total Shares: {totalShares}</span>
              </div>
            </div>
          </div>
          
          {/* Right - Visual Element */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-green-500/20 rounded-2xl blur-xl"></div>
            <div className="relative p-8 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
              <div className="grid grid-cols-3 gap-4">
                {/* Quote Metrics */}
                <div className="col-span-3 text-center mb-4">
                  <h3 className="serif-heading text-lg font-semibold text-white mb-2 drop-shadow-lg">Collection Overview</h3>
                </div>
                
                <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-blue-400 drop-shadow-lg">{quotes.length}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Total Quotes</div>
                </div>
                
                <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-green-400 drop-shadow-lg">{avgShares}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Avg Shares</div>
                </div>
                
                <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-400 drop-shadow-lg">{favorites.size}</div>
                  <div className="text-xs text-white/80 drop-shadow-sm">Favorites</div>
                </div>
                
                {/* Categories Visualization */}
                <div className="col-span-3 mt-4">
                  <div className="flex justify-center space-x-2 flex-wrap gap-2">
                    {["Philosophy", "Markets", "Research", "Risk", "Technology", "Wisdom"].map((category, index) => (
                      <div 
                        key={category}
                        className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90 animate-fade-in backdrop-blur-sm"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] border border-white/20 rounded-lg bg-black/20 backdrop-blur-md shadow-2xl">
          {/* Main Content Panel */}
          <ResizablePanel defaultSize={75} minSize={60}>
            <div className="p-6 h-full">
              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/80" />
                    <Input
                      placeholder="Search thoughts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-white/80" />
                    <div className="flex space-x-1 flex-wrap">
                      {filters.map((filter) => (
                        <Button
                          key={filter}
                          variant={selectedFilter === filter ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setSelectedFilter(filter)}
                          className={`capitalize ${
                            selectedFilter === filter
                              ? "bg-blue-500/80 text-white hover:bg-blue-500/90"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          } backdrop-blur-sm`}
                        >
                          {filter === "favorites" ? (
                            <Heart className="mr-1 h-3 w-3" />
                          ) : null}
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    onClick={shuffleQuotes}
                    variant="outline"
                    size="sm"
                    className="elegant-transition bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  >
                    <Shuffle className="mr-2 h-4 w-4" />
                    Shuffle
                  </Button>
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

              {/* Quotes Grid */}
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 lg:grid-cols-2" 
                  : "grid-cols-1"
              }`}>
                {filteredQuotes.map((quote, index) => (
                  <div
                    key={quote.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <QuoteCard
                      quote={quote}
                      onExpand={setExpandedCard}
                      isExpanded={expandedCard === quote.id}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>

              {filteredQuotes.length === 0 && (
                <div className="text-center py-12">
                  <Quote className="h-16 w-16 text-white/80 mx-auto mb-4" />
                  <h3 className="serif-heading text-lg font-medium text-white mb-2 drop-shadow-lg">No quotes found</h3>
                  <p className="serif-body text-white/90 drop-shadow-md">Try adjusting your search or filters to discover more thoughts.</p>
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Sidebar Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <div className="p-6 h-full bg-black/30 backdrop-blur-sm">
              <h3 className="serif-heading text-lg font-semibold mb-4 text-white drop-shadow-lg">Insights</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400 drop-shadow-lg">{quotes.length}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Total Thoughts</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-400 drop-shadow-lg">{mostSharedQuote.shares}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Most Shared</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-400 drop-shadow-lg">{favorites.size}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">Your Favorites</div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="serif-heading font-medium mb-3 text-white drop-shadow-lg">Most Shared Quote</h4>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <blockquote className="serif-body text-sm text-white italic mb-2 drop-shadow-md">
                    "{mostSharedQuote.text}"
                  </blockquote>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="drop-shadow-sm">{mostSharedQuote.shares} shares</span>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/90 border-white/20 backdrop-blur-sm">
                      {mostSharedQuote.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="serif-heading font-medium mb-3 text-white drop-shadow-lg">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {["philosophy", "markets", "research", "risk", "technology", "wisdom"].map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs capitalize bg-white/10 text-white/90 border-white/20 backdrop-blur-sm">
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

export default Quotes;
