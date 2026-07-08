"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BatteryFull,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Coffee,
  Computer,
  Database,
  Download,
  FileText,
  FolderKanban,
  Gamepad2,
  GitBranch,
  GraduationCap,
  ImagePlus,
  Link,
  Mail,
  Maximize2,
  Menu,
  MessageCircleMore,
  Minus,
  Monitor,
  PaintbrushVertical,
  PenTool,
  Phone,
  Printer,
  Send,
  Sparkles,
  Square,
  SunMoon,
  Trash2,
  UserCircle2,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type WindowId =
  | "portfolio"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "certificates"
  | "resume"
  | "contact"
  | "computer"
  | "paint"
  | "solitaire"
  | "minesweeper";

type AppWindow = {
  id: WindowId;
  title: string;
  icon: React.ReactElement;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
};

type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  tags: string[];
  accent: string;
  bg: string;
  url?: string;
};

const apps: AppWindow[] = [
  { id: "portfolio", title: "My Portfolio", icon: <UserCircle2 size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 64, y: 64 } },
  { id: "about", title: "About Me", icon: <UserCircle2 size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 140, y: 116 } },
  { id: "skills", title: "Skills", icon: <Code2 size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 220, y: 92 } },
  { id: "projects", title: "Projects", icon: <FolderKanban size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 300, y: 80 } },
  { id: "experience", title: "Experience", icon: <BriefcaseBusiness size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 380, y: 120 } },
  { id: "certificates", title: "Certificates", icon: <BadgeCheck size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 460, y: 92 } },
  { id: "resume", title: "Resume", icon: <FileText size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 540, y: 88 } },
  { id: "contact", title: "Contact", icon: <Mail size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 620, y: 128 } },
  { id: "computer", title: "My Computer", icon: <Computer size={18} />, defaultSize: { width: 500, height: 600 }, defaultPosition: { x: 200, y: 160 } },
  
];

const projectsData: Project[] = [
  
  {
    id: "ace-it",
    title: "ACE IT",
    description: "A polished educational web experience focused on clarity, responsiveness, and modern UI patterns for a learning platform.",
    stack: ["Next.js", "TypeScript", "JavaScript", "SupaBase", "Vercel"],
    tags: ["Education", "UI Design"],
    accent: "from-[#7C3AED] to-[#A78BFA]",
    bg: "from-violet-100 to-fuchsia-50",
    url: "https://ace-it-ten.vercel.app/",
  },
  {
    id: "crhs-web",
    title: "CRHS Web",
    description: "A clean, student-facing website with structured content, fast navigation, and a responsive public experience.",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["School Website", "Responsive"],
    accent: "from-[#0F766E] to-[#2DD4BF]",
    bg: "from-teal-100 to-cyan-50",
    url: "https://crhs-web.vercel.app/home.html",
  },
 
];

const skills = [
  { category: "Frontend", items: [{ label: "React", value: 70 }, { label: "Next.js", value: 70 }, { label: "Tailwind", value: 50 }] },
  { category: "Backend", items: [{ label: "Node.js", value: 70 }, { label: "API Design", value: 60 }, { label: "Performance", value: 70 }] },
  { category: "Mobile", items: [{ label: "React Native", value: 67 }, , { label: "UI Patterns", value: 75 }] },
  { category: "Database", items: [{ label: "PostgreSQL", value: 78 },  { label: "Supabase", value: 79 }] },
  { category: "UI/UX", items: [{ label: "Design Systems", value: 85 }, { label: "Accessibility", value: 85 }, { label: "Prototyping", value: 89 }] },
  { category: "Tools", items: [{ label: "Figma", value: 91 }, { label: "Framer Motion", value: 70 }, { label: "Vercel", value: 84 }] },
];

const certificateImages = [
  { title: "UX Strategy", subtitle: "Advanced Product Design" },
  { title: "Modern Frontend", subtitle: "Next.js & Performance" },
  { title: "Design Systems", subtitle: "Scalable UI Foundations" },
];

const stats = [
  { label: "Years of Craft", value: "Error 404" },
  { label: "Launches", value: "Secret" },
  { label: "Happy Clients", value: "-0" },
  { label: "Coffee Cups", value: "∞" },
];

const desktopIcons = [
  { id: "portfolio" as WindowId, title: "My Portfolio", icon: <Monitor size={40} /> },
  { id: "about" as WindowId, title: "About Me", icon: <UserCircle2 size={40} /> },
  { id: "projects" as WindowId, title: "Projects", icon: <FolderKanban size={40} /> },
  { id: "skills" as WindowId, title: "Skills", icon: <Code2 size={40} /> },
  { id: "resume" as WindowId, title: "Resume", icon: <FileText size={40} /> },
  { id: "experience" as WindowId, title: "Experience", icon: <BriefcaseBusiness size={40} /> },
  { id: "certificates" as WindowId, title: "Certificates", icon: <BadgeCheck size={40} /> },
  { id: "contact" as WindowId, title: "Contact", icon: <Mail size={40 } /> },
  { id: "computer" as WindowId, title: "My Computer", icon: <Computer size={40} /> },
  { id: "computer" as WindowId, title: "Recycle Bin", icon: <Trash2 size={40} /> },
];

const startItems = [
  { id: "about" as WindowId, label: "About Me", icon: <UserCircle2 size={16} /> },
  { id: "portfolio" as WindowId, label: "Portfolio", icon: <Monitor size={16} /> },
  { id: "resume" as WindowId, label: "Resume", icon: <FileText size={16} /> },
  { id: "contact" as WindowId, label: "Contact", icon: <Mail size={16} /> },
];

export default function Home() {
  const [theme, setTheme] = useState<"xp" | "dark">("xp");
  const [booting, setBooting] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowId[]>(["portfolio", "skills"]);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>("skills");
  const [minimized, setMinimized] = useState<Record<WindowId, boolean>>({
    portfolio: false,
    about: false,
    skills: false,
    projects: false,
    experience: false,
    certificates: false,
    resume: false,
    contact: false,
    computer: false,
    paint: false,
    solitaire: false,
    minesweeper: false,
  });
  const [maximized, setMaximized] = useState<Record<WindowId, boolean>>({
    portfolio: false,
    about: false,
    skills: false,
    projects: false,
    experience: false,
    certificates: false,
    resume: false,
    contact: false,
    computer: false,
    paint: false,
    solitaire: false,
    minesweeper: false,
  });
  const [positions, setPositions] = useState<Record<WindowId, { x: number; y: number }>>(() => Object.fromEntries(apps.map((app) => [app.id, app.defaultPosition])) as Record<WindowId, { x: number; y: number }>);
  const [sizes, setSizes] = useState<Record<WindowId, { width: number; height: number }>>(() => Object.fromEntries(apps.map((app) => [app.id, app.defaultSize])) as Record<WindowId, { width: number; height: number }>);
  const [dragging, setDragging] = useState<{ id: WindowId; offsetX: number; offsetY: number } | null>(null);
  const [selectedProject, setSelectedProject] = useState(projectsData[0].id);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [bsod, setBsod] = useState(false);
  const [shuttingDown, setShuttingDown] = useState(false);
  const [viewPort, setViewPort] = useState({ width: 1280, height: 900 });
  const [clock, setClock] = useState("11:00 AM");

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateSize = () => setViewPort({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setBooting(false), 2200);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (event: MouseEvent) => {
      setPositions((prev) => ({
        ...prev,
        [dragging.id]: {
          x: Math.min(Math.max(event.clientX - dragging.offsetX, 8), viewPort.width - 220),
          y: Math.min(Math.max(event.clientY - dragging.offsetY, 8), viewPort.height - 220),
        },
      }));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, viewPort.height, viewPort.width]);

  useEffect(() => {
    if (!startOpen) return;
    const closeStart = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("[data-start-menu]")) return;
      setStartOpen(false);
    };
    window.addEventListener("click", closeStart);
    return () => window.removeEventListener("click", closeStart);
  }, [startOpen]);

  const selectedProjectData = useMemo(() => projectsData.find((project) => project.id === selectedProject) ?? projectsData[0], [selectedProject]);

  const openWindow = (windowId: WindowId) => {
    setOpenWindows((prev) => (prev.includes(windowId) ? prev.filter((id) => id !== windowId).concat(windowId) : [...prev, windowId]));
    setMinimized((prev) => ({ ...prev, [windowId]: false }));
    setActiveWindow(windowId);
    setStartOpen(false);
    setSubmitted(false);
  };

  const focusWindow = (windowId: WindowId) => {
    setActiveWindow(windowId);
    setOpenWindows((prev) => (prev.includes(windowId) ? prev.filter((id) => id !== windowId).concat(windowId) : [...prev, windowId]));
  };

  const closeWindow = (windowId: WindowId) => {
    setOpenWindows((prev) => prev.filter((id) => id !== windowId));
    setActiveWindow((prev) => (prev === windowId ? null : prev));
  };

  const minimizeWindow = (windowId: WindowId) => {
    setMinimized((prev) => ({ ...prev, [windowId]: true }));
    setActiveWindow((prev) => (prev === windowId ? null : prev));
  };

  const restoreWindow = (windowId: WindowId) => {
    setMinimized((prev) => ({ ...prev, [windowId]: false }));
    setActiveWindow(windowId);
  };

  const toggleMaximize = (windowId: WindowId) => {
    setMaximized((prev) => ({ ...prev, [windowId]: !prev[windowId] }));
  };

  const handleStartAction = (windowId: WindowId) => {
    openWindow(windowId);
    setStartOpen(false);
  };

  const triggerShutdown = () => {
    setShuttingDown(true);
    setStartOpen(false);
    window.setTimeout(() => {
      setShuttingDown(false);
      setBooting(true);
      setOpenWindows(["portfolio"]);
      setActiveWindow("portfolio");
      setMinimized((prev) => ({ ...prev, portfolio: false }));
      setMaximized((prev) => ({ ...prev, portfolio: false }));
      setPositions((prev) => ({ ...prev, portfolio: apps.find((app) => app.id === "portfolio")?.defaultPosition ?? { x: 64, y: 64 } }));
    }, 1800);
  };

  const shellClasses = theme === "xp"
    ? "bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.7),_transparent_40%),linear-gradient(135deg,_#7DB7FF_0%,_#3B82F6_45%,_#245EDB_100%)] text-slate-900"
    : "bg-[radial-gradient(circle_at_top_left,_rgba(12,18,31,0.95),_transparent_40%),linear-gradient(135deg,_#020617_0%,_#111827_50%,_#0f172a_100%)] text-slate-100";

  const glassClasses = theme === "xp" ? "bg-white/70 border-white/50 text-slate-800" : "bg-slate-900/70 border-slate-700/80 text-slate-100";

  const renderWindowContent = (windowId: WindowId) => {
    switch (windowId) {
      case "portfolio":
        return (
          <div className="flex flex-col gap-5">
            <div className="rounded-[20px] p-4 md:p-6 shadow-inner" style={{ background: "linear-gradient(135deg, rgba(36,94,219,0.12), rgba(59,130,246,0.06))" }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#245EDB] to-[#3B82F6] text-white shadow-lg">A</div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-sky-600">Full Stack Developer</p>
                    <h2 className="text-2xl font-semibold">Gian Karlo C. Reguindin</h2>
                    <p className="text-sm opacity-80">Building robust web applications with modern technologies.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href="https://github.com" aria-label="GitHub" className="rounded-full border border-slate-300/70 p-2 transition hover:-translate-y-0.5 hover:bg-white/70"><GitBranch size={16} /></a>
                  <a href="https://linkedin.com" aria-label="LinkedIn" className="rounded-full border border-slate-300/70 p-2 transition hover:-translate-y-0.5 hover:bg-white/70"><Link size={16} /></a>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button onClick={() => openWindow("about")} className="rounded-[16px] border border-slate-200/80 bg-white/80 px-4 py-3 text-left transition hover:-translate-y-1 hover:shadow-md">About me</button>
              <button onClick={() => openWindow("projects")} className="rounded-[16px] border border-slate-200/80 bg-white/80 px-4 py-3 text-left transition hover:-translate-y-1 hover:shadow-md">Recent work</button>
              <button onClick={() => openWindow("contact")} className="rounded-[16px] border border-slate-200/80 bg-white/80 px-4 py-3 text-left transition hover:-translate-y-1 hover:shadow-md">Say hello</button>
              <button onClick={() => openWindow("resume")} className="rounded-[16px] border border-slate-200/80 bg-white/80 px-4 py-3 text-left transition hover:-translate-y-1 hover:shadow-md">Download resume</button>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="space-y-4">
            <div className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4">
              <h3 className="mb-2 text-lg font-semibold">Biography</h3>
              <p className="text-sm leading-7 opacity-80">I am a Computer Science student and aspiring software developer with a passion for creating innovative, user-friendly digital solutions. I enjoy web development, UI/UX design, and solving real-world problems through technology while continuously expanding my technical skills and knowledge.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4">
                <h4 className="mb-2 font-semibold">Education</h4>
                <p className="text-sm opacity-80">Bachelor of Science in Computer Science, Gordon College</p>
              </div>
              <div className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4">
                <h4 className="mb-2 font-semibold">Interests</h4>
                <p className="text-sm opacity-80">Games, Money, and coffee-fueled debugging.</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4 text-center">
                  <div className="text-xl font-semibold">{stat.value}</div>
                  <div className="text-sm opacity-70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {skills.map((group) => (
              <div key={group.category} className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <PenTool size={16} className="text-[#245EDB]" />
                  <h3 className="font-semibold">{group.category}</h3>
                </div>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-gradient-to-r from-[#245EDB] to-[#3B82F6]" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case "projects":
        return (
          <div className="space-y-3">
            {projectsData.map((project) => (
              <div key={project.id} className={`rounded-[18px] border p-4 transition ${selectedProject === project.id ? "border-[#245EDB] bg-blue-50/70" : "border-slate-200/70 bg-white/70 hover:-translate-y-1"}`}>
                <button onClick={() => setSelectedProject(project.id)} className="w-full text-left">
                  <div className={`mb-3 rounded-[16px] bg-gradient-to-br ${project.accent} p-4 text-white`}>
                    <p className="text-xs uppercase tracking-[0.3em]">Case Study</p>
                    <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                  </div>
                  <p className="text-sm leading-7 opacity-80">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">{tag}</span>)}
                  </div>
                </button>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800">
                    View live site <Link size={14} />
                  </a>
                ) : null}
              </div>
            ))}
            <div className="rounded-[18px] border border-slate-200/70 bg-slate-50/80 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Selected Project</p>
                  <h3 className="text-lg font-semibold">{selectedProjectData.title}</h3>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs shadow-sm">{selectedProjectData.stack.join(" • ")}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedProjectData.stack.map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs">{item}</span>)}
                {selectedProjectData.url ? (
                  <a href={selectedProjectData.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-sky-700 hover:text-sky-800">
                    Open site <Link size={12} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="space-y-3">
            {experienceTimeline.map((entry) => (
              <div key={entry.company} className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{entry.role}</h3>
                    <p className="text-sm opacity-70">{entry.company}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{entry.duration}</span>
                </div>
                <p className="text-sm leading-7 opacity-80">{entry.description}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  {entry.achievements.map((achievement) => <li key={achievement}>• {achievement}</li>)}
                </ul>
              </div>
            ))}
          </div>
        );
      case "certificates":
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {certificateImages.map((item) => (
              <button key={item.title} className="rounded-[18px] border border-slate-200/70 bg-white/70 p-3 text-left transition hover:-translate-y-1">
                <div className="mb-3 flex h-28 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#245EDB] via-[#3B82F6] to-[#7DB7FF] text-white shadow-inner">
                  <ImagePlus size={28} />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm opacity-70">{item.subtitle}</p>
              </button>
            ))}
          </div>
        );
      case "resume":
        return (
          <div className="space-y-4">
            <div className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Resume Preview</p>
                  <h3 className="text-xl font-semibold">Gian Karlo C. Reguindin — Full Stack Developer</h3>
                </div>
                <span className="rounded-full bg-[#5ABF41]/10 px-3 py-1 text-xs text-[#5ABF41]">Available for hire</span>
              </div>
              <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4 text-sm leading-7">
                <p><strong>Core Focus:</strong> UX architecture, interface systems, and high-end front-end delivery.</p>
                <p><strong>Experience:</strong> 2 years of experience as a Computer Science Student</p>
                <p><strong>Toolkit:</strong> React, Next.js, TypeScript, Python, C, Figma.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-[#245EDB] px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5">Download PDF</button>
              <button className="rounded-full border border-slate-300/80 bg-white px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5">Print</button>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-3">
            <div className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-600">
                <MessageCircleMore size={16} className="text-[#245EDB]" />
                <span>Open to collaboration, speaking, and product design partnerships.</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block">Name</span>
                  <input value={contactForm.name} onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2" placeholder="Your name" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block">Email</span>
                  <input type="email" value={contactForm.email} onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2" placeholder="you@example.com" />
                </label>
              </div>
              <label className="mt-3 block text-sm">
                <span className="mb-1 block">Subject</span>
                <input value={contactForm.subject} onChange={(event) => setContactForm((prev) => ({ ...prev, subject: event.target.value }))} className="w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2" placeholder="Project inquiry" />
              </label>
              <label className="mt-3 block text-sm">
                <span className="mb-1 block">Message</span>
                <textarea value={contactForm.message} onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))} className="min-h-28 w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2" placeholder="Tell me about your idea" />
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button onClick={() => { if (contactForm.name && contactForm.email && contactForm.message) { setSubmitted(true); setContactForm({ name: "", email: "", subject: "", message: "" }); } }} className="rounded-full bg-[#245EDB] px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5">Send message</button>
              {submitted && <span className="text-sm text-[#5ABF41]">Message delivered. I will reply soon.</span>}
            </div>
          </div>
        );
      case "computer":
        return (
          <div className="space-y-3 text-sm">
            <div className="rounded-[16px] border border-slate-200/70 bg-white/70 p-4">
              <p className="font-semibold">Local Disk (C:)</p>
              <p className="mt-2 opacity-80">Creative projects, polished assets, and archived notes.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button onClick={() => openWindow("paint")} className="rounded-[16px] border border-slate-200/70 bg-white/70 p-4 text-left">Paint</button>
              <button onClick={() => openWindow("solitaire")} className="rounded-[16px] border border-slate-200/70 bg-white/70 p-4 text-left">Solitaire</button>
              <button onClick={() => openWindow("minesweeper")} className="rounded-[16px] border border-slate-200/70 bg-white/70 p-4 text-left">Minesweeper</button>
              <button onClick={() => setBsod(true)} className="rounded-[16px] border border-slate-200/70 bg-white/70 p-4 text-left">BSOD Easter Egg</button>
            </div>
          </div>
        );
      case "paint":
        return (
          <div className="rounded-[18px] border border-slate-200/70 bg-white/90 p-4 shadow-inner">
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-600"><PaintbrushVertical size={16} className="text-[#245EDB]" /> <span>A nostalgic sketch pad with smooth transitions.</span></div>
            <div className="h-48 rounded-[14px] border border-dashed border-slate-300 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_45%),linear-gradient(135deg,_#f8fbff,_#eef5ff)]" />
          </div>
        );
      case "solitaire":
        return (
          <div className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4 text-sm leading-7">
            <p>Welcome to a modern solitaire experience with clean cards and satisfying motion.</p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1">♠</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">♥</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">♦</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">♣</span>
            </div>
          </div>
        );
      case "minesweeper":
        return (
          <div className="rounded-[18px] border border-slate-200/70 bg-white/70 p-4 text-sm leading-7">
            <p>Minesweeper runs in a lightweight window with a playful update to the nostalgic classic.</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, index) => <div key={index} className="h-8 rounded-[8px] border border-slate-200 bg-slate-50" />)}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${shellClasses}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.45),_transparent_30%),radial-gradient(circle_at_80%_15%,_rgba(255,255,255,0.2),_transparent_25%),linear-gradient(180deg,_rgba(255,255,255,0.12),_transparent_60%)]" />
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
        <div className="cloud cloud-c" />
        <div className="sun-glow" />
        <div className="hills" />
        <div className="grass" />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col justify-between px-3 pb-20 pt-3 sm:px-5 lg:px-8">
        <section className="flex-1">
          <div className="flex flex-wrap gap-3">
            {desktopIcons.map((icon) => (
              <motion.button key={icon.id} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => icon.title === "Recycle Bin" ? setBsod(true) : openWindow(icon.id)} className="flex min-w-[7.5rem] flex-col items-center justify-center gap-1.5 rounded-[16px] border border-white/30 bg-white/20 p-3 text-center text-slate-900 backdrop-blur-sm transition hover:bg-white/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/80 text-[#245EDB] shadow-lg">{icon.icon}</div>
                <span className="max-w-full break-words whitespace-normal text-[10px] font-medium leading-4">{icon.title}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {openWindows.filter((windowId) => !minimized[windowId]).map((windowId, index) => {
              const app = apps.find((entry) => entry.id === windowId);
              if (!app) return null;
              const rect = { width: Math.min(sizes[windowId].width, viewPort.width - 24), height: Math.min(sizes[windowId].height, viewPort.height - 100) };
              return (
                <motion.div key={windowId} initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.18 }} onMouseDown={() => focusWindow(windowId)} className={`absolute overflow-hidden rounded-[20px] border shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl ${theme === "xp" ? "border-white/55 bg-white/80 text-slate-800" : "border-slate-700/70 bg-slate-900/80 text-slate-100"}`} style={{ left: positions[windowId].x, top: positions[windowId].y, width: maximized[windowId] ? viewPort.width - 20 : rect.width, height: maximized[windowId] ? viewPort.height - 84 : rect.height, zIndex: 50 + index }}>
                  <div className="flex items-center justify-between bg-gradient-to-r from-[#245EDB] via-[#3B82F6] to-[#6BA4FF] px-3 py-2 text-white">
                    <div className="flex items-center gap-2">
                      {app.icon}
                      <span className="text-sm font-medium">{app.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onMouseDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); minimizeWindow(windowId); }} className="rounded-full p-1.5 transition hover:bg-white/20" aria-label="Minimize"><Minus size={14} /></button>
                      <button onMouseDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); toggleMaximize(windowId); }} className="rounded-full p-1.5 transition hover:bg-white/20" aria-label="Maximize"><Square size={12} /></button>
                      <button onMouseDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); closeWindow(windowId); }} className="rounded-full p-1.5 transition hover:bg-white/20" aria-label="Close"><X size={14} /></button>
                    </div>
                  </div>
                  <div className="h-[calc(100%-40px)] overflow-auto p-3 sm:p-4" onMouseDown={() => focusWindow(windowId)}>
                    <div className="cursor-grab" onMouseDown={(event) => { event.stopPropagation(); setDragging({ id: windowId, offsetX: event.clientX - positions[windowId].x, offsetY: event.clientY - positions[windowId].y }); }}>
                      {renderWindowContent(windowId)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

        <footer className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-[22px] border px-3 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:px-4 ${glassClasses}`}>
          <div className="flex items-center gap-2">
            <button onClick={() => setStartOpen((prev) => !prev)} className="rounded-[14px] bg-gradient-to-r from-[#245EDB] to-[#3B82F6] px-3 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5">Start</button>
            <div className="hidden gap-2 sm:flex">
              {openWindows.filter((id) => !minimized[id]).map((windowId) => {
                const app = apps.find((entry) => entry.id === windowId);
                if (!app) return null;
                return (
                  <button key={windowId} onClick={() => activeWindow === windowId ? minimizeWindow(windowId) : restoreWindow(windowId)} className={`flex items-center gap-2 rounded-[12px] border px-3 py-2 text-sm transition ${activeWindow === windowId ? "border-[#245EDB]/50 bg-white/90" : "border-transparent bg-white/50"}`}>
                    {app.icon}
                    <span>{app.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setTheme((prev) => prev === "xp" ? "dark" : "xp")} className="rounded-full border border-slate-300/70 bg-white/70 p-2 transition hover:-translate-y-0.5" aria-label="Theme switch"><SunMoon size={16} /></button>
            <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm">
              <Wifi size={14} />
              <BatteryFull size={14} />
              <span>{clock}</span>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {startOpen && (
          <motion.div data-start-menu initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} className="absolute bottom-24 left-3 z-[120] w-[320px] rounded-[24px] border border-white/60 bg-white/85 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:left-6">
            <div className="rounded-[18px] bg-gradient-to-r from-[#245EDB] to-[#3B82F6] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/30 text-xl">A</div>
                <div>
                  <p className="text-lg font-semibold">Gian Karlo C. Reguindin</p>
                  <p className="text-sm opacity-80">Full Stack Developer</p>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {startItems.map((item) => (
                <button key={item.id} onClick={() => handleStartAction(item.id)} className="flex w-full items-center justify-between rounded-[14px] bg-white/70 px-3 py-2 text-left text-sm transition hover:bg-white">
                  <span className="flex items-center gap-2">{item.icon}{item.label}</span>
                  <span className="text-slate-400">›</span>
                </button>
              ))}
              <button onClick={() => window.open("https://github.com", "_blank")} className="flex w-full items-center justify-between rounded-[14px] bg-white/70 px-3 py-2 text-left text-sm transition hover:bg-white"><span className="flex items-center gap-2"><GitBranch size={16} />GitHub</span><span className="text-slate-400">›</span></button>
              <button onClick={() => window.open("https://linkedin.com", "_blank")} className="flex w-full items-center justify-between rounded-[14px] bg-white/70 px-3 py-2 text-left text-sm transition hover:bg-white"><span className="flex items-center gap-2"><Link size={16} />LinkedIn</span><span className="text-slate-400">›</span></button>
            </div>
            <button onClick={triggerShutdown} className="mt-3 flex w-full items-center justify-between rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm transition hover:bg-white">
              <span className="flex items-center gap-2"><PowerIcon />Shutdown</span>
              <span className="text-slate-400">›</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bsod && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] flex items-center justify-center bg-[#245EDB] p-6 text-center text-white">
            <div className="max-w-md space-y-4">
              <p className="text-6xl font-bold">:(</p>
              <h2 className="text-2xl font-semibold">A critical error occurred.</h2>
              <p className="text-sm leading-7 opacity-80">The interface briefly glitched, but the system is still recoverable. Press the button to restore the desktop.</p>
              <button onClick={() => setBsod(false)} className="rounded-full border border-white/40 px-4 py-2 text-sm transition hover:bg-white/20">Recover system</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shuttingDown && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[180] flex items-center justify-center bg-black text-center text-white">
            <div className="space-y-3">
              <div className="text-2xl font-semibold">Shutting down...</div>
              <div className="mx-auto h-2 w-40 overflow-hidden rounded-full bg-white/20">
                <motion.div animate={{ x: [-160, 160] }} transition={{ repeat: Infinity, duration: 1.1 }} className="h-2 w-16 rounded-full bg-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booting && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[220] flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_#245EDB,_#071b3a)] text-white">
            <div className="text-center">
              <div className="mb-6 text-4xl font-semibold">Windows XP</div>
              <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-white/20">
                <motion.div animate={{ width: [0, 180, 200] }} transition={{ duration: 2.2, ease: "easeInOut" }} className="h-2 rounded-full bg-white" />
              </div>
              <p className="mt-4 text-sm opacity-80">Loading your modern portfolio experience…</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PowerIcon() {
  return <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] text-white">⏻</span>;
}
