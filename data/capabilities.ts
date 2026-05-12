export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide-react icon name key
}

export const capabilities: CapabilityItem[] = [
  {
    id: "1",
    iconName: "Bot",
    title: "Agentic Automation",
    description:
      "We build smart agents that automate tasks, drive workflow automation, and solve problems across your enterprise systems.",
  },
  {
    id: "2",
    iconName: "Code2",
    title: "Custom Software Development",
    description: "Enterprise web applications tailored to your business needs.",
  },
  {
    id: "3",
    iconName: "Smartphone",
    title: "Mobile App Development",
    description: "High-performance Android & iOS applications.",
  },
  {
    id: "4",
    iconName: "Link2",
    title: "Connected Experiences",
    description:
      "We design BLE and NFC-enabled systems that connect physical and digital touchpoints seamlessly.",
  },
  {
    id: "5",
    iconName: "Database",
    title: "Data and Analytics",
    description:
      "We build data pipelines and analytics foundations to track performance, uncover insights, and support smarter growth.",
  },
  {
    id: "6",
    iconName: "Presentation",
    title: "Reporting & Visualization",
    description:
      "We create clear dashboards and reporting layers that turn operational and product signals into actionable decisions.",
  },
  {
    id: "7",
    iconName: "Zap",
    title: "Business Process Automation",
    description: "Streamlining operations to save time and cost.",
  },
  {
    id: "8",
    iconName: "Settings2",
    title: "CRM Setup & Customization",
    description: "Optimizing systems like Zoho, Salesforce for better sales tracking.",
  },
  {
    id: "9",
    iconName: "PenTool",
    title: "UX/UI and Product Designing",
    description:
      "We create human-centered, intuitive designs that are not only usable but delightful to interact with.",
  },
  {
    id: "10",
    iconName: "BarChart3",
    title: "Digital Marketing & SEO",
    description: "Data-driven strategies to increase visibility and generate leads.",
  },
  {
    id: "11",
    iconName: "TrendingUp",
    title: "Sales Outsourcing",
    description: "Dedicated team to handle your sales and customer conversion.",
  },
  {
    id: "12",
    iconName: "Users",
    title: "Talent Acquisition & Hiring",
    description: "Finding and managing the right people for your business.",
  },
];
