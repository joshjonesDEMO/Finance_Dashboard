import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import type {
  AnchorHTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element -- test double for next/image under jsdom
    <img src={typeof src === "string" ? src : ""} alt={alt} {...rest} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: { href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === "string" ? href : "#"} {...rest}>
      {children}
    </a>
  ),
}));
