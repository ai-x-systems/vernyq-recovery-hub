import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-overline text-[#0084FF] mb-4">Page Not Found</p>
        <h1 className="text-display text-[#0A182E] mb-4">404</h1>
        <p className="text-body-lg text-[#555555] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors"
          >
            Return Home
          </Link>
          <Link
            to="/cold-plunge-tubs"
            className="inline-flex items-center gap-2 h-12 px-8 border border-[#e0ddd8] text-[#555555] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#f3f1ee] transition-colors"
          >
            Shop Cold Plunges
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
