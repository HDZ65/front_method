import type { SiteContent } from "@/types"

export const siteContent: SiteContent = {
  meta: {
    title: "Nexus — Connect your tools, automate your workflows",
    description: "Nexus is the integration platform that connects your entire stack. Build automations in minutes, not months. Trusted by 2,000+ engineering teams.",
    ogImage: "https://picsum.photos/id/1/1200/630"
  },

  nav: {
    logo: {
      text: "Nexus",
      icon: "Zap"
    },
    items: [
      { label: "Product", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "/docs" },
      { label: "Changelog", href: "/changelog", badge: "New" }
    ],
    cta: {
      label: "Start building",
      href: "/signup"
    }
  },

  hero: {
    badge: {
      text: "v3.2 — Native AI Actions",
      icon: "Sparkles",
      variant: "announcement"
    },
    title: {
      text: "Connect everything.",
      highlight: "Automate anything."
    },
    subtitle: "Nexus is the integration layer your stack has been missing. Connect 400+ tools, build complex workflows visually, and let AI handle the edge cases. From webhook to production in under 5 minutes.",
    ctas: {
      primary: {
        label: "Start free trial",
        href: "/signup",
        icon: "ArrowRight"
      },
      secondary: {
        label: "Watch demo",
        href: "/demo"
      }
    },
    socialProof: {
      avatars: [
        "https://ui-avatars.com/api/?name=Sarah+Chen&background=8B5CF6&color=fff&size=40",
        "https://ui-avatars.com/api/?name=Marcus+Lee&background=6366F1&color=fff&size=40",
        "https://ui-avatars.com/api/?name=Emma+Wilson&background=8B5CF6&color=fff&size=40",
        "https://ui-avatars.com/api/?name=David+Kim&background=6366F1&color=fff&size=40",
        "https://ui-avatars.com/api/?name=Lisa+Park&background=8B5CF6&color=fff&size=40"
      ],
      text: "Joined by 2,400+ teams this month",
      rating: {
        value: 4.9,
        count: "850+ reviews"
      }
    },
    metrics: [
      { value: "47ms", label: "Avg latency", icon: "Zap" },
      { value: "99.99%", label: "Uptime SLA", icon: "Activity" },
      { value: "SOC2", label: "Type II", icon: "Shield" }
    ]
  },

  logos: {
    title: "Trusted by teams who ship fast",
    logos: [
      { name: "Vercel", src: "https://picsum.photos/id/1/200/80", href: "#" },
      { name: "Linear", src: "https://picsum.photos/id/20/200/80", href: "#" },
      { name: "Notion", src: "https://picsum.photos/id/26/200/80", href: "#" },
      { name: "Figma", src: "https://picsum.photos/id/36/200/80", href: "#" },
      { name: "Stripe", src: "https://picsum.photos/id/42/200/80", href: "#" },
      { name: "Shopify", src: "https://picsum.photos/id/48/200/80", href: "#" },
      { name: "Datadog", src: "https://picsum.photos/id/60/200/80", href: "#" },
      { name: "Segment", src: "https://picsum.photos/id/96/200/80", href: "#" }
    ]
  },

  features: {
    badge: "Platform",
    title: {
      text: "Everything you need to",
      highlight: "ship faster"
    },
    subtitle: "Stop context-switching between tools. Nexus brings your entire workflow into one place with native integrations, visual automation builder, and AI-powered error handling.",
    layout: "bento",
    features: [
      {
        id: "visual-builder",
        icon: "Workflow",
        title: "Visual workflow builder",
        description: "Drag, drop, deploy. Build complex multi-step automations without writing code. Branch logic, loops, error handling — all visual. Your entire team can contribute, not just engineers.",
        benefits: [
          "50+ pre-built workflow templates",
          "Version control with rollback",
          "Real-time collaboration editing"
        ],
        stat: {
          value: "12min",
          label: "Avg time to first automation",
          icon: "Clock"
        },
        link: {
          label: "Explore builder",
          href: "/features/builder",
          icon: "ArrowRight"
        },
        image: {
          src: "https://picsum.photos/id/180/800/600",
          alt: "Visual workflow builder interface showing a multi-step automation"
        },
        size: "large",
        highlight: true
      },
      {
        id: "integrations",
        icon: "Puzzle",
        title: "400+ native integrations",
        description: "Every tool your team uses, connected. Slack, GitHub, Jira, Salesforce, HubSpot, Stripe — and 394 more. OAuth in one click, no API keys to manage.",
        benefits: [
          "New integrations weekly",
          "Custom webhook support",
          "GraphQL & REST APIs"
        ],
        image: {
          src: "https://picsum.photos/id/119/600/400",
          alt: "Grid of integration logos including Slack, GitHub, Notion"
        },
        size: "default"
      },
      {
        id: "ai-actions",
        icon: "Brain",
        title: "AI-powered actions",
        description: "Let GPT-4 handle the fuzzy parts. Parse unstructured emails, categorize support tickets, generate responses — all as workflow steps. Your automations just got smarter.",
        benefits: [
          "Pre-trained for common tasks",
          "Custom prompt templates",
          "Token usage analytics"
        ],
        stat: {
          value: "89%",
          label: "Accuracy on classification",
          icon: "Target"
        },
        image: {
          src: "https://picsum.photos/id/183/600/400",
          alt: "AI action configuration panel with prompt editor"
        },
        size: "default"
      },
      {
        id: "monitoring",
        icon: "Activity",
        title: "Real-time monitoring",
        description: "Watch your workflows execute in real-time. Detailed logs for every step, instant alerts on failures, automatic retries with exponential backoff. Never miss a beat.",
        image: {
          src: "https://picsum.photos/id/160/800/400",
          alt: "Real-time workflow execution dashboard with logs"
        },
        size: "wide"
      },
      {
        id: "security",
        icon: "Shield",
        title: "Enterprise security",
        description: "SOC2 Type II certified. All data encrypted at rest and in transit. SSO with SAML, SCIM provisioning, audit logs for every action. Your security team will love us.",
        benefits: [
          "GDPR & CCPA compliant",
          "Data residency options",
          "99.99% uptime SLA"
        ],
        image: {
          src: "https://picsum.photos/id/186/600/400",
          alt: "Security dashboard showing compliance status"
        },
        size: "default"
      },
      {
        id: "api",
        icon: "Code",
        title: "Developer-first API",
        description: "Everything in Nexus is API-accessible. Trigger workflows programmatically, manage integrations via Terraform, embed automations in your product. Full TypeScript SDK included.",
        stat: {
          value: "47ms",
          label: "p95 API latency",
          icon: "Zap"
        },
        link: {
          label: "Read API docs",
          href: "/docs/api",
          icon: "ExternalLink",
          external: true
        },
        image: {
          src: "https://picsum.photos/id/188/600/400",
          alt: "API documentation page with code examples"
        },
        size: "default"
      }
    ]
  },

  testimonials: {
    badge: "Testimonials",
    title: {
      text: "Loved by teams",
      highlight: "who ship"
    },
    subtitle: "Don't take our word for it. Here's what engineering and ops teams say after switching to Nexus.",
    testimonials: [
      {
        id: "testimonial-1",
        quote: "We replaced 4 different tools with Nexus. Our incident response workflow went from 23 minutes to under 4. The AI classification alone saves us 15 hours a week on support triage.",
        highlight: "incident response went from 23 minutes to under 4",
        author: {
          name: "Sarah Chen",
          avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=8B5CF6&color=fff&size=80",
          role: "Head of Engineering",
          company: "Runway",
          href: "#"
        },
        rating: 5,
        date: {
          raw: "2024-11-15",
          formatted: "15 November 2024",
          relative: "4 weeks ago"
        },
        metrics: {
          label: "Response time",
          before: "23 min",
          after: "4 min",
          improvement: "-82%"
        },
        featured: true
      },
      {
        id: "testimonial-2",
        quote: "The visual builder is genuinely good. Our product managers can now create their own automations without filing Jira tickets. Engineering focus time went up 40%.",
        highlight: "Engineering focus time went up 40%",
        author: {
          name: "Marcus Lee",
          avatar: "https://ui-avatars.com/api/?name=Marcus+Lee&background=6366F1&color=fff&size=80",
          role: "VP of Platform",
          company: "Scale AI"
        },
        rating: 5,
        date: {
          raw: "2024-10-28",
          formatted: "28 October 2024",
          relative: "6 weeks ago"
        }
      },
      {
        id: "testimonial-3",
        quote: "Security review took 2 days instead of the usual 2 weeks. SSO worked out of the box, audit logs were exactly what compliance needed. Smooth procurement experience.",
        author: {
          name: "Amanda Torres",
          avatar: "https://ui-avatars.com/api/?name=Amanda+Torres&background=8B5CF6&color=fff&size=80",
          role: "CISO",
          company: "Figma"
        },
        rating: 5,
        date: {
          raw: "2024-09-12",
          formatted: "12 September 2024",
          relative: "3 months ago"
        }
      },
      {
        id: "testimonial-4",
        quote: "I've tried Zapier, Make, n8n, Tray. Nexus is the first one that doesn't feel like a toy when you need to do something complex. The debugging experience is actually good.",
        highlight: "doesn't feel like a toy when you need to do something complex",
        author: {
          name: "David Kim",
          avatar: "https://ui-avatars.com/api/?name=David+Kim&background=6366F1&color=fff&size=80",
          role: "Staff Engineer",
          company: "Vercel"
        },
        rating: 5,
        date: {
          raw: "2024-11-02",
          formatted: "2 November 2024",
          relative: "5 weeks ago"
        },
        featured: true
      },
      {
        id: "testimonial-5",
        quote: "We process 2M+ events daily through Nexus. Zero downtime in 8 months. When we hit a scaling issue, their team had a fix deployed in under 2 hours. That's rare.",
        author: {
          name: "Elena Rodriguez",
          avatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=8B5CF6&color=fff&size=80",
          role: "Director of Infrastructure",
          company: "Notion"
        },
        rating: 5,
        date: {
          raw: "2024-10-15",
          formatted: "15 October 2024",
          relative: "2 months ago"
        },
        metrics: {
          label: "Events processed",
          before: "500K/day",
          after: "2M+/day",
          improvement: "+300%"
        }
      },
      {
        id: "testimonial-6",
        quote: "The AI actions are the killer feature. We built a complete customer onboarding flow with personalized emails, Slack alerts, and CRM updates — in one afternoon.",
        author: {
          name: "James Wright",
          avatar: "https://ui-avatars.com/api/?name=James+Wright&background=6366F1&color=fff&size=80",
          role: "Growth Lead",
          company: "Linear"
        },
        rating: 5,
        date: {
          raw: "2024-11-20",
          formatted: "20 November 2024",
          relative: "3 weeks ago"
        }
      }
    ]
  },

  pricing: {
    badge: "Pricing",
    title: {
      text: "Simple pricing,",
      highlight: "powerful platform"
    },
    subtitle: "Start free, scale as you grow. No hidden fees, no surprises. All plans include our core integrations and visual builder.",
    billingToggle: true,
    plans: [
      {
        id: "starter",
        name: "Starter",
        description: "For individuals and small teams getting started with automation",
        price: {
          monthly: 0,
          yearly: 0,
          currency: "$"
        },
        period: "/month",
        features: [
          { text: "Up to 1,000 tasks/month", included: true },
          { text: "5 active workflows", included: true },
          { text: "100+ integrations", included: true },
          { text: "Community support", included: true },
          { text: "7-day execution history", included: true },
          { text: "AI actions", included: false, tooltip: "Available on Pro and Enterprise" },
          { text: "SSO & SAML", included: false },
          { text: "Custom integrations", included: false }
        ],
        cta: {
          label: "Get started free",
          href: "/signup"
        },
        trial: "No credit card required"
      },
      {
        id: "pro",
        name: "Pro",
        description: "For growing teams who need more power and flexibility",
        price: {
          monthly: 49,
          yearly: 39,
          currency: "$"
        },
        period: "/user/month",
        features: [
          { text: "Unlimited tasks", included: true, highlight: true },
          { text: "Unlimited workflows", included: true, highlight: true },
          { text: "400+ integrations", included: true },
          { text: "Priority support", included: true, tooltip: "Response within 4 hours" },
          { text: "90-day execution history", included: true },
          { text: "AI actions included", included: true, highlight: true },
          { text: "Team collaboration", included: true },
          { text: "API access", included: true }
        ],
        cta: {
          label: "Start 14-day trial",
          href: "/signup?plan=pro"
        },
        badge: "Most popular",
        highlighted: true,
        trial: "14-day free trial"
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For organizations with advanced security and compliance needs",
        price: {
          monthly: 199,
          yearly: 159,
          currency: "$"
        },
        period: "/user/month",
        features: [
          { text: "Everything in Pro", included: true },
          { text: "SSO with SAML", included: true, highlight: true },
          { text: "SCIM provisioning", included: true },
          { text: "Audit logs", included: true, highlight: true },
          { text: "Dedicated support", included: true, tooltip: "Slack channel + account manager" },
          { text: "99.99% uptime SLA", included: true, highlight: true },
          { text: "Custom integrations", included: true },
          { text: "Data residency options", included: true }
        ],
        cta: {
          label: "Contact sales",
          href: "/contact"
        },
        trial: "Custom pilot available"
      }
    ],
    guarantee: "30-day money-back guarantee. No questions asked."
  },

  cta: {
    title: {
      text: "Ready to",
      highlight: "automate?"
    },
    subtitle: "Join 2,400+ teams who shipped faster this month. Start your free trial today — no credit card required.",
    ctas: {
      primary: {
        label: "Start building for free",
        href: "/signup",
        icon: "ArrowRight"
      },
      secondary: {
        label: "Talk to sales",
        href: "/contact"
      }
    },
    features: [
      "14-day free trial",
      "No credit card required",
      "Setup in under 5 minutes"
    ]
  },

  footer: {
    logo: {
      text: "Nexus",
      tagline: "The integration platform for modern teams."
    },
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Integrations", href: "/integrations" },
          { label: "Pricing", href: "#pricing" },
          { label: "Changelog", href: "/changelog" },
          { label: "Roadmap", href: "/roadmap" }
        ]
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "API Reference", href: "/docs/api" },
          { label: "Templates", href: "/templates" },
          { label: "Blog", href: "/blog" },
          { label: "Community", href: "/community" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers", icon: "Sparkles" },
          { label: "Press", href: "/press" },
          { label: "Contact", href: "/contact" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Security", href: "/security" },
          { label: "DPA", href: "/dpa" }
        ]
      }
    ],
    social: [
      { icon: "Twitter", href: "https://twitter.com/nexushq", label: "Twitter" },
      { icon: "Github", href: "https://github.com/nexushq", label: "GitHub" },
      { icon: "Linkedin", href: "https://linkedin.com/company/nexushq", label: "LinkedIn" },
      { icon: "Youtube", href: "https://youtube.com/@nexushq", label: "YouTube" }
    ],
    bottom: {
      copyright: "© 2024 Nexus Technologies Inc. All rights reserved.",
      links: [
        { label: "Status", href: "https://status.nexus.dev", external: true },
        { label: "Sitemap", href: "/sitemap" }
      ]
    }
  }
}
