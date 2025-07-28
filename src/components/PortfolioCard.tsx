
import { useState } from "react";
import { ExternalLink, Github, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PortfolioCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    date: string;
    performance?: string;
    githubUrl?: string;
    liveUrl?: string;
    status: "active" | "completed" | "research";
  };
  onExpand: (id: string) => void;
  isExpanded: boolean;
}

const PortfolioCard = ({ project, onExpand, isExpanded }: PortfolioCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: "bg-green-500/20 text-green-200 border-green-300/30",
    completed: "bg-blue-500/20 text-blue-200 border-blue-300/30",
    research: "bg-amber-500/20 text-amber-200 border-amber-300/30"
  };

  return (
    <Card 
      className={`elegant-transition hover:shadow-2xl hover:scale-[1.02] cursor-pointer bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 hover:border-white/30 shadow-xl ${
        isExpanded ? 'ring-2 ring-blue-400/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onExpand(project.id)}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <CardTitle className="serif-heading text-xl group-hover:text-blue-300 elegant-transition text-white drop-shadow-lg">
            {project.title}
          </CardTitle>
          <Badge className={`text-xs backdrop-blur-sm ${statusColors[project.status]}`}>
            {project.status}
          </Badge>
        </div>
        
        <CardDescription className="serif-body text-white/90 leading-relaxed drop-shadow-md">
          {project.description}
        </CardDescription>
        
        <div className="flex items-center space-x-4 text-sm text-white/80">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span className="drop-shadow-sm">{project.date}</span>
          </div>
          {project.performance && (
            <div className="flex items-center space-x-1 text-green-300">
              <TrendingUp className="h-3 w-3" />
              <span className="drop-shadow-sm">{project.performance}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-white/10 text-white/90 border-white/20 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>

        {isExpanded && (
          <div className="animate-fade-in space-y-4 pt-4 border-t border-white/20">
            <p className="serif-body text-white/90 leading-relaxed drop-shadow-md">
              {project.longDescription}
            </p>
            
            <div className="flex space-x-3">
              {project.githubUrl && (
                <Button size="sm" variant="outline" className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button size="sm" className="bg-blue-500/80 text-white hover:bg-blue-500/90 backdrop-blur-sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        <div className={`elegant-transition ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
