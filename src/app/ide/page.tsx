"use client"

import React, { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Code2, Play, LayoutTemplate, Settings, FolderOpen, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const SUPPORTED_LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
];

export default function IDEPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Executing code...\n");
    
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          sourceCode: code,
          stdin: input,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setOutput(`Error: ${data.error || "Execution failed"}`);
      } else {
        // Construct the output string dynamically
        let finalOutput = `Status: ${data.status}\n\n`;
        if (data.compile_output) {
          finalOutput += `Compiler Output:\n${data.compile_output}\n\n`;
        }
        if (data.stderr) {
          finalOutput += `Standard Error:\n${data.stderr}\n\n`;
        }
        if (data.stdout) {
          finalOutput += `Standard Output:\n${data.stdout}`;
        }
        if (!data.stdout && !data.stderr && !data.compile_output) {
          finalOutput += "No output was returned.";
        }
        setOutput(finalOutput);
      }
    } catch (err) {
      console.error(err);
      setOutput("Network Error: Could not connect to execution server.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      {/* Top Navbar */}
      <header className="h-14 border-b flex items-center px-4 justify-between shrink-0 bg-card">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Code2 className="h-5 w-5" />
            <span className="font-bold hidden sm:inline-block">CodeStudio</span>
          </Link>
          <div className="h-4 w-[1px] bg-border mx-2" />
          <Select value={language} onValueChange={(val) => setLanguage(val || "")}>
            <SelectTrigger className="w-[150px] h-8 text-xs">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 hidden sm:flex">
            <Save className="h-3.5 w-3.5" />
            Save Snippet
          </Button>
          <Button 
            size="sm" 
            className="h-8 gap-1.5 focus:ring-2 focus:ring-primary focus:outline-none" 
            onClick={handleRunCode}
            disabled={isRunning}
          >
            <Play className={`h-3.5 w-3.5 ${isRunning ? "animate-pulse" : "fill-current"}`} />
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </header>

      {/* Main IDE area */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          
          {/* Left Sidebar (Minimal for now) */}
          <ResizablePanel defaultSize={4} minSize={4} maxSize={15} className="bg-muted/30 border-r flex flex-col items-center py-4 gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
              <FolderOpen className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
              <LayoutTemplate className="h-5 w-5" />
            </Button>
            <div className="mt-auto">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={60}>
             {/* Editor Panel */}
             <div className="h-full flex flex-col">
               <div className="h-9 border-b bg-muted/40 flex items-center px-4 text-xs text-muted-foreground font-medium">
                 main.{language === "python" ? "py" : language === "cpp" ? "cpp" : language === "java" ? "java" : "js"}
               </div>
               <div className="flex-1 relative">
                 <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: "on",
                      automaticLayout: true,
                      padding: { top: 16 }
                    }}
                  />
               </div>
             </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right/Bottom Panel for Input/Output */}
          <ResizablePanel defaultSize={36}>
            <ResizablePanelGroup direction="vertical">
              
              <ResizablePanel defaultSize={40}>
                <div className="h-full flex flex-col border-b">
                  <div className="h-9 border-b bg-muted/40 flex items-center px-4 text-xs font-semibold">
                    Input (stdin)
                  </div>
                  <div className="flex-1 p-2">
                    <Textarea 
                      className="h-full resize-none border-0 focus-visible:ring-0 rounded-none bg-transparent"
                      placeholder="Enter inputs here..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                </div>
              </ResizablePanel>
              
              <ResizableHandle />
              
              <ResizablePanel defaultSize={60}>
                 <div className="h-full flex flex-col">
                  <Tabs defaultValue="output" className="h-full flex flex-col">
                    <div className="h-9 border-b bg-muted/40 flex items-center px-2">
                       <TabsList className="h-7 bg-transparent p-0">
                         <TabsTrigger value="output" className="text-xs h-7 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-sm px-3">
                           Output
                         </TabsTrigger>
                         <TabsTrigger value="issues" className="text-xs h-7 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-sm px-3 mx-1">
                           Problems
                         </TabsTrigger>
                       </TabsList>
                    </div>
                    <TabsContent value="output" className="flex-1 p-4 m-0 overflow-auto bg-black/40 text-green-400 font-mono text-sm data-[state=active]:block data-[state=inactive]:hidden">
                      <pre className="whitespace-pre-wrap">{output || "Run code to see output..."}</pre>
                    </TabsContent>
                    <TabsContent value="issues" className="flex-1 p-4 m-0 overflow-auto text-muted-foreground text-sm data-[state=active]:block data-[state=inactive]:hidden">
                      No issues detected.
                    </TabsContent>
                  </Tabs>
                 </div>
              </ResizablePanel>

            </ResizablePanelGroup>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
