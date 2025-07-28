
import { useState } from "react";
import { Star, ExternalLink, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: {
    title: string;
    author: string;
    category: string;
    description: string;
    rating: number;
    link: string;
  };
  onExpand: (title: string) => void;
  isExpanded: boolean;
}

const BookCard = ({ book, onExpand, isExpanded }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    Biography: "bg-purple-500/20 text-purple-200 border-purple-300/30",
    Technical: "bg-blue-500/20 text-blue-200 border-blue-300/30",
    "Risk Management": "bg-red-500/20 text-red-200 border-red-300/30",
    Academic: "bg-green-500/20 text-green-200 border-green-300/30",
    Behavioral: "bg-amber-500/20 text-amber-200 border-amber-300/30",
    default: "bg-white/20 text-white/90 border-white/30"
  };

  return (
    <Card 
      className={`elegant-transition hover:shadow-2xl hover:scale-[1.02] cursor-pointer bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 hover:border-white/30 shadow-xl group relative overflow-hidden ${
        isExpanded ? 'ring-2 ring-blue-400/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onExpand(book.title)}
    >
      {/* Book Icon Background */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 elegant-transition">
        <BookOpen className="h-12 w-12 text-white" />
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <Badge className={`text-xs backdrop-blur-sm ${categoryColors[book.category as keyof typeof categoryColors] || categoryColors.default}`}>
            {book.category}
          </Badge>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        <CardTitle className="serif-heading text-lg font-semibold text-white group-hover:text-blue-300 elegant-transition drop-shadow-lg">
          {book.title}
        </CardTitle>
        
        <p className="serif-body text-blue-300 font-medium text-sm drop-shadow-md">by {book.author}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
          {book.description}
        </p>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="animate-fade-in space-y-4 pt-4 border-t border-white/20">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="serif-heading font-medium text-white mb-2 drop-shadow-lg">Why This Book Matters</h4>
              <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
                This book has fundamentally shaped my understanding of quantitative finance. 
                The insights and methodologies presented continue to influence my research 
                approach and practical applications in the field.
              </p>
            </div>
            
            <a 
              href={book.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 elegant-transition"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="serif-body text-sm drop-shadow-sm">Get the Book</span>
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

export default BookCard;
