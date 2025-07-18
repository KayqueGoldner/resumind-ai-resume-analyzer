import { Link } from "react-router";
import ScoreCircle from "~/components/score-circle";

export const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link
      className="resume-card fade-in animate-in duration-1000"
      to={`/resume/${resume.id}`}
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black break-words font-bold">
            {resume.companyName}
          </h2>
          <h3 className="break-words text-gray-500 text-lg">
            {resume.jobTitle}
          </h3>
        </div>

        <div className="shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>

      <div className="gradient-border fade-in animate-in duration-1000">
        <div className="size-full">
          <img
            alt="resume"
            className="h-[350px] w-full object-cover object-top max-sm:h-[200px]"
            src={resume.imagePath}
          />
        </div>
      </div>
    </Link>
  );
};
