import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Bar */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Download size={16} />
          Download PDF
        </a>
      </header>

      {/* PDF Viewer */}
      <div className="flex-1 p-4">
        <iframe
          src="/resume.pdf"
          className="w-full h-full min-h-[calc(100vh-5rem)] rounded-lg border border-border"
          title="Resume"
        />
      </div>
    </div>
  );
};

export default Resume;
