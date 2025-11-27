import type { ImgHTMLAttributes, Ref } from "react";
import { cn } from "../../utils/cn";
import {
  avatarContainer,
  avatarFallback,
  avatarImage,
  avatarStatus,
  type AvatarContainerVariants,
  type AvatarFallbackVariants,
  type AvatarStatusVariants,
  AVATAR_STATUS,
} from "./avatar.css";

export { AVATAR_STATUS };

export type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
  initials?: string;
  ref?: Ref<HTMLDivElement>;
} & AvatarStatusVariants &
  AvatarContainerVariants &
  AvatarFallbackVariants;

export function Avatar({
  size = "md",
  initials,
  status,
  ref,
  src,
  alt = "",
  className,
  ...props
}: AvatarProps) {
  const containerClassNames = cn(avatarContainer({ size }), className);

  return (
    <div ref={ref} className={containerClassNames}>
      {src ? (
        <img src={src} alt={alt} className={avatarImage} {...props} />
      ) : (
        <div className={avatarFallback({ size })}>
          {initials?.charAt(0)?.toUpperCase() ||
            alt?.charAt(0)?.toUpperCase() ||
            "?"}
        </div>
      )}
      {status && <div className={avatarStatus({ status })} />}
    </div>
  );
}
