
import { useState } from "react";
import { FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PublicationCardProps {
  paper: {
    title: string;
    venue: string;
    year: string;
    coauthors: string;
    abstract: string;
    citations: number;
  };
  onExpand: (title: string) => void;
  isExpanded: boolean;
}

const PublicationCard = ({ paper, onExpand, isExpanded }: PublicationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVenueColor = (venue: string) => {
    if (venue.includes("Journal of Finance")) return "bg-purple-500/20 text-purple-200 border-purple-300/30";
    if (venue.includes("Financial Economics")) return "bg-blue-500/20 text-blue-200 border-blue-300/30";
    if (venue.includes("Financial Analysts")) return "bg-green-500/20 text-green-200 border-green-300/30";
    return "bg-white/20 text-white/90 border-white/30";
  };

  return (
    <Card 
      className={`elegant-transition hover:shadow-2xl hover:scale-[1.02] cursor-pointer bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 hover:border-white/30 shadow-xl group relative overflow-hidden ${
        isExpanded ? 'ring-2 ring-blue-400/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onExpand(paper.title)}
    >
      {/* Publication Icon Background */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 elegant-transition">
        <FileText className="h-12 w-12 text-white" />
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <Badge className={`text-xs backdrop-blur-sm ${getVenueColor(paper.venue)}`}>
            {paper.year}
          </Badge>
          <div className="flex items-center space-x-1 text-sm text-green-300">
            <TrendingUp className="h-3 w-3" />
            <span className="drop-shadow-sm">{paper.citations} citations</span>
          </div>
        </div>
        
        <CardTitle className="serif-heading text-lg font-semibold text-white group-hover:text-blue-300 elegant-transition drop-shadow-lg">
          {paper.title}
        </CardTitle>
        
        <div className="space-y-1">
          <p className="serif-body text-blue-300 font-medium text-sm drop-shadow-md">{paper.venue}</p>
          <p className="serif-body text-white/80 text-xs drop-shadow-sm">Co-authors: {paper.coauthors}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
          <span className="font-medium">Abstract:</span> {paper.abstract}
        </p>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="animate-fade-in space-y-4 pt-4 border-t border-white/20">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="serif-heading font-medium text-white mb-2 drop-shadow-lg">Research Contribution</h4>
              <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
                This research advances the field by introducing novel methodologies and empirical insights. 
                With {paper.citations} citations, it has influenced subsequent work in quantitative finance 
                and continues to inform practitioner strategies.
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="drop-shadow-sm">Published in {paper.venue}</span>
              <span className="drop-shadow-sm">Peer-reviewed research</span>
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

export default PublicationCard;
