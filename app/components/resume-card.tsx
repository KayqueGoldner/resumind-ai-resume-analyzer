import { useEffect, useState } from "react";
import { Link } from "react-router";

import ScoreCircle from "~/components/score-circle";
import { usePuterStore } from "~/lib/puter";

export const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [ resumeUrl, setResumeUrl ] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);

      if (!blob) {
        return;
      }

      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [ resume.imagePath, fs.read ]);

  return (
    <Link
      className="resume-card fade-in animate-in duration-1000"
      to={`/resume/${resume.id}`}
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {resume.companyName && (
            <h2 className="!text-black break-words font-bold">
              {resume.companyName}
            </h2>
          )}

          {resume.jobTitle && (
            <h3 className="break-words text-gray-500 text-lg">
              {resume.jobTitle}
            </h3>
          )}

          {!(resume.companyName || resume.jobTitle) && (
            <h2 className="font-bold text-black!">Resume</h2>
          )}
        </div>

        <div className="shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border fade-in animate-in duration-1000">
          <div className="size-full">
            <img
              alt="resume"
              className="h-[350px] w-full object-cover object-top max-sm:h-[200px]"
              src={resumeUrl}
            />
          </div>
        </div>
      )}
    </Link>
  );
};
