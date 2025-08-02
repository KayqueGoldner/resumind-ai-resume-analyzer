import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { ATS } from "~/components/ats";
import { Details } from "~/components/details";
import { Summary } from "~/components/summary";

import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { id } = useParams();
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [ imageUrl, setImageUrl ] = useState("");
  const [ resumeUrl, setResumeUrl ] = useState("");
  const [ feedback, setFeedback ] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(isLoading || auth.isAuthenticated)) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [ auth.isAuthenticated, navigate, isLoading ]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume: ${id}`);

      if (!resume) {
        return;
      }

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);

      if (!resumeBlob) {
        return;
      }

      const pdfBlob = new Blob([ resumeBlob ], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);

      if (!imageBlob) {
        return;
      }

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [ id ]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link className="back-button" to="/">
          <img alt="logo" className="size-2.5" src="/icons/back.svg" />
          <span className="font-semibold text-gray-800 text-sm">
            Back to Homepage
          </span>
        </Link>
      </nav>

      <div className="flex w-full flex-row max-lg:flex-col-reverse">
        <section className="feedback-section sticky top-0 h-screen items-center justify-center bg-[url('/images/bg-small.svg')] bg-cover">
          {imageUrl && resumeUrl && (
            <div className="fade-in gradient-border h-[90%] w-fit animate-in duration-1000 max-sm:m-0 max-2xl:h-fit">
              <a href={resumeUrl} target="_blank">
                <img
                  alt="resume"
                  className="size-full rounded-2xl object-contain"
                  src={imageUrl}
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          <h2 className="!text-black font-bold text-4xl">Resume Review</h2>

          {feedback ? (
            <div className="fade-in flex animate-in flex-col gap-8 duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img
              alt="resume scan"
              className="w-full"
              src="/images/resume-scan-2.gif"
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
