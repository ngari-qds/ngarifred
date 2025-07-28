
import { Mail, Linkedin, Github, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ContactInfo = () => {
  return (
    <div className="space-y-6">
      {/* Response Time */}
      <Card className="bg-amber-500/20 border-amber-300/30 backdrop-blur-md shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-5 w-5 text-amber-300" />
            <h3 className="serif-heading text-lg font-semibold text-white drop-shadow-lg">
              Response Time
            </h3>
          </div>
          <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
            I typically respond within 48 hours. For urgent matters, please mention it in your subject line.
          </p>
        </CardContent>
      </Card>

      {/* Direct Contact */}
      <Card className="bg-black/20 border-white/20 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="serif-heading text-lg text-white drop-shadow-lg">
            Direct Contact
          </CardTitle>
          <CardDescription className="serif-body text-white/90 drop-shadow-md">
            Reach out directly via email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            href="mailto:fred@example.com"
            className="flex items-center space-x-3 text-white/90 hover:text-blue-300 elegant-transition group p-3 rounded-lg hover:bg-white/10 backdrop-blur-sm"
          >
            <Mail className="h-5 w-5 group-hover:scale-110 elegant-transition" />
            <span className="serif-body drop-shadow-sm">qdsa@ngarifred.live</span>
          </a>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="bg-black/20 border-white/20 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="serif-heading text-lg text-white drop-shadow-lg">
            Connect Online
          </CardTitle>
          <CardDescription className="serif-body text-white/90 drop-shadow-md">
            Find me on these platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <a
            href="https://linkedin.com/in/ngariqds"
            className="flex items-center space-x-3 text-white/90 hover:text-blue-300 elegant-transition group p-3 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5 group-hover:scale-110 elegant-transition" />
            <span className="serif-body drop-shadow-sm">LinkedIn</span>
          </a>
          
          <a
            href="https://github.com/ngari-qds"
            className="flex items-center space-x-3 text-white/90 hover:text-purple-300 elegant-transition group p-3 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 group-hover:scale-110 elegant-transition" />
            <span className="serif-body drop-shadow-sm">GitHub</span>
          </a>
          
          <a
            href="https://substack.com/@ngariqds"
            className="flex items-center space-x-3 text-white/90 hover:text-green-300 elegant-transition group p-3 rounded-lg hover:bg-white/10 backdrop-blur-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="h-5 w-5 bg-green-500/80 rounded text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 elegant-transition">
              S
            </div>
            <span className="serif-body drop-shadow-sm">Substack</span>
          </a>
        </CardContent>
      </Card>

      {/* Collaboration Note */}
      <Card className="bg-purple-500/20 border-purple-300/30 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="serif-heading text-lg text-white drop-shadow-lg">
            Collaboration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
            I'm particularly interested in conversations about signal research, 
            systematic trading challenges, and the intersection of academic theory 
            with practical implementation.
          </p>
        </CardContent>
      </Card>

      {/* Current Focus */}
      <Card className="bg-blue-500/20 border-blue-300/30 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="serif-heading text-lg text-white drop-shadow-lg">
            Current Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="serif-body text-white/90 text-sm leading-relaxed drop-shadow-md">
            Actively researching alternative data integration and model robustness. 
            Always open to discussing interesting problems in quantitative finance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
