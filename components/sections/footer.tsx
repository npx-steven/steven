function Footer() {
  return (
    <footer className="content">
      <div className="flex flex-col items-center gap-1 pb-8 text-center font-sans text-sm text-fg-faint">
        <p>Design and Build by Steven Partida</p>
        <p>
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
