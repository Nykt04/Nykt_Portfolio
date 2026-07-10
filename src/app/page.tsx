"use client";

import Image from "next/image";
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
import { useEffect, useMemo, useState, type FormEvent } from "react";

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
  { id: "portfolio", title: "My Portfolio", icon: <UserCircle2 size={18} />, defaultSize: { width: 970, height: 680 }, defaultPosition: { x: 64, y: 64 } },
  { id: "about", title: "About Me", icon: <UserCircle2 size={18} />, defaultSize: { width: 700, height: 680 }, defaultPosition: { x: 140, y: 116 } },
  { id: "skills", title: "Skills", icon: <Code2 size={18} />, defaultSize: { width: 620, height: 680 }, defaultPosition: { x: 220, y: 92 } },
  { id: "projects", title: "Projects", icon: <FolderKanban size={18} />, defaultSize: { width: 620, height: 680 }, defaultPosition: { x: 300, y: 80 } },
  { id: "experience", title: "Experience", icon: <BriefcaseBusiness size={18} />, defaultSize: { width: 620, height: 680 }, defaultPosition: { x: 380, y: 120 } },
  { id: "certificates", title: "Certificates", icon: <BadgeCheck size={18} />, defaultSize: { width: 620, height: 680 }, defaultPosition: { x: 460, y: 92 } },
  { id: "resume", title: "Resume", icon: <FileText size={18} />, defaultSize: { width: 550, height: 570 }, defaultPosition: { x: 540, y: 88 } },
  { id: "contact", title: "Contact", icon: <Mail size={18} />, defaultSize: { width: 620, height: 680 }, defaultPosition: { x: 620, y: 128 } },  
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
  { category: "Frontend", items: [{ label: "React", proficiency: 92 }, { label: "Next.js", proficiency: 90 }, { label: "Tailwind", proficiency: 88 }] },
  { category: "Backend", items: [{ label: "Node.js", proficiency: 84 }, { label: "Performance", proficiency: 78 }] },
  { category: "Mobile", items: [{ label: "React Native", proficiency: 78 }, { label: "UI Patterns", proficiency: 82 }] },
  { category: "Database", items: [{ label: "PostgreSQL", proficiency: 80 }, { label: "Supabase", proficiency: 76 }] },
  { category: "UI/UX", items: [{ label: "Design Systems", proficiency: 80 }, { label: "Prototyping", proficiency: 74 }] },
  { category: "Tools", items: [{ label: "Figma", proficiency: 82 }, { label: "Vercel", proficiency: 76 }] },
];

const profileImage = "/Prof.Pic.JPG";
const resumeFile = "/resume.pdf";
const contactEmail = "giankarloreguindin811@gmail.com";

const certificateImages = [
  { title: "HTML Essentials", subtitle: "CISCO Certified", image: "/cert-html.jpg" },
  { title: "CSS Essentials", subtitle: "CISCO Certified", image: "/cert-css.jpg" },
  { title: "Python Essentials 1", subtitle: "CISCO Certified", image: "/cert-python-1.jpg" },
  { title: "Python Essentials 2", subtitle: "CISCO Certified", image: "/cert-python-2.jpg" },
];

const stats = [
  { label: "Years of Craft", value: "Error 404" },
  { label: "Launches", value: "Secret" },
  { label: "Happy Clients", value: "-0" },
  { label: "Coffee Cups", value: "∞" },
];

const experienceTimeline = [
  {
    company: "ByteWise",
    role: "Project Manager",
    duration: "March 2026 – Present",
    description: "Project Manager of Project CHECK8, leading team coordination, planning, and development of a QR-based digital clearance system.",
    achievements: ["Improved UI consistency across product launches", "Delivered responsive, accessible web apps"],
  },
  {
    company: "ByteWise",
    role: "Main Developer",
    duration: "March 2026 – Present",
    description: "Main Developer of AceIT, responsible for developing and implementing an AI-powered quiz generation system that transforms study materials into interactive quizzes.",
    achievements: ["Built launch-ready products for multiple clients", "Enhanced onboarding and visual systems"],
  },
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
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
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
  const [selectedCertificate, setSelectedCertificate] = useState<{ title: string; subtitle: string; image?: string } | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");
  const [contactError, setContactError] = useState("");
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
    const getClient = (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) {
        const touch = event.touches[0] || event.changedTouches[0];
        return { x: touch.clientX, y: touch.clientY };
      }
      return { x: event.clientX, y: event.clientY };
    };

    const onMove = (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) event.preventDefault();
      const { x, y } = getClient(event);
      setPositions((prev) => ({
        ...prev,
        [dragging.id]: {
          x: Math.min(Math.max(x - dragging.offsetX, 8), viewPort.width - 220),
          y: Math.min(Math.max(y - dragging.offsetY, 8), viewPort.height - 220),
        },
      }));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
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
    setContactStatus("idle");
    setContactError("");
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

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, subject, message } = contactForm;
    if (!name || !email || !message) {
      setContactError("Please fill in your name, email, and message.");
      setContactStatus("error");
      return;
    }

    const mailto = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject || "Portfolio inquiry from " + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    setContactStatus("success");
    setContactError("");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const shellClasses = theme === "xp"
    ? "bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.7),_transparent_40%),linear-gradient(135deg,_#7DB7FF_0%,_#3B82F6_45%,_#245EDB_100%)] text-slate-900"
    : "bg-[radial-gradient(circle_at_top_left,_rgba(12,18,31,0.95),_transparent_40%),linear-gradient(135deg,_#020617_0%,_#111827_50%,_#0f172a_100%)] text-slate-100";

  const panelBg = theme === "xp" ? "bg-white/70" : "bg-slate-900/75";
  const panelBorder = theme === "xp" ? "border-slate-200/70" : "border-slate-700/80";
  const panelText = theme === "xp" ? "text-slate-900" : "text-slate-100";
  const mutedText = theme === "xp" ? "text-slate-600" : "text-slate-300";
  const softBg = theme === "xp" ? "bg-slate-50/80" : "bg-slate-950/70";
  const heroText = theme === "xp" ? "text-slate-950" : "text-slate-100";
  const heroBody = theme === "xp" ? "text-slate-800 opacity-90" : "text-slate-300/90";
  const heroTag = theme === "xp" ? "rounded-full border border-slate-200/80 bg-white/90 text-slate-700" : "rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-100";
  const heroChip = theme === "xp" ? "rounded-full border border-slate-200/80 bg-white/90 text-slate-700" : "rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-100";
  const heroLink = theme === "xp" ? "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200" : "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800";
  const heroBoxBg = theme === "xp" ? "bg-[linear-gradient(135deg,_rgba(36,94,219,0.12),_rgba(59,130,246,0.06))]" : "bg-slate-950/80 border border-slate-700/80";
  const glassClasses = theme === "xp" ? "bg-white/70 border-white/50 text-slate-800" : "bg-slate-900/70 border-slate-700/80 text-slate-100";

  const renderWindowContent = (windowId: WindowId) => {
    switch (windowId) {
      case "portfolio":
        return (
          <div className="flex flex-col gap-5">
            <div className="rounded-[20px] p-4 md:p-6 shadow-inner" style={{ background: "linear-gradient(135deg, rgba(36,94,219,0.12), rgba(59,130,246,0.06))" }}>
              <div className="grid gap-6 md:grid-cols-[1.35fr_auto] md:items-center md:gap-8">
                <div className="space-y-4">
                  <div className={`inline-flex items-center gap-2 rounded-full border ${theme === "xp" ? "border-slate-200/80 bg-white/90 text-slate-700" : "border-slate-700/80 bg-slate-900/80 text-slate-100"} px-3 py-1 text-xs uppercase tracking-[0.32em] shadow-sm`}>
                    Full Stack Developer
                  </div>
                  <h2 className={`text-4xl font-semibold tracking-tight ${heroText} sm:text-5xl`}>Gian Karlo C. Reguindin</h2>
                  <div className={`space-y-3 text-sm leading-7 ${heroBody} md:text-base`}>
                    <p>Building robust web applications with modern technologies.</p>
                    <p>I create polished interfaces, scalable backend systems, and meaningful user experiences.</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Next.js', 'React', 'Tailwind', 'TypeScript'].map((skill) => (
                      <span key={skill} className={heroChip}>{skill}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => openWindow("projects")} className="rounded-full bg-[#245EDB] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1f4bb8]">View Projects</button>
                    <a href={resumeFile} download className="inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100">Download CV</a>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    <a href="https://linkedin.com/in/giankarloreguindin" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 transition hover:bg-slate-200 ${theme === "xp" ? "border-slate-200 bg-slate-100 text-slate-700" : "border-slate-700 bg-slate-900 text-slate-100"}`}>
                      <Link size={16} /> LinkedIn
                    </a>
                    <a href="https://github.com/giankarloreguindin811" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 transition hover:bg-slate-200 ${theme === "xp" ? "border-slate-200 bg-slate-100 text-slate-700" : "border-slate-700 bg-slate-900 text-slate-100"}`}>
                      <GitBranch size={16} /> GitHub
                    </a>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-2 py-1 shadow-sm">UI</span>
                    <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-2 py-1 shadow-sm">Design</span>
                    <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-2 py-1 shadow-sm">Dev</span>
                  </div>
                </div>
                <div className="relative mx-auto flex h-72 w-72 items-center justify-center overflow-hidden rounded-[30px] border border-white/90 bg-white/90 p-3 shadow-[0_30px_60px_rgba(37,99,235,0.15)] md:h-80 md:w-80">
                  <div className="relative h-full w-full overflow-hidden rounded-[26px] border border-slate-200 bg-slate-100">
                    <Image src={profileImage} alt="Profile picture" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="space-y-4">
            <div className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 ${panelText}`}>
              <h3 className="mb-2 text-lg font-semibold">Biography</h3>
              <p className="text-sm leading-7 opacity-90">I am a Computer Science student and aspiring software developer with a passion for creating innovative, user-friendly digital solutions. I enjoy web development, UI/UX design, and solving real-world problems through technology while continuously expanding my technical skills and knowledge.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 ${panelText}`}>
                <h4 className="mb-2 font-semibold">Education</h4>
                <p className={`text-sm ${mutedText}`}>Bachelor of Science in Computer Science, Gordon College</p>
              </div>
              <div className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 ${panelText}`}>
                <h4 className="mb-2 font-semibold">Interests</h4>
                <p className={`text-sm ${mutedText}`}>Games, Money, and coffee-fueled debugging.</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 text-center ${panelText}`}>
                  <div className="text-xl font-semibold">{stat.value}</div>
                  <div className={`text-sm ${mutedText}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {skills.map((group) => (
              <div key={group.category} className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 ${panelText}`}>
                <div className="mb-3 flex items-center gap-2">
                  <PenTool size={16} className="text-[#245EDB]" />
                  <h3 className="font-semibold">{group.category}</h3>
                </div>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>{item.label}</span>
                        <span className={`text-xs ${mutedText}`}>{item.proficiency}%</span>
                      </div>
                      <div className={`h-2 rounded-full ${theme === "xp" ? "bg-slate-200" : "bg-slate-800"}`}>
                        <div className="h-2 rounded-full bg-gradient-to-r from-[#245EDB] to-[#3B82F6]" style={{ width: `${item.proficiency}%` }} />
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
              <div key={project.id} className={`rounded-[18px] border p-4 transition ${selectedProject === project.id ? "border-[#245EDB] bg-blue-50/70 text-slate-900" : `${panelBorder} ${panelBg} ${panelText} hover:-translate-y-1`}`}>
                <button
                  onClick={() => setSelectedProject(project.id)}
                  onMouseEnter={() => setSelectedProject(project.id)}
                  onFocus={() => setSelectedProject(project.id)}
                  className="w-full text-left"
                >
                  <div className={`mb-3 rounded-[16px] bg-gradient-to-br ${project.accent} p-4 text-white`}>
                    <p className="text-xs uppercase tracking-[0.3em]">Case Study</p>
                    <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                  </div>
                  <p className="text-sm leading-7 opacity-80">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className={`rounded-full px-2.5 py-1 text-xs ${theme === "xp" ? "bg-slate-100 text-slate-800" : "bg-slate-800 text-slate-100"}`}>{tag}</span>)}
                  </div>
                </button>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer" className={`mt-3 inline-flex items-center gap-2 text-sm font-medium ${theme === "xp" ? "text-sky-700 hover:text-sky-800" : "text-sky-300 hover:text-sky-200"}`}>
                    View live site <Link size={14} />
                  </a>
                ) : null}
              </div>
            ))}
            <div className={`rounded-[18px] border ${panelBorder} ${softBg} p-4 ${panelText}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm uppercase tracking-[0.3em] ${theme === "xp" ? "text-sky-600" : "text-sky-300"}`}>Selected Project</p>
                  <h3 className="text-lg font-semibold">{selectedProjectData.title}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs shadow-sm ${theme === "xp" ? "bg-white text-slate-900" : "bg-slate-800 text-slate-100"}`}>{selectedProjectData.stack.join(" • ")}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedProjectData.stack.map((item) => <span key={item} className={`rounded-full border px-2.5 py-1 text-xs ${theme === "xp" ? "border-slate-200 bg-white text-slate-900" : "border-slate-700 bg-slate-800 text-slate-100"}`}>{item}</span>)}
                {selectedProjectData.url ? (
                  <a href={selectedProjectData.url} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${theme === "xp" ? "border-slate-200 bg-white text-sky-700 hover:text-sky-800" : "border-slate-700 bg-slate-800 text-sky-300 hover:text-sky-200"}`}>
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
              <div key={entry.company} className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 ${panelText}`}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{entry.role}</h3>
                    <p className={`text-sm ${mutedText}`}>{entry.company}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs ${theme === "xp" ? "bg-slate-100 text-slate-900" : "bg-slate-800 text-slate-100"}`}>{entry.duration}</span>
                </div>
                <p className={`text-sm leading-7 ${theme === "xp" ? "opacity-80 text-slate-700" : "opacity-85 text-slate-300"}`}>{entry.description}</p>
                <ul className={`mt-3 space-y-1 text-sm ${theme === "xp" ? "text-slate-600" : "text-slate-300"}`}>
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
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedCertificate(item)}
                className={`rounded-[18px] border ${panelBorder} ${panelBg} p-3 text-left ${panelText} transition hover:-translate-y-1`}
              >
                <div className={`mb-3 h-28 rounded-[14px] overflow-hidden ${theme === "xp" ? "bg-slate-100" : "bg-slate-800"} shadow-inner`}>
                  {item.image ? (
                    <Image src={item.image} alt={item.title} width={400} height={224} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#245EDB] via-[#3B82F6] to-[#7DB7FF] text-white">
                      <ImagePlus size={28} />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className={`text-sm ${mutedText}`}>{item.subtitle}</p>
              </button>
            ))}
          </div>
        );
      case "resume":
        return (
          <div className="space-y-4">
            <div className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 ${panelText}`}>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className={`text-sm uppercase tracking-[0.3em] ${theme === "xp" ? "text-sky-600" : "text-sky-300"}`}>Resume Preview</p>
                  <h3 className="text-xl font-semibold">Gian Karlo C. Reguindin — Full Stack Developer</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${theme === "xp" ? "bg-[#5ABF41]/10 text-[#5ABF41]" : "bg-slate-800 text-slate-100"}`}>Available for hire</span>
              </div>
              <div className={`rounded-[16px] border ${theme === "xp" ? "border-slate-200 bg-slate-50" : "border-slate-700 bg-slate-950"} p-4 ${panelText} text-sm leading-7`}>
                <p><strong>Core Focus:</strong> UX architecture, interface systems, and high-end front-end delivery.</p>
                <p><strong>Experience:</strong> 2 years of experience as a Computer Science Student</p>
                <p><strong>Toolkit:</strong> React, Next.js, TypeScript, Python, C, Figma.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={resumeFile} download className="inline-flex rounded-full bg-[#245EDB] px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5">Download PDF</a>
              <button onClick={() => window.open(resumeFile, "_blank")?.print?.()} className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${theme === "xp" ? "border-slate-300/80 bg-white text-slate-900" : "border-slate-700 bg-slate-900 text-slate-100"}`}>Print</button>
            </div>
          </div>
        );
      case "contact":
        return (
          <form className="space-y-3" onSubmit={handleContactSubmit}>
            <div className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 ${panelText}`}>
              <div className={`mb-3 flex items-center gap-2 text-sm ${theme === "xp" ? "text-slate-600" : "text-slate-300"}`}>
                <MessageCircleMore size={16} className="text-[#245EDB]" />
                <span>Open to collaboration, speaking, and product design partnerships.</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block">Name</span>
                  <input value={contactForm.name} onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))} className={`w-full rounded-[12px] border px-3 py-2 ${theme === "xp" ? "border-slate-200 bg-white text-slate-900" : "border-slate-700 bg-slate-950 text-slate-100"}`} placeholder="Your name" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block">Email</span>
                  <input type="email" value={contactForm.email} onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))} className={`w-full rounded-[12px] border px-3 py-2 ${theme === "xp" ? "border-slate-200 bg-white text-slate-900" : "border-slate-700 bg-slate-950 text-slate-100"}`} placeholder="you@example.com" />
                </label>
              </div>
              <label className="mt-3 block text-sm">
                <span className="mb-1 block">Subject</span>
                <input value={contactForm.subject} onChange={(event) => setContactForm((prev) => ({ ...prev, subject: event.target.value }))} className={`w-full rounded-[12px] border px-3 py-2 ${theme === "xp" ? "border-slate-200 bg-white text-slate-900" : "border-slate-700 bg-slate-950 text-slate-100"}`} placeholder="Project inquiry" />
              </label>
              <label className="mt-3 block text-sm">
                <span className="mb-1 block">Message</span>
                <textarea value={contactForm.message} onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))} className={`min-h-28 w-full rounded-[12px] border px-3 py-2 ${theme === "xp" ? "border-slate-200 bg-white text-slate-900" : "border-slate-700 bg-slate-950 text-slate-100"}`} placeholder="Tell me about your idea" />
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button type="submit" className="rounded-full bg-[#245EDB] px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5">Send message</button>
              {contactStatus === "success" && <span className="text-sm text-[#5ABF41]">Message drafted in your email client. Send it to complete delivery.</span>}
              {contactStatus === "error" && <span className="text-sm text-rose-600">{contactError}</span>}
            </div>
          </form>
        );
      case "computer":
        return (
          <div className="space-y-3 text-sm">
            <div className={`rounded-[16px] border ${panelBorder} ${panelBg} p-4 ${panelText}`}>
              <p className="font-semibold">Local Disk (C:)</p>
              <p className={`mt-2 ${mutedText}`}>Creative projects, polished assets, and archived notes.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button onClick={() => openWindow("paint")} className={`rounded-[16px] border ${panelBorder} ${panelBg} p-4 text-left ${panelText}`}>Paint</button>
              <button onClick={() => openWindow("solitaire")} className={`rounded-[16px] border ${panelBorder} ${panelBg} p-4 text-left ${panelText}`}>Solitaire</button>
              <button onClick={() => openWindow("minesweeper")} className={`rounded-[16px] border ${panelBorder} ${panelBg} p-4 text-left ${panelText}`}>Minesweeper</button>
              <button onClick={() => setBsod(true)} className={`rounded-[16px] border ${panelBorder} ${panelBg} p-4 text-left ${panelText}`}>BSOD Easter Egg</button>
            </div>
          </div>
        );
      case "paint":
        return (
          <div className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 shadow-inner ${panelText}`}>
            <div className={`mb-3 flex items-center gap-2 text-sm ${theme === "xp" ? "text-slate-600" : "text-slate-300"}`}><PaintbrushVertical size={16} className="text-[#245EDB]" /> <span>A nostalgic sketch pad with smooth transitions.</span></div>
            <div className={`h-48 rounded-[14px] border border-dashed ${theme === "xp" ? "border-slate-300 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_45%),linear-gradient(135deg,_#f8fbff,_#eef5ff)]" : "border-slate-700 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_45%),linear-gradient(135deg,_#0f172a,_#111827)]"}`} />
          </div>
        );
      case "solitaire":
        return (
          <div className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 text-sm leading-7 ${panelText}`}>
            <p>Welcome to a modern solitaire experience with clean cards and satisfying motion.</p>
            <div className="mt-3 flex gap-2">
              <span className={`rounded-full px-3 py-1 ${theme === "xp" ? "bg-slate-100 text-slate-900" : "bg-slate-800 text-slate-100"}`}>♠</span>
              <span className={`rounded-full px-3 py-1 ${theme === "xp" ? "bg-slate-100 text-slate-900" : "bg-slate-800 text-slate-100"}`}>♥</span>
              <span className={`rounded-full px-3 py-1 ${theme === "xp" ? "bg-slate-100 text-slate-900" : "bg-slate-800 text-slate-100"}`}>♦</span>
              <span className={`rounded-full px-3 py-1 ${theme === "xp" ? "bg-slate-100 text-slate-900" : "bg-slate-800 text-slate-100"}`}>♣</span>
            </div>
          </div>
        );
      case "minesweeper":
        return (
          <div className={`rounded-[18px] border ${panelBorder} ${panelBg} p-4 text-sm leading-7 ${panelText}`}>
            <p>Minesweeper runs in a lightweight window with a playful update to the nostalgic classic.</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, index) => <div key={index} className={`h-8 rounded-[8px] border ${theme === "xp" ? "border-slate-200 bg-slate-50" : "border-slate-700 bg-slate-950"}`} />)}
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
        <div className="absolute left-12 top-36 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-16 top-52 h-16 w-16 rounded-full border border-white/20" />
        <div className="absolute left-1/2 top-72 h-px w-1/2 -translate-x-1/2 bg-white/10" />
        <div className="absolute left-10 top-10 grid h-36 w-36 grid-cols-6 gap-2 opacity-20">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="h-2 w-2 rounded-full bg-white/60" />
          ))}
        </div>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col justify-between px-3 pb-20 pt-3 sm:px-5 lg:px-8">
        <section className="flex-1">
          <div className="flex flex-wrap gap-3">
            {desktopIcons.map((icon) => (
              <motion.button key={icon.id} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => icon.title === "Recycle Bin" ? setBsod(true) : openWindow(icon.id)} className={`flex min-w-[7.5rem] flex-col items-center justify-center gap-1.5 rounded-[16px] border p-3 text-center backdrop-blur-sm transition ${theme === "xp" ? "border-white/30 bg-white/20 text-slate-900" : "border-slate-700/50 bg-slate-950/60 text-slate-100 hover:bg-slate-900/70"}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${theme === "xp" ? "bg-white/80 text-[#245EDB]" : "bg-slate-800 text-sky-300"} shadow-lg`}>{icon.icon}</div>
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
                <motion.div key={windowId} initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.18 }} onMouseDown={() => focusWindow(windowId)} className={`absolute overflow-hidden rounded-[20px] border shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl ${theme === "xp" ? "border-white/55 bg-white/80 text-slate-800" : "border-slate-700/70 bg-slate-900/80 text-slate-100"}`} style={{ left: positions[windowId].x, top: positions[windowId].y, width: maximized[windowId] ? Math.max((viewPort.width * 3) / 4, 640) : rect.width, height: maximized[windowId] ? Math.max((viewPort.height * 3) / 4, 480) : rect.height, zIndex: 50 + index }}>
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
                  <div className="h-[calc(100%-40px)] overflow-auto p-4 sm:p-5" onMouseDown={() => focusWindow(windowId)}>
                    <div
                      className="cursor-grab"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                        setDragging({ id: windowId, offsetX: event.clientX - positions[windowId].x, offsetY: event.clientY - positions[windowId].y });
                      }}
                      onTouchStart={(event) => {
                        event.stopPropagation();
                        const touch = event.touches[0];
                        setDragging({ id: windowId, offsetX: touch.clientX - positions[windowId].x, offsetY: touch.clientY - positions[windowId].y });
                      }}
                    >
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
                  <button key={windowId} onClick={() => activeWindow === windowId ? minimizeWindow(windowId) : restoreWindow(windowId)} className={`flex items-center gap-2 rounded-[12px] border px-3 py-2 text-sm transition ${activeWindow === windowId ? `${theme === "xp" ? "border-[#245EDB]/50 bg-white/90 text-slate-900" : "border-[#245EDB]/50 bg-slate-900/90 text-slate-100"}` : `${theme === "xp" ? "border-transparent bg-white/50 text-slate-900" : "border-transparent bg-slate-950/80 text-slate-100"}`}`}>
                    {app.icon}
                    <span>{app.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setTheme((prev) => prev === "xp" ? "dark" : "xp")} className={`rounded-full border p-2 transition hover:-translate-y-0.5 ${theme === "xp" ? "border-slate-300/70 bg-white/70 text-slate-900" : "border-slate-700/80 bg-slate-900/80 text-slate-100"}`} aria-label="Theme switch"><SunMoon size={16} /></button>
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm ${theme === "xp" ? "bg-white/70 text-slate-900" : "bg-slate-900/80 text-slate-100"}`}>
              <Wifi size={14} />
              <BatteryFull size={14} />
              <span>{clock}</span>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {startOpen && (
          <motion.div data-start-menu initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} className={`absolute bottom-24 left-3 z-[120] w-[320px] rounded-[24px] border p-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:left-6 ${theme === "xp" ? "border-white/60 bg-white/85" : "border-slate-700/70 bg-slate-950/95"}`}>
            <div className="rounded-[18px] bg-gradient-to-r from-[#245EDB] to-[#3B82F6] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${theme === "xp" ? "bg-white/30 text-slate-900" : "bg-slate-800 text-slate-100"} text-xl`}>A</div>
                <div>
                  <p className="text-lg font-semibold">Gian Karlo C. Reguindin</p>
                  <p className="text-sm opacity-80">Full Stack Developer</p>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {startItems.map((item) => (
                <button key={item.id} onClick={() => handleStartAction(item.id)} className={`flex w-full items-center justify-between rounded-[14px] px-3 py-2 text-left text-sm transition ${theme === "xp" ? "bg-white/70 text-slate-900 hover:bg-white" : "bg-slate-900/80 text-slate-100 hover:bg-slate-900"}`}>
                  <span className="flex items-center gap-2">{item.icon}{item.label}</span>
                  <span className={`${theme === "xp" ? "text-slate-400" : "text-slate-400/90"}`}>›</span>
                </button>
              ))}
              <button onClick={() => window.open("https://github.com/Nykt04")} className={`flex w-full items-center justify-between rounded-[14px] px-3 py-2 text-left text-sm transition ${theme === "xp" ? "bg-white/70 text-slate-900 hover:bg-white" : "bg-slate-900/80 text-slate-100 hover:bg-slate-900"}`}><span className="flex items-center gap-2"><GitBranch size={16} />GitHub</span><span className={`${theme === "xp" ? "text-slate-400" : "text-slate-400/90"}`}>›</span></button>
              <button onClick={() => window.open("https://www.linkedin.com/in/gian-karlo-reguindin-762712349/", "_blank")} className={`flex w-full items-center justify-between rounded-[14px] px-3 py-2 text-left text-sm transition ${theme === "xp" ? "bg-white/70 text-slate-900 hover:bg-white" : "bg-slate-900/80 text-slate-100 hover:bg-slate-900"}`}><span className="flex items-center gap-2"><Link size={16} />LinkedIn</span><span className={`${theme === "xp" ? "text-slate-400" : "text-slate-400/90"}`}>›</span></button>
            </div>
            <button onClick={triggerShutdown} className={`mt-3 flex w-full items-center justify-between rounded-[14px] px-3 py-2 text-left text-sm transition ${theme === "xp" ? "border border-slate-200 bg-slate-50 text-slate-900 hover:bg-white" : "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"}`}>
              <span className="flex items-center gap-2"><PowerIcon />Shutdown</span>
              <span className={`${theme === "xp" ? "text-slate-400" : "text-slate-400/90"}`}>›</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[230] flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
              <button onClick={() => setSelectedCertificate(null)} className="absolute right-4 top-4 z-20 rounded-full bg-white p-3 text-slate-900 shadow-md transition hover:bg-slate-100" aria-label="Close certificate preview">
                <X size={20} />
              </button>
              <div className="rounded-[28px] overflow-hidden bg-slate-950">
                {selectedCertificate.image ? (
                  <Image src={selectedCertificate.image} alt={selectedCertificate.title} width={1200} height={675} className="h-[min(70vh,460px)] w-full object-cover" />
                ) : (
                  <div className="flex h-[min(70vh,460px)] items-center justify-center bg-slate-800 text-white">
                    <ImagePlus size={40} />
                  </div>
                )}
              </div>
              <div className="space-y-3 p-6">
                <div className="text-sm uppercase tracking-[0.32em] text-slate-400">Certificate</div>
                <h2 className="text-2xl font-semibold text-slate-900">{selectedCertificate.title}</h2>
                <p className="text-sm text-slate-600">{selectedCertificate.subtitle}</p>
              </div>
            </div>
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
