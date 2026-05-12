export type PricingIcon =
  | "users"
  | "userPlus"
  | "fileText"
  | "refreshCw"
  | "timer"
  | "trendingUp";

export interface PricingLineItem {
  label: string;
  value: string;
}

export interface PricingModel {
  id: string;
  icon: PricingIcon;
  title: string;
  badge: string;
  whenFit: string[];
  pricingTitle: string;
  pricingSummary: string;
  pricingItems?: PricingLineItem[];
  highlighted?: boolean;
}

export const pricingModels: PricingModel[] = [
  {
    id: "specialized-team",
    icon: "users",
    title: "Specialised Team",
    badge: "Model 1",
    whenFit: [
      "Long-term, evolving projects needing team consistency.",
      "Complex ongoing products requiring deeper team integration.",
    ],
    pricingTitle: "Hourly Rate",
    pricingSummary: "$40/hour per resource",
    highlighted: true,
  },
  {
    id: "augmentation",
    icon: "userPlus",
    title: "Augmentation",
    badge: "Model 2",
    whenFit: [
      "Projects needing specific skills or additional bandwidth.",
      "In-house teams that need focused support for 3, 6 or 12 months.",
    ],
    pricingTitle: "Per Resource",
    pricingSummary: "$6,400-$7,200/month (160 hours/month)",
  },
  {
    id: "fixed-cost",
    icon: "fileText",
    title: "Fixed Cost",
    badge: "Model 3",
    whenFit: [
      "Clearly defined projects with fixed deliverables.",
      "Teams with a clear vision and a controlled budget.",
    ],
    pricingTitle: "Project-Based",
    pricingSummary: "Predetermined pricing for a locked scope.",
    pricingItems: [
      { label: "Small", value: "$5,000-$10,000 (2-3 weeks, 80-160 hours)" },
      { label: "Mid", value: "$12,000-$25,000 (3-6 months, 300-480 hours)" },
      { label: "Large", value: "$40,000+ (6+ months, 1,000+ hours)" },
    ],
  },
  {
    id: "retainer",
    icon: "refreshCw",
    title: "Retainer",
    badge: "Model 4",
    whenFit: [
      "Continuous support and ongoing product development.",
      "Teams prioritizing long-term consistency and availability.",
    ],
    pricingTitle: "Per Resource + Commitment Discount",
    pricingSummary: "Retainer terms typically run 3, 6 or 12 months.",
    pricingItems: [
      { label: "3 months", value: "5% discount" },
      { label: "6 months", value: "10% discount" },
      { label: "1 year", value: "15%-20% discount" },
    ],
  },
  {
    id: "time-material",
    icon: "timer",
    title: "Time & Material",
    badge: "Model 5",
    whenFit: [
      "Projects with evolving scope, discovery, or proof of concept work.",
      "Teams wanting flexible and iterative delivery.",
    ],
    pricingTitle: "Hourly Rate",
    pricingSummary: "$40/hour",
  },
  {
    id: "tech-investment",
    icon: "trendingUp",
    title: "Tech Investment",
    badge: "Model 6",
    whenFit: [
      "Startups with limited funding but strong product potential.",
      "Founders open to equity or revenue-sharing structures.",
    ],
    pricingTitle: "Hybrid Cash + Equity",
    pricingSummary:
      "Example structure: 70% cash / 30% equity, with risk-adjusted add-ons in select strategic cases.",
  },
];
