import {
  ShieldCheck,
  Users,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure & Protected",
    description: "Enterprise grade security",
  },
  {
    icon: Users,
    title: "Role Based Access",
    description: "Controlled administrator access",
  },
  {
    icon: BarChart3,
    title: "System Monitoring",
    description: "Real-time system insights",
  },
];

function SecurityFeatures() {
  return (
    <div className="mt-10 space-y-5">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="flex items-center gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white backdrop-blur-sm">
              <Icon size={25} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-1 text-sm text-white/75">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SecurityFeatures;