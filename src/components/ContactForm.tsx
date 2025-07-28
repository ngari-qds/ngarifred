
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "Thank you for reaching out. I'll respond within 48 hours.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1000);
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <Card className="h-fit bg-black/20 backdrop-blur-md border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="serif-heading text-2xl text-white drop-shadow-lg">
          Send a Message
        </CardTitle>
        <CardDescription className="serif-body text-white/90 drop-shadow-md">
          Let's discuss your ideas and potential collaborations
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="serif-body text-sm font-medium text-white/90 drop-shadow-sm">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="serif-body bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="serif-body text-sm font-medium text-white/90 drop-shadow-sm">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="serif-body bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject" className="serif-body text-sm font-medium text-white/90 drop-shadow-sm">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="What would you like to discuss?"
              className="serif-body bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="serif-body text-sm font-medium text-white/90 drop-shadow-sm">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Share your thoughts, questions, or collaboration ideas..."
              className="serif-body resize-vertical min-h-[120px] bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm"
              required
            />
          </div>
          
          <Button
            type="submit"
            size="lg"
            disabled={!isFormValid || isSubmitting}
            className="w-full elegant-transition bg-blue-500/80 hover:bg-blue-500/90 text-white backdrop-blur-sm shadow-lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
