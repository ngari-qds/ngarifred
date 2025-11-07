import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Wallet, 
  Shield, 
  Store, 
  Users, 
  Cpu, 
  Globe,
  Zap,
  Lock,
  Code,
  Heart,
  TrendingUp,
  FileCheck,
  ShoppingBag,
  Radio,
  Sparkles,
  Building2,
  Flag
} from "lucide-react";

const KeChat = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 py-12">
        
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-red-500/20 px-4 py-2 rounded-full mb-6 border border-white/20">
            <Flag className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-200">Kenya's Digital Future</span>
          </div>
          <h1 className="serif-heading text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            KeChat
          </h1>
          <p className="serif-body text-xl lg:text-2xl text-gray-200 mb-4 max-w-4xl mx-auto">
            Kenya's Next-Generation Sovereign Super-App
          </p>
          <p className="serif-body text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A secure, all-in-one digital ecosystem for communication, commerce, and public services—
            built with Kenya's cultural, linguistic, and economic context at its core.
          </p>
        </section>

        {/* Vision Statement */}
        <Card className="mb-12 bg-gradient-to-br from-green-900/30 via-black/50 to-red-900/30 border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="serif-heading text-3xl text-white flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="serif-body text-lg text-gray-200 leading-relaxed">
              KeChat represents a paradigm shift in how Kenyans interact with digital services. 
              More than a messaging app, it's a comprehensive digital sovereign platform that puts 
              Kenya's citizens first—ensuring data residency, cultural relevance, and economic empowerment.
            </p>
            <p className="serif-body text-lg text-gray-200 leading-relaxed">
              By integrating communication, payments, government services, and commerce into one 
              unified experience, KeChat eliminates fragmentation and creates a truly Kenyan digital identity.
            </p>
          </CardContent>
        </Card>

        {/* Core Architecture */}
        <section className="mb-12">
          <h2 className="serif-heading text-4xl font-bold text-white mb-8 text-center">
            System Architecture
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-md hover:border-blue-400/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-400" />
                  Frontend Layer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-blue-500/50 text-blue-300">React Native</Badge>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-300">Progressive Web App</Badge>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-300">Offline-First</Badge>
                </div>
                <p className="text-sm">Cross-platform mobile apps (iOS/Android) with web fallback for universal accessibility</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-500/30 backdrop-blur-md hover:border-green-400/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-6 w-6 text-green-400" />
                  Backend Services
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-green-500/50 text-green-300">Microservices</Badge>
                  <Badge variant="outline" className="border-green-500/50 text-green-300">GraphQL/REST</Badge>
                  <Badge variant="outline" className="border-green-500/50 text-green-300">Event-Driven</Badge>
                </div>
                <p className="text-sm">Scalable Kubernetes-based services with Node.js, Go, and Python microservices</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md hover:border-purple-400/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-6 w-6 text-purple-400" />
                  Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-purple-500/50 text-purple-300">Local Data Centers</Badge>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-300">Multi-Region</Badge>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-300">99.99% Uptime</Badge>
                </div>
                <p className="text-sm">Kenya-based data centers with disaster recovery and edge computing nodes</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/40 border-yellow-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-xl">Technical Stack Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Real-Time Communication</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>WebRTC for voice/video calls</li>
                    <li>WebSocket for instant messaging</li>
                    <li>Signal Protocol for E2E encryption</li>
                    <li>Adaptive bitrate streaming</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Data & Storage</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>PostgreSQL for transactional data</li>
                    <li>Redis for caching & sessions</li>
                    <li>MongoDB for chat history</li>
                    <li>S3-compatible object storage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Security & Compliance</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Zero-knowledge architecture</li>
                    <li>Hardware security modules (HSM)</li>
                    <li>GDPR & Kenya DPA compliant</li>
                    <li>Biometric authentication</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Performance</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>CDN integration for media</li>
                    <li>Intelligent data compression</li>
                    <li>2G/3G network optimization</li>
                    <li>Battery-efficient protocols</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Core Features */}
        <section className="mb-12">
          <h2 className="serif-heading text-4xl font-bold text-white mb-8 text-center">
            Core Features & Modules
          </h2>

          <Tabs defaultValue="messaging" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-black/50 border border-white/20">
              <TabsTrigger value="messaging" className="data-[state=active]:bg-blue-500/30">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messaging
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-green-500/30">
                <Wallet className="h-4 w-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="government" className="data-[state=active]:bg-red-500/30">
                <FileCheck className="h-4 w-4 mr-2" />
                E-Gov
              </TabsTrigger>
              <TabsTrigger value="commerce" className="data-[state=active]:bg-purple-500/30">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Commerce
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-yellow-500/30">
                <Users className="h-4 w-4 mr-2" />
                Community
              </TabsTrigger>
              <TabsTrigger value="innovation" className="data-[state=active]:bg-pink-500/30">
                <Cpu className="h-4 w-4 mr-2" />
                Innovation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="messaging" className="mt-6">
              <Card className="bg-black/40 border-blue-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <MessageSquare className="h-7 w-7 text-blue-400" />
                    Messaging & Communication
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    WhatsApp-equivalent core with enhanced Kenyan context
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-blue-300" />
                        Secure Messaging
                      </h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ End-to-end encrypted chats</li>
                        <li>✓ Group chats up to 10,000 members</li>
                        <li>✓ Broadcast channels for announcements</li>
                        <li>✓ Self-destructing messages</li>
                        <li>✓ Rich media sharing (photos, videos, docs)</li>
                        <li>✓ Voice messages with transcription</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Radio className="h-5 w-5 text-blue-300" />
                        Voice & Video
                      </h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ HD voice and video calls</li>
                        <li>✓ Group video calls (up to 50 participants)</li>
                        <li>✓ Screen sharing capabilities</li>
                        <li>✓ Low-bandwidth mode for 2G/3G</li>
                        <li>✓ Call recording with consent</li>
                        <li>✓ Virtual backgrounds with Kenyan themes</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                    <h4 className="font-semibold text-white mb-2">Kenyan Language Support</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Multi-language interface supporting Swahili, English, Kikuyu, Luo, Luhya, Kamba, and more.
                      AI-powered translation for inter-language conversations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <Card className="bg-black/40 border-green-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Wallet className="h-7 w-7 text-green-400" />
                    Digital Payments & Financial Services
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Seamless integration with Kenya's mobile money ecosystem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Mobile Money Integration</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ M-Pesa direct integration</li>
                        <li>✓ Airtel Money support</li>
                        <li>✓ T-Kash connectivity</li>
                        <li>✓ Instant peer-to-peer transfers</li>
                        <li>✓ QR code payments</li>
                        <li>✓ NFC tap-to-pay</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Advanced Features</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Bill payments (KPLC, water, rent)</li>
                        <li>✓ Airtime & data purchase</li>
                        <li>✓ Group expense splitting</li>
                        <li>✓ Savings & investment accounts</li>
                        <li>✓ Micro-loans & credit access</li>
                        <li>✓ International remittances</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                    <h4 className="font-semibold text-white mb-2">Merchant Ecosystem</h4>
                    <p className="text-gray-300 text-sm">
                      Zero-commission period for first 100,000 SME merchants. Integrated POS system, 
                      inventory management, and real-time analytics. Support for Lipa Na M-Pesa integration.
                    </p>
                  </div>
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                    <h4 className="font-semibold text-white mb-2">Financial Inclusion</h4>
                    <p className="text-gray-300 text-sm">
                      Credit scoring based on transaction history. Partnerships with SACCOs and microfinance 
                      institutions. Educational content on financial literacy in local languages.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="government" className="mt-6">
              <Card className="bg-black/40 border-red-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <FileCheck className="h-7 w-7 text-red-400" />
                    E-Government Access
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Seamless integration with Kenya's digital government services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Digital Identity</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Huduma Namba integration</li>
                        <li>✓ Digital ID verification (eCitizen)</li>
                        <li>✓ Biometric authentication</li>
                        <li>✓ KRA PIN integration</li>
                        <li>✓ NHIF & NSSF access</li>
                        <li>✓ Document storage (ID, passport, certificates)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Public Services</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Tax filing & returns (iTax)</li>
                        <li>✓ Business registration</li>
                        <li>✓ License renewals (driving, business)</li>
                        <li>✓ Land registry searches</li>
                        <li>✓ Police clearance certificates</li>
                        <li>✓ Birth/death certificate applications</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                    <h4 className="font-semibold text-white mb-2">Digital Democracy</h4>
                    <p className="text-gray-300 text-sm">
                      Verified voter registration. Secure digital voting for local and national elections 
                      (subject to IEBC approval). Public participation in county budgets. Direct communication 
                      with elected officials.
                    </p>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                    <h4 className="font-semibold text-white mb-2">Emergency Services</h4>
                    <p className="text-gray-300 text-sm">
                      One-tap emergency contacts (999, 911, 112). Location sharing with first responders. 
                      Panic button with silent alarm. Integration with county emergency response systems.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commerce" className="mt-6">
              <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <ShoppingBag className="h-7 w-7 text-purple-400" />
                    Commerce & Services Marketplace
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Integrated marketplace for goods, services, and on-demand solutions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">In-App Marketplace</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ SME storefronts with zero setup fees</li>
                        <li>✓ Product listings with local currency</li>
                        <li>✓ Customer reviews & ratings</li>
                        <li>✓ Integrated payment & escrow</li>
                        <li>✓ Inventory management tools</li>
                        <li>✓ Seller analytics dashboard</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">On-Demand Services</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Ride-hailing (KeRide)</li>
                        <li>✓ Food delivery (KeEats)</li>
                        <li>✓ Package delivery (KeDeliver)</li>
                        <li>✓ Home services (repairs, cleaning)</li>
                        <li>✓ Professional services (legal, accounting)</li>
                        <li>✓ Healthcare appointments & telemedicine</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-white mb-2">Agricultural Integration</h4>
                    <p className="text-gray-300 text-sm">
                      Direct farmer-to-consumer marketplace. Weather forecasts and crop advisory. 
                      Input suppliers directory. Agricultural extension services. Market price tracking.
                    </p>
                  </div>
                  <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-white mb-2">Tourism & Hospitality</h4>
                    <p className="text-gray-300 text-sm">
                      Hotel and safari bookings. Tour guide directory. Event ticketing (concerts, sports). 
                      Restaurant reservations. Cultural experience packages.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <Card className="bg-black/40 border-yellow-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Users className="h-7 w-7 text-yellow-400" />
                    Community & Cultural Layer
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Hyperlocal content and community-driven features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Local News & Media</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ County-specific news feeds</li>
                        <li>✓ Local language content</li>
                        <li>✓ Verified journalist badges</li>
                        <li>✓ Fact-checking integration</li>
                        <li>✓ Community radio streaming</li>
                        <li>✓ Video content hub (KeTV)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Community Features</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Neighborhood groups & forums</li>
                        <li>✓ Event discovery & RSVP</li>
                        <li>✓ Cultural calendar (holidays, festivals)</li>
                        <li>✓ Chama (group savings) management</li>
                        <li>✓ Job board & classifieds</li>
                        <li>✓ Lost & found network</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                    <h4 className="font-semibold text-white mb-2">Education & Learning</h4>
                    <p className="text-gray-300 text-sm">
                      CBC curriculum support. Educational video content. Teacher-parent communication. 
                      University application guides. Scholarship opportunities. Professional upskilling courses.
                    </p>
                  </div>
                  <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                    <h4 className="font-semibold text-white mb-2">Moderation & Safety</h4>
                    <p className="text-gray-300 text-sm">
                      AI-powered content moderation trained on Kenyan context. Community leaders as verified 
                      moderators. Hate speech & misinformation detection. User reporting system. 
                      Parental controls for minors.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="innovation" className="mt-6">
              <Card className="bg-black/40 border-pink-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Cpu className="h-7 w-7 text-pink-400" />
                    Innovation Layer & Developer Ecosystem
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Extensible platform for third-party innovation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Developer Platform</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ RESTful & GraphQL APIs</li>
                        <li>✓ SDK for iOS, Android, Web</li>
                        <li>✓ Webhook integrations</li>
                        <li>✓ Sandbox environment</li>
                        <li>✓ Comprehensive documentation</li>
                        <li>✓ Developer community forum</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Mini-Apps & Bots</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ In-app mini-applications</li>
                        <li>✓ AI chatbot framework</li>
                        <li>✓ Business automation bots</li>
                        <li>✓ Custom integrations</li>
                        <li>✓ App store for mini-apps</li>
                        <li>✓ Revenue sharing (70/30 split)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-pink-900/20 p-4 rounded-lg border border-pink-500/30">
                    <h4 className="font-semibold text-white mb-2">AI & Machine Learning</h4>
                    <p className="text-gray-300 text-sm">
                      Swahili & Sheng language models. Sentiment analysis for customer service. 
                      Fraud detection in payments. Personalized content recommendations. 
                      Voice assistants in local languages.
                    </p>
                  </div>
                  <div className="bg-pink-900/20 p-4 rounded-lg border border-pink-500/30">
                    <h4 className="font-semibold text-white mb-2">Innovation Fund</h4>
                    <p className="text-gray-300 text-sm">
                      $10M fund for Kenyan startups building on KeChat. Quarterly hackathons with cash prizes. 
                      Technical mentorship program. Fast-track API access for promising projects. 
                      Partnership with Kenyan universities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* User Flow */}
        <section className="mb-12">
          <h2 className="serif-heading text-4xl font-bold text-white mb-8 text-center">
            User Experience & Flow
          </h2>
          
          <Card className="bg-black/40 border-white/20 backdrop-blur-md mb-6">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Onboarding Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-500/20 rounded-full p-3 flex-shrink-0">
                    <span className="text-blue-300 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone Verification</h4>
                    <p className="text-gray-300 text-sm">SMS OTP with automatic network detection. Support for all Kenyan carriers.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-500/20 rounded-full p-3 flex-shrink-0">
                    <span className="text-blue-300 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Profile Setup</h4>
                    <p className="text-gray-300 text-sm">Name, photo, language preference. Optional Huduma Namba linking for enhanced features.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-500/20 rounded-full p-3 flex-shrink-0">
                    <span className="text-blue-300 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Connect Your World</h4>
                    <p className="text-gray-300 text-sm">Import contacts, link M-Pesa account, join communities. AI suggests relevant groups.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-500/20 rounded-full p-3 flex-shrink-0">
                    <span className="text-blue-300 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Guided Tour</h4>
                    <p className="text-gray-300 text-sm">Interactive tutorial highlighting key features. Skip anytime with contextual help available.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Daily Use Scenarios</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3 text-sm">
                <p><strong className="text-white">Morning:</strong> Check news, pay electricity bill, order breakfast delivery</p>
                <p><strong className="text-white">Commute:</strong> Book boda-boda ride, chat with colleagues, send money</p>
                <p><strong className="text-white">Work:</strong> Join business group chat, make video call, manage store</p>
                <p><strong className="text-white">Evening:</strong> Shop for groceries, RSVP to event, watch local content</p>
                <p><strong className="text-white">Anytime:</strong> Access government services, join community discussions</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Navigation Structure</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3 text-sm">
                <p><strong className="text-white">Home Tab:</strong> Recent chats, quick actions, personalized feed</p>
                <p><strong className="text-white">Wallet Tab:</strong> Balance, transactions, payments, savings</p>
                <p><strong className="text-white">Services Tab:</strong> Marketplace, ride-hailing, food, government</p>
                <p><strong className="text-white">Community Tab:</strong> News, events, groups, local content</p>
                <p><strong className="text-white">Profile Tab:</strong> Settings, documents, help, account management</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Language */}
        <section className="mb-12">
          <h2 className="serif-heading text-4xl font-bold text-white mb-8 text-center">
            Design Language & Aesthetic
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-400" />
                  Visual Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3 text-sm">
                <p><strong className="text-white">Color Palette:</strong> Inspired by Kenyan flag—vibrant reds, blacks, 
                whites, and greens. Warm earth tones for accessibility.</p>
                <p><strong className="text-white">Typography:</strong> Custom "Jamhuri Sans" font supporting Latin, 
                Swahili, and special characters. Clear hierarchy for readability.</p>
                <p><strong className="text-white">Iconography:</strong> Bold, distinctive icons with Kenyan cultural motifs. 
                Consistent with global standards but uniquely Kenyan.</p>
                <p><strong className="text-white">Motion:</strong> Smooth, purposeful animations. Reduced motion support 
                for accessibility and battery savings.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                  Brand Personality
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3 text-sm">
                <p><strong className="text-white">Tone:</strong> Friendly yet professional. Respectful of cultural diversity. 
                Empowering without being patronizing.</p>
                <p><strong className="text-white">Voice:</strong> Conversational in user communications. Multilingual with 
                natural localization, not direct translation.</p>
                <p><strong className="text-white">Values:</strong> Transparency, inclusivity, innovation, sovereignty. 
                "Kenya First" without being isolationist.</p>
                <p><strong className="text-white">Character:</strong> Modern yet rooted in tradition. Pan-African pride. 
                Forward-looking optimism about Kenya's digital future.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-green-900/30 via-black/50 to-red-900/30 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-xl">Accessibility & Inclusion</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-2 text-sm">
              <p>✓ WCAG 2.1 AA compliance for visual accessibility</p>
              <p>✓ Voice navigation for visually impaired users</p>
              <p>✓ High contrast mode and adjustable font sizes</p>
              <p>✓ Right-to-left layout support for Arabic-speaking communities</p>
              <p>✓ Data-saving mode with image compression</p>
              <p>✓ Offline functionality for areas with poor connectivity</p>
              <p>✓ USSD fallback for feature phones</p>
            </CardContent>
          </Card>
        </section>

        {/* Privacy & Security */}
        <section className="mb-12">
          <h2 className="serif-heading text-4xl font-bold text-white mb-8 text-center">
            Privacy & Data Sovereignty
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-black/40 border-green-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lock className="h-6 w-6 text-green-400" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2 text-sm">
                <p>✓ End-to-end encryption by default</p>
                <p>✓ Zero-knowledge architecture</p>
                <p>✓ No message content storage</p>
                <p>✓ Encrypted backups</p>
                <p>✓ Two-factor authentication</p>
                <p>✓ Biometric security options</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Flag className="h-6 w-6 text-blue-400" />
                  Kenyan Sovereignty
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2 text-sm">
                <p>✓ All data centers in Kenya</p>
                <p>✓ Compliance with Kenya DPA 2019</p>
                <p>✓ Subject to Kenyan jurisdiction</p>
                <p>✓ No foreign government access</p>
                <p>✓ Transparent data handling</p>
                <p>✓ Local regulatory oversight</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-6 w-6 text-purple-400" />
                  AI Moderation
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2 text-sm">
                <p>✓ Context-aware content filtering</p>
                <p>✓ Kenyan cultural sensitivity</p>
                <p>✓ Multilingual hate speech detection</p>
                <p>✓ Human-in-the-loop review</p>
                <p>✓ Transparent appeals process</p>
                <p>✓ Regular bias audits</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-black/40 border-red-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-xl">Regulatory Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
                <div>
                  <h4 className="text-white font-semibold mb-2">National Compliance</h4>
                  <ul className="space-y-1">
                    <li>• Data Protection Act 2019</li>
                    <li>• Computer Misuse & Cybercrimes Act</li>
                    <li>• National Payment Systems Act</li>
                    <li>• Kenya Information & Communications Act</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">International Standards</h4>
                  <ul className="space-y-1">
                    <li>• ISO 27001 (Information Security)</li>
                    <li>• PCI DSS (Payment Card Industry)</li>
                    <li>• SOC 2 Type II certification</li>
                    <li>• GDPR compliance for EU users</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Monetization & Partnerships */}
        <section className="mb-12">
          <h2 className="serif-heading text-4xl font-bold text-white mb-8 text-center">
            Business Model & Partnerships
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  Revenue Streams
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3 text-sm">
                <div>
                  <p className="text-white font-semibold mb-1">Transaction Fees (Primary)</p>
                  <p>1.5% on merchant payments, 0.5% on P2P transfers above KES 10,000. 
                  Competitive with current mobile money rates.</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Premium Features</p>
                  <p>Business accounts with analytics, extended storage, priority support. 
                  KES 299/month for SMEs, KES 2,999/month for enterprises.</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Marketplace Commission</p>
                  <p>5% commission on marketplace transactions after first year free. 
                  Lower rates for verified Kenyan businesses.</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">API & Developer Tools</p>
                  <p>Freemium API access. Premium tiers for high-volume applications. 
                  Enterprise licensing for large integrations.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-blue-400" />
                  Strategic Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3 text-sm">
                <div>
                  <p className="text-white font-semibold mb-1">Government (Public-Private)</p>
                  <p>Revenue sharing on e-government services. Co-investment in infrastructure. 
                  National ID and payment system integration.</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Telcos & Financial Institutions</p>
                  <p>Partnerships with Safaricom, Airtel Kenya, and banks for payment interoperability. 
                  Shared infrastructure costs.</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">International Tech Partners</p>
                  <p>AWS/Google Cloud for hybrid infrastructure. Microsoft for enterprise tools. 
                  Meta/Google for ad exchange (non-tracking).</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Local Ecosystem</p>
                  <p>Partnerships with Kenyan universities for talent pipeline. 
                  Support for local tech hubs and innovation centers.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-blue-900/30 via-black/50 to-purple-900/30 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Public-Private Partnership Model</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base">
                KeChat operates as a hybrid entity with majority Kenyan ownership:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-white font-semibold mb-2">40% Government</h4>
                  <p className="text-sm">Kenya Government through ICT Authority. Ensures sovereignty 
                  and alignment with national digital strategy.</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-white font-semibold mb-2">40% Private Sector</h4>
                  <p className="text-sm">Consortium of Kenyan companies (Safaricom, Equity Bank, etc.). 
                  Brings commercial expertise and infrastructure.</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-white font-semibold mb-2">20% Public Float</h4>
                  <p className="text-sm">Listed on Nairobi Securities Exchange. Open to Kenyan citizens 
                  and East African investors only.</p>
                </div>
              </div>
              <p className="text-sm italic bg-yellow-900/20 p-3 rounded border border-yellow-500/30">
                Constitutional requirement: At least 51% Kenyan ownership must be maintained at all times. 
                Foreign investment limited to technology partnerships, not equity ownership.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Implementation Roadmap */}
        <section className="mb-12">
          <h2 className="serif-heading text-4xl font-bold text-white mb-8 text-center">
            Implementation Roadmap
          </h2>
          
          <div className="space-y-6">
            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl">Phase 1: Foundation (Months 1-12)</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2 text-sm">
                  <li>✓ Core messaging platform development</li>
                  <li>✓ Basic payment integration (M-Pesa, Airtel Money)</li>
                  <li>✓ Beta launch with 100,000 users in Nairobi & Mombasa</li>
                  <li>✓ Data center setup in Nairobi</li>
                  <li>✓ Regulatory approvals & licensing</li>
                  <li>✓ Initial government service integration (eCitizen)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl">Phase 2: Expansion (Months 13-24)</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2 text-sm">
                  <li>✓ National rollout to all 47 counties</li>
                  <li>✓ Full e-government integration</li>
                  <li>✓ Marketplace and commerce features launch</li>
                  <li>✓ Developer API platform opening</li>
                  <li>✓ Partnerships with major Kenyan businesses</li>
                  <li>✓ Target: 10 million active users</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl">Phase 3: Maturity (Months 25-36)</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2 text-sm">
                  <li>✓ Advanced AI features and chatbots</li>
                  <li>✓ East African expansion (Uganda, Tanzania, Rwanda)</li>
                  <li>✓ Mini-app ecosystem with 1,000+ applications</li>
                  <li>✓ Advanced financial services (savings, insurance, investments)</li>
                  <li>✓ Smart city integrations in major urban centers</li>
                  <li>✓ Target: 30 million users across East Africa</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-12">
          <h2 className="serif-heading text-4xl font-bold text-white mb-8 text-center">
            Success Metrics & KPIs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-md text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-blue-400">50M</CardTitle>
                <CardDescription className="text-gray-300">Monthly Active Users (5 years)</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-green-500/30 backdrop-blur-md text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-green-400">$500M</CardTitle>
                <CardDescription className="text-gray-300">Daily Transaction Volume</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-purple-400">70%</CardTitle>
                <CardDescription className="text-gray-300">Smartphone Market Penetration</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-yellow-500/30 backdrop-blur-md text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-yellow-400">80%</CardTitle>
                <CardDescription className="text-gray-300">User Satisfaction Score</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="mt-6 bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-xl">Additional Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
                <div>
                  <h4 className="text-white font-semibold mb-2">User Engagement</h4>
                  <ul className="space-y-1">
                    <li>• Daily active users (DAU) / MAU ratio &gt; 60%</li>
                    <li>• Average session duration: 45+ minutes</li>
                    <li>• Message volume: 5B+ daily</li>
                    <li>• Feature adoption across modules: &gt;40%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Business Impact</h4>
                  <ul className="space-y-1">
                    <li>• SME merchant registrations: 500K+</li>
                    <li>• Job creation: 100K direct &amp; indirect</li>
                    <li>• Developer ecosystem: 10K active devs</li>
                    <li>• Government service completion rate: &gt;90%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Technical Performance</h4>
                  <ul className="space-y-1">
                    <li>• App load time: &lt;3 seconds</li>
                    <li>• Message delivery: &lt;500ms (P95)</li>
                    <li>• System uptime: 99.95%</li>
                    <li>• Security incidents: &lt;1 per quarter</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Social Impact</h4>
                  <ul className="space-y-1">
                    <li>• Financial inclusion: +5M unbanked served</li>
                    <li>• Digital literacy improvement: +30%</li>
                    <li>• Rural connectivity: 80% coverage</li>
                    <li>• Women entrepreneurs supported: 200K+</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Conclusion */}
        <Card className="bg-gradient-to-br from-green-900/30 via-black/60 to-red-900/30 border-white/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="serif-heading text-3xl text-white text-center flex items-center justify-center gap-3">
              <Flag className="h-8 w-8 text-green-400" />
              Kenya's Digital Sovereignty
              <Flag className="h-8 w-8 text-red-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-200">
            <p className="serif-body text-lg leading-relaxed text-center">
              KeChat is more than an app—it's a statement of digital independence. By building a platform 
              that serves Kenyans first, respects local culture, and keeps data within national borders, 
              we create a model for African digital sovereignty.
            </p>
            <p className="serif-body text-lg leading-relaxed text-center">
              This super-app positions Kenya as a technology leader on the continent, empowers local 
              businesses and developers, and ensures that the digital economy benefits Kenyan citizens directly.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge className="bg-green-600 text-white px-4 py-2 text-sm">Sovereign</Badge>
              <Badge className="bg-black text-white px-4 py-2 text-sm">Innovative</Badge>
              <Badge className="bg-red-600 text-white px-4 py-2 text-sm">Inclusive</Badge>
              <Badge className="bg-white text-black px-4 py-2 text-sm">Pan-African</Badge>
            </div>
            <p className="serif-body text-center italic text-gray-300 pt-4">
              "From Kenya, For Kenya, To the World"
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default KeChat;
