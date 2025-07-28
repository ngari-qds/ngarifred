
import { useState } from "react";
import { Calendar, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SpeakingCardProps {
  event: {
    title: string;
    venue: string;
    date: string;
    type: string;
    description: string;
  };
  onExpand: (title: string) => void;
  isExpanded: boolean;
}

const SpeakingCard = ({ event, onExpand, isExpanded }: SpeakingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const typeColors = {
    Keynote: "bg-purple-500/20 text-purple-200 border-purple-300/30",
    Panel: "bg-blue-500/20 text-blue-200 border-blue-300/30",
    Workshop: "bg-green-500/20 text-green-200 border-green-300/30",
    "Guest Lecture": "bg-amber-500/20 text-amber-200 border-amber-300/30",
    default: "bg-white/20 text-white/90 border-white/30"
  };

  return (
    <Card 
      className={`elegant-transition hover:shadow-2xl hover:scale-[1.02] cursor-pointer bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 hover:border-white/30 shadow-xl group relative overflow-hidden ${
        isExpanded ? 'ring-2 ring-blue-400/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onExpand(event.title)}
    >
      {/* Speaking Icon Background */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 elegant-transition">
        <Mic className="h-12 w-12 text-white" />
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <Badge className={`text-xs backdrop-blur-sm ${typeColors[event.type as keyof typeof typeColors] || typeColors.default}`}>
            {event.type}
          </Badge>
          <div className="flex items-center space-x-1 text-sm text-white/80">
            <Calendar className="h-3 w-3" />
            <span className="drop-shadow-sm">{event.date}</span>
          </div>
        </div>
        
        <CardTitle className="serif-heading text-lg font-semibold text-white group-hover:text-blue-300 elegant-transition drop-shadow-lg">
          {event.title}
        </CardTitle>
        
        <p className="serif-body text-blue-300 font-medium drop-shadow-md">{event.venue}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
          {event.description}
        </p>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="animate-fade-in space-y-4 pt-4 border-t border-white/20">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="serif-heading font-medium text-white mb-2 drop-shadow-lg">Event Impact</h4>
              <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
                This {event.type.toLowerCase()} contributed to advancing the field's understanding 
                of quantitative finance, sharing practical insights with industry professionals 
                and academic researchers.
              </p>
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

export default SpeakingCard;
