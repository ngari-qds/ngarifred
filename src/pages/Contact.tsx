
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";

const Contact = () => {
  return (
    <div className="section-spacing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h1 className="serif-heading text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Let's Connect
          </h1>
          <p className="serif-body text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            If it aligns, I'll reply. If not, keep building yours.
          </p>
        </div>

        {/* Resizable Layout */}
        <ResizablePanelGroup 
          direction="horizontal" 
          className="min-h-[600px] rounded-2xl border border-white/20 bg-black/10 backdrop-blur-md shadow-2xl"
        >
          {/* Contact Form Panel */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="p-8 h-full">
              <ContactForm />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Contact Info Panel */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="p-8 h-full overflow-auto bg-black/20 backdrop-blur-md rounded-r-2xl border-l border-white/20">
              <ContactInfo />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="serif-heading text-2xl font-bold text-white mb-4 drop-shadow-lg">
              Why Connect?
            </h2>
            <p className="serif-body text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Whether you're exploring quantitative strategies, discussing market inefficiencies, 
              or seeking collaboration on research projects, I'm always interested in meaningful 
              conversations that push the boundaries of financial technology and theory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
