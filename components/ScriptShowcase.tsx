"use client";

import React, { useState } from 'react';
import { Github, Copy, ExternalLink, Check } from 'lucide-react';

const scripts = [
  {
    title: "AI Tactical Engine",
    description: "Real-time data analysis and tactical insights for competitive gaming.",
    githubUrl: "https://github.com/arcai0/arcai-portfolio",
    installCmd: "git clone https://github.com/arcai0/arcai-portfolio.git"
  },
  {
    title: "Next.js Boilerplate",
    description: "High-performance, SEO-optimized starter kit for modern SaaS applications.",
    githubUrl: "https://github.com/arcai0/nextjs-boilerplate",
    installCmd: "npx create-next-app -e https://github.com/arcai0/nextjs-boilerplate"
  },
  {
    title: "Git Automator",
    description: "Python-based automation script for managing large scale repo deployments.",
    githubUrl: "https://github.com/arcai0/git-automator",
    installCmd: "pip install arcai-git-automator"
  }
];

const ScriptShowcase = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scripts.map((script, index) => (
        <div 
          key={index}
          className="group relative bg-zinc-950 border border-zinc-900 p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300 shadow-xl"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              {script.title}
            </h3>
            <a 
              href={script.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
          
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            {script.description}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copyToClipboard(script.installCmd, script.title)}
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 py-2 px-4 rounded-lg text-xs font-mono transition-colors border border-zinc-800"
            >
              {copiedId === script.title ? (
                <>
                  <Check size={14} className="text-green-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Command</span>
                </>
              )}
            </button>
            
            <a 
              href={script.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-800 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScriptShowcase;