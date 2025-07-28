
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: {
    name: string;
    category: string;
    description: string;
    icon: string;
    link: string;
  };
  onExpand: (name: string) => void;
  isExpanded: boolean;
}

const ToolCard = ({ tool, onExpand, isExpanded }: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    Programming: "bg-blue-500/20 text-blue-200 border-blue-300/30",
    Data: "bg-green-500/20 text-green-200 border-green-300/30",
    Libraries: "bg-purple-500/20 text-purple-200 border-purple-300/30",
    Development: "bg-indigo-500/20 text-indigo-200 border-indigo-300/30",
    "Version Control": "bg-amber-500/20 text-amber-200 border-amber-300/30",
    Documentation: "bg-red-500/20 text-red-200 border-red-300/30",
    Infrastructure: "bg-cyan-500/20 text-cyan-200 border-cyan-300/30",
    Cloud: "bg-orange-500/20 text-orange-200 border-orange-300/30",
    default: "bg-white/20 text-white/90 border-white/30"
  };

  return (
    <Card 
      className={`elegant-transition hover:shadow-2xl hover:scale-[1.02] cursor-pointer bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 hover:border-white/30 shadow-xl group text-center relative overflow-hidden ${
        isExpanded ? 'ring-2 ring-blue-400/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onExpand(tool.name)}
    >
      <CardHeader className="space-y-4">
        <div className="text-4xl mb-3 group-hover:scale-110 elegant-transition">{tool.icon}</div>
        
        <CardTitle className="serif-heading text-lg font-semibold text-white group-hover:text-blue-300 elegant-transition drop-shadow-lg">
          {tool.name}
        </CardTitle>
        
        <Badge className={`text-xs backdrop-blur-sm ${categoryColors[tool.category as keyof typeof categoryColors] || categoryColors.default} mx-auto`}>
          {tool.category}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
          {tool.description}
        </p>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="animate-fade-in space-y-4 pt-4 border-t border-white/20">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="serif-heading font-medium text-white mb-2 drop-shadow-lg">Professional Use</h4>
              <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
                {tool.name} is integral to the quantitative research workflow, 
                enabling efficient {tool.category.toLowerCase()} practices that scale 
                from research prototypes to production systems.
              </p>
            </div>
            
            <a 
              href={tool.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 elegant-transition"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="serif-body text-sm drop-shadow-sm">Learn More</span>
            </a>
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

export default ToolCard;
