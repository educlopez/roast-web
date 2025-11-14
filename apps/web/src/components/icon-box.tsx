import {
  Book,
  Briefcase,
  Building2,
  Code,
  FileText,
  FolderOpen,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  Layout,
  type LucideIcon,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

type IconConfig = {
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
};

// Color schemes matching the Figma examples
const iconConfigs: Record<string, IconConfig> = {
  // Specific project types/categories
  portfolio: {
    icon: Briefcase,
    bgColor: "#F1E5FF",
    iconColor: "#8638E5",
  },
  servicio: {
    icon: Zap,
    bgColor: "#FFDFCC",
    iconColor: "#FF5C16",
  },
  agencia: {
    icon: Building2,
    bgColor: "#E5F4FF",
    iconColor: "#0D99FF",
  },
  producto: {
    icon: Sparkles,
    bgColor: "#FFE0FC",
    iconColor: "#FF24BD",
  },
  recurso: {
    icon: Sparkles,
    bgColor: "#FFE0FC",
    iconColor: "#FF24BD",
  },
  academia: {
    icon: GraduationCap,
    bgColor: "#CFF7D3",
    iconColor: "#009951",
  },
  libro: {
    icon: Book,
    bgColor: "#CEF0F8",
    iconColor: "#00A2C2",
  },
  // Design/UI related
  design: {
    icon: Palette,
    bgColor: "#E5F4FF",
    iconColor: "#0D99FF",
  },
  ui: {
    icon: Layout,
    bgColor: "#E5F4FF",
    iconColor: "#0D99FF",
  },
  figma: {
    icon: Sparkles,
    bgColor: "#F1E5FF",
    iconColor: "#8638E5",
  },
  // Development related
  dev: {
    icon: Code,
    bgColor: "#CFF7D3",
    iconColor: "#009951",
  },
  code: {
    icon: Code,
    bgColor: "#CFF7D3",
    iconColor: "#009951",
  },
  // Web/Website related
  web: {
    icon: Globe,
    bgColor: "#EBEBFF",
    iconColor: "#4D49FC",
  },
  website: {
    icon: Globe,
    bgColor: "#EBEBFF",
    iconColor: "#4D49FC",
  },
  site: {
    icon: Globe,
    bgColor: "#EBEBFF",
    iconColor: "#4D49FC",
  },
  // Content/Document related
  content: {
    icon: FileText,
    bgColor: "#FFDFCC",
    iconColor: "#FF5C16",
  },
  document: {
    icon: FileText,
    bgColor: "#FFDFCC",
    iconColor: "#FF5C16",
  },
  // Image/Media related
  image: {
    icon: ImageIcon,
    bgColor: "#FFE0FC",
    iconColor: "#FF24BD",
  },
  media: {
    icon: ImageIcon,
    bgColor: "#FFE0FC",
    iconColor: "#FF24BD",
  },
  // Automation/Productivity
  automation: {
    icon: Zap,
    bgColor: "#D2DAE4",
    iconColor: "#000000",
  },
  // Default fallback
  default: {
    icon: Sparkles,
    bgColor: "#F1E5FF",
    iconColor: "#8638E5",
  },
};

function getIconConfig(type: string | null | undefined): IconConfig {
  if (!type) {
    return iconConfigs.default;
  }

  const normalizedType = type.toLowerCase().trim();

  // Check for exact matches first
  if (iconConfigs[normalizedType]) {
    return iconConfigs[normalizedType];
  }

  // Check for partial matches
  for (const [key, config] of Object.entries(iconConfigs)) {
    if (key !== "default" && normalizedType.includes(key)) {
      return config;
    }
  }

  return iconConfigs.default;
}

type IconBoxProps = {
  type?: string | null;
  size?: number;
  className?: string;
};

export function IconBox({ type, size = 24, className = "" }: IconBoxProps) {
  const config = getIconConfig(type);
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-center rounded ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: config.bgColor,
      }}
    >
      <Icon
        size={size * 0.625}
        style={{
          color: config.iconColor,
        }}
      />
    </div>
  );
}
