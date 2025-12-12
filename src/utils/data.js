import {
  Award,
  BarChart3,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CircleFadingPlus,
  Clock,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Search,
  Shield,
  Users,
} from "lucide-react";

export const jobSeekerData = [
  {
    id: 1,
    icon: Search,
    title: "Smart Job Matching",
    description:
      "AI-powered alghoritm matches you with relevant opportunities based on youe skills and preferences.",
  },
  {
    id: 2,
    icon: FileText,
    title: "Resume Builder",
    description:
      "Create professional resumes woth our instuitive builder and templates designed by experts.",
  },
  {
    id: 3,
    icon: MessageSquare,
    title: "Direct Communication",
    description:
      "Connect directly with hiting managers and rectuiterrs through our secure messaging system.",
  },
  {
    id: 4,
    icon: Award,
    title: "Skill Assessment",
    description:
      "Showcase your abilities with verified skill tests and earn badges that employers trust.",
  },
];

export const employerData = [
  {
    id: 1,
    icon: Users,
    title: "Talent Pool Access",
    description:
      "Access our vast database of pre-screened candidates and find the perfect fit for your team.",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Analitycs Dashboard",
    description:
      "Track your hiring performance with detailed analytics and insights to optimize your hiring strategy.",
  },
  {
    id: 3,
    icon: Shield,
    title: "Verified Candidates",
    description:
      "All candidates undergo background verification to ensure you're hiring trustworthy professionals.",
  },
  {
    id: 4,
    icon: Clock,
    title: "Quick Hiring",
    description:
      "Streamline your hiring process with our streamlined hiring workflow and quick onboarding.",
  },
];

export const NAVIGATION_MENU = [
  { id: "employer-dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "post-job", name: "Post Job", icon: CircleFadingPlus },
  { id: "manage-jobs", name: "Manage Jobs", icon: BriefcaseBusiness },
  { id: "company-profile", name: "Company Profile", icon: Building2 },
];

export const CATEGORIES = [
  { value: "Engineering", label: "Engineering" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "IT & Software", label: "IT & Software" },
  { value: "Product", label: "Product" },
  { value: "Operations", label: "Operations" },
  { value: "Finance", label: "Finance" },
  { value: "HR", label: "Human Resources" },
  { value: "Other", label: "Other" },
];

export const JOB_TYPES = [
  { value: "Remote", label: "Remote" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

export const SALARY_RANGES = [
  "Less than $1000",
  "$1000 - $15,000",
  "More than $15,000",
];
