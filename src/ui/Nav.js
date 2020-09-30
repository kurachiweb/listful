import Link from 'next/link';

const categoryFormat = category => category.toLowerCase().replace(' ', '-');

const Nav = ({ categories }) => (
  <nav className="g_nav_wrap">
    <input type="checkbox" id="g_nav_ctrl" aria-hidden="true" />
    <label htmlFor="g_nav_ctrl" className="g_nav_label" aria-controls="g_nav" aria-expanded="true" aria-hidden="true">
      Category
      <i className="icon icon__g_nav_ctrl" />
    </label>
    {categories && (
      <ul id="g_nav" className="list_no_buret" aria-hidden="false">
        {categories.map(category => (
          <li key={categoryFormat(category)}>
            <Link href="/category/[category]" as={`/category/${categoryFormat(category)}`}>
              <a className="g_nav_item">{category}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </nav>
);

export default Nav;
