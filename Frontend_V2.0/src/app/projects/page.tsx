
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Page | Free Next.js Template for Startup and SaaS",
  description: "This is Error Page for Startup Nextjs Template",
  // other metadata
};

const Projects = () => {
    return (
        <>
         <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Projects
                </h1>
                </div>
            </div>
          </div>
        </div>
      </section>
        </>
    );
};

export default Projects;