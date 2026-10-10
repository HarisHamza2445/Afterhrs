"use client";

import { IconArrow } from "@/components/icons";
import { Link } from "@/components/Link";
import { PageHero } from "@/components/sections";
export function NotFoundPage() {
  return (
    <div className="page page--dark">
      <PageHero
        eyebrow="404"
        title={
          <>
            {"This page is "}
            <em>off the clock.</em>
          </>
        }
      >
        <p>The link may be old or mistyped.</p>
        <Link to="home" className="btn btn--ivory">
          {"Back to AFTERHRS "}
          <IconArrow size={16} />
        </Link>
      </PageHero>
    </div>
  );
}
