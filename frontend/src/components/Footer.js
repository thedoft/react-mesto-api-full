import React from 'react';

function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright" lang="en">&copy; {currentYear} Mesto Russia</p>
    </footer>
  )
}

export default Footer;
