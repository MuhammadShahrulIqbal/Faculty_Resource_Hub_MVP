"use client";

import React, { useState, useMemo } from 'react';
import { Search, Plus, X, ExternalLink, BookOpen } from 'lucide-react';

// --- Types ---
type Category = 'Syllabus' | 'Policy' | 'Tooling' | 'Research' | 'All';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: Category;
  url: string;
  dateAdded: string;
}

// --- Mock Data ---
const initialResources: Resource[] = [
  {
    id: "1",
    title: "ASMS Teacher Usage Guidelines",
    description: "Official documentation for the Administrative Management System, tailored specifically for teacher workflows.",
    category: "Policy",
    url: "#",
    dateAdded: "2026-05-15",
  },
  {
    id: "2",
    title: "UNISEL Cybersecurity Protocols",
    description: "Latest security protocols and network policies for faculty staff and IT department members.",
    category: "Policy",
    url: "#",
    dateAdded: "2026-06-01",
  },
  {
    id: "3",
    title: "C# & WinForms Development Kit",
    description: "Standardized templates and Microsoft Visual Studio configurations for internal software development.",
    category: "Tooling",
    url: "#",
    dateAdded: "2026-05-20",
  },
  {
    id: "4",
    title: "DNV-RP-F116 & Pipeline Integrity",
    description: "Research repository covering HIC/HISC testing standards and Risk-Based Inspection (RBI) methodology.",
    category: "Research",
    url: "#",
    dateAdded: "2026-05-28",
  },
  {
    id: "5",
    title: "Web Dev: React & Next.js Basics",
    description: "Introductory syllabus covering modern web frameworks including React, Next.js, and API integrations.",
    category: "Syllabus",
    url: "#",
    dateAdded: "2026-06-04",
  }
];

export default function FacultyResourceHub() {
  // --- State Management ---
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Syllabus' as Category,
    url: ''
  });

  // --- Derived State (Filtering) ---
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [resources, searchTerm, selectedCategory]);

  // --- Handlers ---
  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    const newResource: Resource = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      url: formData.url || '#',
      dateAdded: new Date().toISOString().split('T')[0],
    };
    
    setResources([newResource, ...resources]);
    setIsModalOpen(false);
    setFormData({ title: '', description: '', category: 'Syllabus', url: '' }); // Reset form
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Policy': return 'bg-red-100 text-red-700';
      case 'Syllabus': return 'bg-blue-100 text-blue-700';
      case 'Tooling': return 'bg-emerald-100 text-emerald-700';
      case 'Research': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-slate-800">Faculty Resource Hub</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </button>
          </div>
        </div>
      </nav>

      {/* Hero & Filters Section */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Faculty Repository</h1>
            <p className="text-slate-500 mb-8">Search, filter, and discover vital academic and administrative resources tailored for teachers and faculty staff.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources by title or keyword..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
              >
                <option value="All">All Categories</option>
                <option value="Syllabus">Syllabus</option>
                <option value="Policy">Policy</option>
                <option value="Tooling">Tooling</option>
                <option value="Research">Research</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredResources.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No resources found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </span>
                    <span className="text-xs text-slate-400">{resource.dateAdded}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-tight">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3">
                    {resource.description}
                  </p>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Visit Link
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900">Add New Resource</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddResource} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Q3 Grading Policy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Briefly describe this resource..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                >
                  <option value="Syllabus">Syllabus</option>
                  <option value="Policy">Policy</option>
                  <option value="Tooling">Tooling</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL / Link</label>
                <input 
                  required
                  type="url" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}