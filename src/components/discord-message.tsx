import { Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DiscordMessageProps {
  avatarSource: string;
  avatarAlt: string;
  username: string;
  timestamp: string;
  badgeText?: string;
  badgeColor?: string;
  title: string;
  content: {
    [key: string]: string;
  };
}

type BadgeColor = "#43b581" | "#faa61a" | (string & {});

const getBadgeStyles = (color: BadgeColor) => {
  switch (color) {
    case "#43b581":
      return "bg-green-500/10 text-green-400 ring-green-500/20";
    case "#faa61a":
      return "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 ring-gray-500/20";
  }
};

export const DiscordMessage = ({
  avatarAlt,
  avatarSource,
  content,
  timestamp,
  title,
  username,
  badgeColor = "#43b581",
  badgeText,
}: DiscordMessageProps) => {
  return (
    <div className="flex w-full items-start justify-start">
      <div className="mb-2 flex items-center">
        <Image
          src={avatarSource}
          alt={avatarAlt}
          width={40}
          height={40}
          className="mr-3 rounded-full object-cover"
        />
      </div>

      <div className="w-full max-w-xl">
        <div className="flex items-center">
          <p className="font-semibold text-white">{username}</p>
          <span className="ml-2 rounded bg-brand-600 px-1.5 py-0.5 font-semibold text-white text-xs">
            APP
          </span>
          <span className="ml-1.5 font-normal text-gray-400 text-xs">
            {timestamp}
          </span>
        </div>

        <div className="mt-1.5 mb-4 w-full rounded bg-[#2f3136] p-3 text-sm">
          <div className="mb-2 flex flex-row items-center justify-between">
            {badgeText ? (
              <span
                className={cn(
                  "order-2 inline-flex items-center rounded-md px-2 py-1 font-medium text-xs ring-1 ring-inset",
                  getBadgeStyles(badgeColor),
                )}
              >
                {badgeText}
              </span>
            ) : null}
            <p className="order-1 font-semibold text-base/7 text-white">
              {title}
            </p>
          </div>

          {Object.entries(content).map(([key, value]) => (
            <p key={key} className="text-discord-text text-sm/6">
              <span className="text-[#b9bbbe]">{key} : </span> {value}
            </p>
          ))}

          <p className="mt-2 flex items-center text-discord-timestamp text-xs">
            <Clock className="mr-1 size-3" />
            {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};
