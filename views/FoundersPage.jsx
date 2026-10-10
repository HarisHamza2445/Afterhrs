"use client";

import { Founders, PageHero, Timeline } from "@/components/sections";
import { Eyebrow } from "@/components/ui";
import { config } from "@/lib/config";
export function FoundersPage() {
  return (
    <div className="page page--dark">
      <PageHero
        eyebrow="Founders"
        title={
          <>
            {"Three minds. "}
            <em>One AFTERHRS.</em>
          </>
        }
      >
        <p>
          {"Founded in "}
          {config.brand.founded}
          {" by Priyanka, Veer and Shouray. Three friends building a label slowly and on their own terms."}
        </p>
      </PageHero>
      <section className="founders-page">
        <Founders detailed />
        <p className="fineprint founders-page__note">
          Founder portraits and some role descriptions are placeholders and will be updated by the team.
        </p>
      </section>
      <section className="story-tl">
        <div className="section-head">
          <div>
            <Eyebrow className="eyebrow--light">
              {"Since "}
              {config.brand.founded}
            </Eyebrow>
            <h2 className="display">Where we are</h2>
          </div>
        </div>
        <Timeline />
      </section>
    </div>
  );
}
