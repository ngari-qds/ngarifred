
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import GlobalBackground from "./GlobalBackground";
import WaterBackground from "./water/WaterBackground";

const Layout = () => {
  return (
    <div className="min-h-screen text-foreground serif-body relative">
      <WaterBackground />
      <GlobalBackground />
      <Navigation />
      <main className="pt-20 relative z-10">
        <div className="min-h-screen bg-background/10 backdrop-blur-[2px]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
