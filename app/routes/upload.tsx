import { type FormEvent, useState } from "react";

import { FileUploader } from "~/components/file-uploader";
import { Navbar } from "~/components/navbar";

const Upload = () => {
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ statusText, setStatusText ] = useState("");
  const [ file, setFile ] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");

    if (!form) {
      return;
    }

    const formData = new FormData(form);

    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");

    console.log({
      companyName,
      jobTitle,
      jobDescription,
      file
    })
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                alt="resume scan"
                className="w-full"
                src="/images/resume-scan.gif"
              />
            </>
          ) : (
            <h2>Drop your resume for an ATS Score and improvements tips</h2>
          )}
          {!isProcessing && (
            <form
              className="mt-8 flex flex-col gap-4"
              id="upload-form"
              onSubmit={handleSubmit}
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  id="company-name"
                  name="company-name"
                  placeholder="Company Name"
                  type="text"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  id="job-title"
                  name="job-title"
                  placeholder="Job Title"
                  type="text"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  id="job-description"
                  name="job-description"
                  placeholder="Job Description"
                  rows={5}
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
