import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Terminal, TerminalSquare, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="px-6 lg:px-8 h-16 flex items-center border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="#">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">CodeStudio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#languages">
            Languages
          </Link>
          <Link href="/ide">
            <Button size="sm" className="hidden sm:inline-flex">
              Start Coding
            </Button>
          </Link>
        </nav>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4 max-w-[800px]">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Your Web-Based <span className="text-primary">Coding Platform</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Write, run, and test code in multiple languages directly from your browser. 
                  Experience a clean, powerful, and distraction-free IDE environments for developers of all levels.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/ide">
                  <Button size="lg" className="h-12 px-8 text-lg">
                    Start Coding For Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Platform Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Everything you need to write and run code effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col justify-center space-y-4 p-6 border rounded-xl bg-card hover:border-primary/50 transition-colors">
                <Terminal className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Advanced Editor</h3>
                <p className="text-muted-foreground">Monaco-powered editing experience with syntax highlighting and auto-completion.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 p-6 border rounded-xl bg-card hover:border-primary/50 transition-colors">
                <Zap className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Fast Execution</h3>
                <p className="text-muted-foreground">Compile and run your code seamlessly with quick and detailed execution feedback.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 p-6 border rounded-xl bg-card hover:border-primary/50 transition-colors">
                <TerminalSquare className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Multi-Language</h3>
                <p className="text-muted-foreground">Support for Python, C++, Java, JavaScript, Go, and more modern languages.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} CodeStudio. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
