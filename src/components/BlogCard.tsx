
import { useState } from "react";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    date: string;
    readTime: string;
    category: string;
    featured?: boolean;
  };
  variant?: "default" | "featured";
  onRead: (id: string) => void;
}

const BlogCard = ({ post, variant = "default", onRead }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isFeatured = variant === "featured" || post.featured;

  return (
    <Card 
      className={`elegant-transition hover:shadow-2xl cursor-pointer bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 hover:border-white/30 shadow-xl group ${
        isFeatured ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onRead(post.id)}
    >
      <CardHeader className={`space-y-3 ${isFeatured ? 'pb-4' : ''}`}>
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-200 border-blue-300/30 backdrop-blur-sm">
            {post.category}
          </Badge>
          <div className="flex items-center space-x-2 text-xs text-white/80">
            <Clock className="h-3 w-3" />
            <span className="drop-shadow-sm">{post.readTime}</span>
          </div>
        </div>
        
        <CardTitle className={`serif-heading group-hover:text-blue-300 elegant-transition text-white drop-shadow-lg ${
          isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          {post.title}
        </CardTitle>
        
        <CardDescription className={`serif-body text-white/90 leading-relaxed drop-shadow-md ${
          isFeatured ? 'text-base' : 'text-sm'
        }`}>
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, isFeatured ? 5 : 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-white/10 text-white/90 border-white/20 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-white/80">
            <Calendar className="h-3 w-3" />
            <span className="drop-shadow-sm">{post.date}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className={`elegant-transition hover:bg-white/10 text-white/90 hover:text-white backdrop-blur-sm ${isHovered ? 'translate-x-1' : ''}`}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className={`elegant-transition ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
