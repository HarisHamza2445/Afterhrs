"use client";

import { Lockup, Monogram, Wordmark } from "@/components/Brand";
import { IconArrow } from "@/components/icons";
import { Link } from "@/components/Link";
import { DetailsStrip, Founders, PageHero, Timeline } from "@/components/sections";
import { Eyebrow, Img, useReveal } from "@/components/ui";
import { config } from "@/lib/config";
export function StoryPage() {
  let e = useReveal();
  return (
    <div className="page page--dark">
      <PageHero
        eyebrow={`Our story \xB7 since ${config.brand.founded}`}
        title={
          <>
            {"A label for "}
            <em>the hours</em>
            {" that are yours."}
          </>
        }
      >
        <p>
          {"AFTERHRS began in "}
          {config.brand.founded}
          {
            " with three founders and one shared frustration: too many clothes that say nothing about the person wearing them."
          }
        </p>
      </PageHero>
      <section className="story" ref={e}>
        <div className="story__row">
          <figure className="story__fig" data-reveal>
            <Img src="/img/art-cat.webp" alt="The Floral Cat artwork" />
          </figure>
          <div className="story__copy" data-reveal>
            <h2 className="display display--serif display--sm">
              {"Why "}
              <em>after hours?</em>
            </h2>
            <p>
              The hours after work, after class, after everyone else has gone quiet, are when a lot of people
              do their real thinking. They sketch, write, make music, plan something nobody has seen yet.
            </p>
            <p>
              That’s who we design for. People with a side of themselves that doesn’t fit the nine-to-five.
              Clothes for those hours should feel like yours, not like everyone else’s.
            </p>
          </div>
        </div>
        <div className="story__row story__row--rev">
          <figure className="story__fig story__fig--ink" data-reveal>
            <Img src="/img/tiger-ink-light.webp" alt="The tiger artwork, reversed out in ivory on black" />
          </figure>
          <div className="story__copy" data-reveal>
            <h2 className="display display--serif display--sm">
              {"One graphic, "}
              <em>drawn properly.</em>
            </h2>
            <p>
              Every AFTERHRS piece is built around a single original artwork by our lead designer, Veer. The
              drawings borrow from engraving and woodcut traditions: dense linework, patient detail, flat red
              and ivory. Then they go somewhere unexpected.
            </p>
            <p>We print them large and keep everything else quiet, so the art does the talking.</p>
          </div>
        </div>
        <div className="story__row">
          <figure className="story__fig story__fig--wide" data-reveal>
            <Img src="/img/art-eyes.webp" alt="The Floral Eyes artwork" />
          </figure>
          <div className="story__copy" data-reveal>
            <h2 className="display display--serif display--sm">
              {"Small drops, "}
              <em>on purpose.</em>
            </h2>
            <p>
              We release in drops rather than seasons. Fewer designs, more care in each. Drop 01 is three
              prints and one concept still in the studio.
            </p>
            <Link to="shop" className="link-arrow link-arrow--light">
              {"See Drop 01 "}
              <IconArrow size={14} />
            </Link>
          </div>
        </div>
      </section>
      <section className="story-tl">
        <div className="section-head">
          <div>
            <Eyebrow className="eyebrow--light">Timeline</Eyebrow>
            <h2 className="display">The story so far</h2>
          </div>
        </div>
        <Timeline />
        <p className="fineprint">Milestones marked “Planned” have not happened yet.</p>
      </section>
      <IdentitySection />
      <section className="story-founders">
        <div className="section-head">
          <div>
            <Eyebrow className="eyebrow--light">The founders</Eyebrow>
            <h2 className="display display--serif">
              {"Three minds. "}
              <em>One AFTERHRS.</em>
            </h2>
          </div>
          <Link to="founders" className="link-arrow link-arrow--light">
            {"Meet the founders "}
            <IconArrow size={14} />
          </Link>
        </div>
        <Founders />
      </section>
      <DetailsStrip />
    </div>
  );
}

function IdentitySection() {
  return (
    <section className="identity" aria-labelledby="identity-title">
      <div className="section-head">
        <div>
          <Eyebrow className="eyebrow--light">The mark</Eyebrow>
          <h2 id="identity-title" className="display display--sm">
            Identity
          </h2>
        </div>
        <p className="identity__intro">
          A high-contrast serif wordmark signed with the four-point star from our original artwork. The
          monogram drops the star into the counter of a Didone A, where the crossbar would be.
        </p>
      </div>
      <div className="identity__grid">
        <div className="idcell idcell--dark">
          <Wordmark size="clamp(28px, 5vw, 56px)" />
          <span>Primary · ivory on black</span>
        </div>
        <div className="idcell idcell--light">
          <Wordmark size="clamp(28px, 5vw, 56px)" />
          <span>Primary · black on ivory</span>
        </div>
        <div className="idcell idcell--wine">
          <Monogram size={88} />
          <span>Monogram</span>
        </div>
        <div className="idcell idcell--dark">
          <Lockup />
          <span>Lock-up</span>
        </div>
        <div className="idcell idcell--light idcell--fav">
          <span className="favbox">
            <Monogram size={22} />
          </span>
          <span className="favbox favbox--sm">
            <Monogram size={14} />
          </span>
          <span>Favicon</span>
        </div>
        <div className="idcell idcell--light">
          <Img
            src="/img/signature-ink-light.webp"
            alt="The original brush-script signature"
            className="idcell__sig"
          />
          <span>Signature script · used as a graphic</span>
        </div>
      </div>
    </section>
  );
}
