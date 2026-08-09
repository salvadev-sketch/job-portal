import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-line sticky top-0 bg-paper z-50">
      <Link to="/" className="font-display font-bold text-xl flex items-baseline gap-1.5">
        <span className="text-signal-deep">◆</span> Insiderjobs
      </Link>
      <div className="flex items-center gap-7">
        <Link to="/jobs" className="text-xs uppercase tracking-widest text-slate font-semibold hover:text-ink">
          Listings
        </Link>
        <SignedIn>
          <Link to="/my-applications" className="text-xs uppercase tracking-widest text-slate font-semibold hover:text-ink">
            My Applications
          </Link>
          <Link to="/recruiter" className="text-xs uppercase tracking-widest text-slate font-semibold hover:text-ink">
            Recruiter
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded border border-ink bg-ink text-paper">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
