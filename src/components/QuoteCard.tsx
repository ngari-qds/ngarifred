
import { useState } from "react";
import { Copy, Check, Quote, Heart, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface QuoteCardProps {
  quote: {
    id: string;
    text: string;
    context: string;
    category: string;
    favorite?: boolean;
    shares?: number;
  };
  onExpand: (id: string) => void;
  isExpanded: boolean;
  onToggleFavorite?: (id: string) => void;
}

const QuoteCard = ({ quote, onExpand, isExpanded, onToggleFavorite }: QuoteCardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const categoryColors = {
    philosophy: "bg-purple-500/20 text-purple-200 border-purple-300/30",
    markets: "bg-blue-500/20 text-blue-200 border-blue-300/30",
    research: "bg-green-500/20 text-green-200 border-green-300/30",
    risk: "bg-red-500/20 text-red-200 border-red-300/30",
    technology: "bg-indigo-500/20 text-indigo-200 border-indigo-300/30",
    wisdom: "bg-amber-500/20 text-amber-200 border-amber-300/30",
    default: "bg-white/20 text-white/90 border-white/30"
  };

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(`"${quote.text}" — Fred Mwaniki`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Quote copied",
        description: "Ready to share wherever inspiration is needed.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try selecting and copying manually.",
        variant: "destructive",
      });
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(quote.id);
  };

  return (
    <Card 
      className={`elegant-transition hover:shadow-2xl hover:scale-[1.02] cursor-pointer bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 hover:border-white/30 shadow-xl group relative overflow-hidden ${
        isExpanded ? 'ring-2 ring-blue-400/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onExpand(quote.id)}
    >
      {/* Quote Icon Background */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 elegant-transition">
        <Quote className="h-16 w-16 text-white" />
      </div>

      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between">
          <Badge className={`text-xs backdrop-blur-sm ${categoryColors[quote.category as keyof typeof categoryColors] || categoryColors.default}`}>
            {quote.category}
          </Badge>
          <div className="flex items-center space-x-1">
            {quote.shares && (
              <div className="flex items-center space-x-1 text-xs text-white/80">
                <Share2 className="h-3 w-3" />
                <span className="drop-shadow-sm">{quote.shares}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Quote Text */}
        <blockquote className="serif-heading text-lg font-medium text-white leading-relaxed italic relative drop-shadow-lg">
          <span className="text-3xl text-white/20 absolute -top-2 -left-1">"</span>
          <span className="relative pl-4">{quote.text}</span>
          <span className="text-3xl text-white/20 absolute -bottom-2 -right-1">"</span>
        </blockquote>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Context */}
        <p className="serif-body text-sm text-white/80 opacity-75 leading-relaxed drop-shadow-md">
          {quote.context}
        </p>
        
        {/* Attribution and Actions */}
        <div className="flex items-center justify-between">
          <cite className="serif-body text-sm text-blue-300 not-italic font-medium drop-shadow-sm">
            — Fred Mwaniki
          </cite>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 elegant-transition">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className="h-8 w-8 p-0 hover:bg-white/10 backdrop-blur-sm"
            >
              <Heart className={`h-4 w-4 ${quote.favorite ? 'fill-red-400 text-red-400' : 'text-white/80'}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0 hover:bg-white/10 backdrop-blur-sm"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-white/80" />
              )}
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="animate-fade-in space-y-4 pt-4 border-t border-white/20">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="serif-heading font-medium text-white mb-2 drop-shadow-lg">Reflection</h4>
              <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
                This thought emerged from {quote.context.toLowerCase()}, representing a moment 
                where complexity crystallized into clarity. Such insights often come not from 
                forcing understanding, but from patient observation and rigorous thinking.
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="drop-shadow-sm">Added to collection</span>
              <span className="drop-shadow-sm">Recently contemplated</span>
            </div>
          </div>
        )}

        {/* Hover Effect */}
        <div className={`elegant-transition ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
