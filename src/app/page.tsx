import { Great_Vibes } from "next/font/google";
import Container from "./_components/container";
import Image from "next/image";

import SwiperWrapper from "./_components/swiper-wrapper";
import FeaturesPage from "./_components/landing/feature";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { phoneSets } from "@/lib/constants";
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });



export default function Index() {
  const allPosts = getAllPosts();


  const morePosts = allPosts.slice(0, 4);
  return (
    <Container>
      <main>
        <section className="relative mt-10 md:mt-14 px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[32px] ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            {}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-white/5 dark:to-transparent"
              aria-hidden
            />

            <div className="relative px-6 md:px-10 pt-8 md:pt-10">
              {}
              <div className="flex items-start justify-between text-neutral-900 dark:text-slate-100">
                <div>
                  <p className="font-semibold">Abdul Rafay</p>
                  <p className="text-sm text-neutral-500 dark:text-slate-300">
                    Founder and CEO
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold uppercase tracking-wide">
                    Syntax Lab Tech
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-slate-300">
                    99marafay@gmail.com
                  </p>
                </div>
              </div>

              {}
              <div className="mt-8 text-center">
                <div
                  className={`${greatVibes.className} text-5xl md:text-6xl leading-none`}
                >
                  Syntax Lab Tech
                </div>
                <div className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight">
                  MS Bridge
                </div>
              </div>

              {}
              <div className="relative mt-12 px-2 pb-16">
                <div className="relative h-[700px] flex items-center justify-center">
                  {}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-24 h-80 w-80 md:h-[24rem] md:w-[24rem] rounded-full bg-neutral-900/5 dark:bg-white/10 blur-3xl"
                    aria-hidden
                  />

                  {}
                  <SwiperWrapper phoneSets={phoneSets} />
                </div>

                {}
                <div className="mt-10 pr-4 md:pr-8 text-right">
                  <span className="text-xs font-semibold tracking-widest text-neutral-400">
                    WELCOME
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="my-8" />
        <FeaturesPage />
        <div className="my-8" />


        <div className="my-8" />
        

        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        

      </main>
      

    </Container>
    
  );
}