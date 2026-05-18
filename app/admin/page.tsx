'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AdminDashboard() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'clients' | 'testimonials' | 'settings'>('projects');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Form states - Projects
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    projectLink: '',
    image: null as File | null,
  });

  // Form states - Clients
  const [clientForm, setClientForm] = useState({
    name: '',
    logo: null as File | null,
  });

  // Form states - Testimonials
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    company: '',
    message: '',
    rating: 5,
    image: null as File | null,
  });
  const [settingsForm, setSettingsForm] = useState({
    crmLoginUrl: 'https://crm-eight-lac.vercel.app',
  });

  // Helper to get token
  const getAuthToken = () => localStorage.getItem('adminToken');

  // Check Auth on Mount
  useEffect(() => {
    const initAdminSession = async () => {
      const token = getAuthToken();
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      try {
        const sessionRes = await fetch('/api/auth/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!sessionRes.ok) {
          localStorage.removeItem('adminToken');
          router.replace('/admin/login');
          return;
        }

        await Promise.all([
          fetchProjects(),
          fetchClients(),
          fetchTestimonials(),
          fetchCrmLoginSetting(),
        ]);
      } finally {
        setAuthChecking(false);
      }
    };

    initAdminSession();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.replace('/admin/login');
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-bg-base p-8 flex items-center justify-center">
        <p className="text-text-secondary text-sm font-medium">Validating admin session...</p>
      </div>
    );
  }

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      console.error('Failed to fetch projects');
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      if (data.success) setClients(data.data);
    } catch (err) {
      console.error('Failed to fetch clients');
    }
  };

  const fetchTestimonials = async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/testimonials', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });
      const data = await res.json();
      if (data.success) setTestimonials(data.data);
    } catch (err) {
      console.error('Failed to fetch testimonials');
    }
  };

  const fetchCrmLoginSetting = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data?.crmLoginUrl) {
        setSettingsForm({ crmLoginUrl: data.data.crmLoginUrl });
      }
    } catch (err) {
      console.error('Failed to fetch CRM login setting');
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      formData.append('projectLink', projectForm.projectLink);
      if (projectForm.image) formData.append('image', projectForm.image);

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Project added successfully!');
        setProjectForm({ title: '', description: '', projectLink: '', image: null });
        fetchProjects();
      } else {
        setError(data.error || 'Failed to add project');
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      setError('Form submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const formData = new FormData();
      formData.append('name', clientForm.name);
      if (clientForm.logo) formData.append('logo', clientForm.logo);

      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Client added successfully!');
        setClientForm({ name: '', logo: null });
        fetchClients();
      } else {
        setError(data.error || 'Failed to add client');
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      setError('Form submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const formData = new FormData();
      formData.append('name', testimonialForm.name);
      formData.append('role', testimonialForm.role);
      formData.append('company', testimonialForm.company);
      formData.append('message', testimonialForm.message);
      formData.append('rating', testimonialForm.rating.toString());
      if (testimonialForm.image) formData.append('image', testimonialForm.image);

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Testimonial added successfully!');
        setTestimonialForm({ name: '', role: '', company: '', message: '', rating: 5, image: null });
        fetchTestimonials();
      } else {
        setError(data.error || 'Failed to add testimonial');
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      setError('Form submission failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const res = await fetch(`/api/projects/${id}`, { 
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
      });
      const data = await res.json();
      if (data.success) {
          fetchProjects();
      } else {
          if (res.status === 401) handleLogout();
      }
    } catch (err) {
      alert('Deletion failed');
    }
  };

  const deleteClient = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const res = await fetch(`/api/clients/${id}`, { 
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
      });
      const data = await res.json();
      if (data.success) {
          fetchClients();
      } else {
          if (res.status === 401) handleLogout();
      }
    } catch (err) {
      alert('Deletion failed');
    }
  };

  const toggleTestimonialActive = async (id: string, currentStatus: boolean) => {
    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const res = await fetch(`/api/testimonials/${id}`, { 
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      const data = await res.json();
      if (data.success) {
          fetchTestimonials();
      } else {
          if (res.status === 401) handleLogout();
      }
    } catch (err) {
      alert('Update failed');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const res = await fetch(`/api/testimonials/${id}`, { 
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
      });
      const data = await res.json();
      if (data.success) {
          fetchTestimonials();
      } else {
          if (res.status === 401) handleLogout();
      }
    } catch (err) {
      alert('Deletion failed');
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crmLoginUrl: settingsForm.crmLoginUrl.trim(),
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('CRM login URL updated successfully!');
        setSettingsForm({ crmLoginUrl: data.data.crmLoginUrl });
      } else {
        setError(data.error || 'Failed to update CRM login URL');
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      setError('Settings update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">Manage your projects and clients effortlessly.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50">
            Logout
          </Button>
        </header>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'projects' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </Button>
          <Button
            variant={activeTab === 'clients' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('clients')}
          >
            Clients
          </Button>
          <Button
            variant={activeTab === 'testimonials' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('testimonials')}
          >
            Testimonials
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Button>
        </div>

        {/* Feedback Messages */}
        {success && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}
        {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {activeTab === 'projects'
                  ? 'Add New Project'
                  : activeTab === 'clients'
                    ? 'Add New Client'
                    : activeTab === 'testimonials'
                      ? 'Add New Testimonial'
                      : 'CRM Login URL'}
              </h2>
              
              {activeTab === 'projects' && (
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="project-title" className="block text-sm font-medium mb-1">Title</label>
                    <input
                      id="project-title"
                      type="text"
                      placeholder="Project Title"
                      className="w-full p-2 border border-border-default rounded focus:ring-accent-primary"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="project-desc" className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      id="project-desc"
                      placeholder="Brief project description..."
                      className="w-full p-2 border border-border-default rounded"
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="project-link" className="block text-sm font-medium mb-1">Project Link</label>
                    <input
                      id="project-link"
                      type="url"
                      placeholder="https://example.com"
                      className="w-full p-2 border border-border-default rounded"
                      value={projectForm.projectLink}
                      onChange={(e) => setProjectForm({ ...projectForm, projectLink: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="project-image" className="block text-sm font-medium mb-1">Image Upload</label>
                    <input
                      id="project-image"
                      type="file"
                      title="Select project image"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files?.[0] || null })}
                      required
                    />
                  </div>
                  <Button className="w-full" disabled={loading}>
                    {loading ? 'Uploading...' : 'Add Project'}
                  </Button>
                </form>
              )}

              {activeTab === 'clients' && (
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="client-name" className="block text-sm font-medium mb-1">Client Name</label>
                    <input
                      id="client-name"
                      type="text"
                      placeholder="Client or Company Name"
                      className="w-full p-2 border border-border-default rounded"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="client-logo" className="block text-sm font-medium mb-1">Logo Upload</label>
                    <input
                      id="client-logo"
                      type="file"
                      title="Select client logo"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => setClientForm({ ...clientForm, logo: e.target.files?.[0] || null })}
                      required
                    />
                  </div>
                  <Button className="w-full" disabled={loading}>
                    {loading ? 'Uploading...' : 'Add Client'}
                  </Button>
                </form>
              )}

              {activeTab === 'testimonials' && (
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="test-name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                      id="test-name"
                      type="text"
                      placeholder="Client Name"
                      className="w-full p-2 border border-border-default rounded"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="test-role" className="block text-sm font-medium mb-1">Role</label>
                      <input
                        id="test-role"
                        type="text"
                        placeholder="CEO, Founder, etc."
                        className="w-full p-2 border border-border-default rounded"
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="test-company" className="block text-sm font-medium mb-1">Company</label>
                      <input
                        id="test-company"
                        type="text"
                        placeholder="Company Name"
                        className="w-full p-2 border border-border-default rounded"
                        value={testimonialForm.company}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="test-msg" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="test-msg"
                      placeholder="Testimonial message..."
                      className="w-full p-2 border border-border-default rounded"
                      rows={3}
                      value={testimonialForm.message}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="test-rating" className="block text-sm font-medium mb-1">Rating</label>
                      <select
                        id="test-rating"
                        className="w-full p-2 border border-border-default rounded"
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                      >
                        {[5, 4, 3, 2, 1].map((r) => (
                          <option key={r} value={r}>{r} Stars</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="test-image" className="block text-sm font-medium mb-1">Profile Image</label>
                      <input
                        id="test-image"
                        type="file"
                        title="Upload profile image"
                        accept="image/*"
                        className="w-full text-xs mt-1"
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.files?.[0] || null })}
                      />
                    </div>
                  </div>
                  <Button className="w-full" disabled={loading}>
                    {loading ? 'Uploading...' : 'Add Testimonial'}
                  </Button>
                </form>
              )}

              {activeTab === 'settings' && (
                <form onSubmit={handleSettingsSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="crm-login-url" className="block text-sm font-medium mb-1">CRM Login URL</label>
                    <input
                      id="crm-login-url"
                      type="url"
                      placeholder="https://crm-eight-lac.vercel.app"
                      className="w-full p-2 border border-border-default rounded"
                      value={settingsForm.crmLoginUrl}
                      onChange={(e) => setSettingsForm({ crmLoginUrl: e.target.value })}
                      required
                    />
                    <p className="text-xs text-text-secondary mt-2">
                      This controls the navbar &quot;Login to CRM&quot; button link.
                    </p>
                  </div>
                  <Button className="w-full" disabled={loading}>
                    {loading ? 'Saving...' : 'Save CRM Link'}
                  </Button>
                </form>
              )}

            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Projects List */}
              {activeTab === 'projects' && (
                projects.length > 0 ? (
                  projects.map((p) => (
                    <Card key={p._id} className="p-4 flex flex-col overflow-hidden">
                      <div className="h-40 bg-gray-100 rounded mb-4 overflow-hidden">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-4">{p.description}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <a href={p.projectLink} target="_blank" rel="noopener noreferrer" className="text-accent-primary text-sm font-semibold">View Link</a>
                        <button 
                          onClick={() => deleteProject(p._id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-2 text-center py-10 text-text-secondary">No projects found.</p>
                )
              )}

              {/* Clients List */}
              {activeTab === 'clients' && (
                clients.length > 0 ? (
                  clients.map((c) => (
                    <Card key={c._id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center border p-1">
                          <img src={c.logoUrl} alt={c.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <span className="font-semibold">{c.name}</span>
                      </div>
                      <button 
                        onClick={() => deleteClient(c._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-2 text-center py-10 text-text-secondary">No clients found.</p>
                )
              )}

              {/* Testimonials List */}
              {activeTab === 'testimonials' && (
                testimonials.length > 0 ? (
                  testimonials.map((t) => (
                    <Card key={t._id} className="p-4 flex flex-col overflow-hidden relative">
                      <div className={`absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {t.isActive ? 'Published' : 'Pending'}
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden border">
                          {t.imageUrl ? (
                            <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-accent-primary text-white font-bold text-lg">
                              {t.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold">{t.name}</h3>
                          <p className="text-xs text-text-secondary">{t.role}{t.company ? ` at ${t.company}` : ''}</p>
                        </div>
                      </div>
                      <div className="text-yellow-500 mb-2 flex">
                        {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                      </div>
                      <p className="text-sm text-text-secondary line-clamp-3 italic mb-4">
                        &quot;{t.message}&quot;
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <button 
                          onClick={() => toggleTestimonialActive(t._id, t.isActive)}
                          className={`text-sm font-semibold ${t.isActive ? 'text-orange-500 hover:text-orange-700' : 'text-green-600 hover:text-green-800'}`}
                        >
                          {t.isActive ? 'Unpublish' : 'Approve & Publish'}
                        </button>
                        <button 
                          onClick={() => deleteTestimonial(t._id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-2 text-center py-10 text-text-secondary">No testimonials found.</p>
                )
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
