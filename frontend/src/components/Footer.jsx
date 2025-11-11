function Footer({ year, name }) {
  return (
    <footer className="bg-white p-4 text-center text-gray-500 mt-10 border-t">
      © {year} {name}. All rights reserved.
    </footer>
  );
}

export default Footer;