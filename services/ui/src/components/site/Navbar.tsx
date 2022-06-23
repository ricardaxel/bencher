import { Link } from "solid-app-router";

const BENCHER_UI_URL: string = import.meta.env.VITE_BENCHER_UI_URL;
const BENCHER_DOCS_URL: string = import.meta.env.VITE_BENCHER_DOCS_URL;
const BENCHER_API_URL: string = import.meta.env.VITE_BENCHER_API_URL;

export const Navbar = () => {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Link class="navbar-item" href="/">
          <img src="/bencher_navbar.png" width="152" height="28" />
        </Link>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="bencherNavbar"
          onClick={() => {
            let toggle = document.querySelector(".navbar-burger");
            let menu = document.querySelector(".navbar-menu");
            toggle.classList.toggle("is-active");
            menu.classList.toggle("is-active");
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href={BENCHER_DOCS_URL}>
            Docs
          </a>

          <a class="navbar-item" href={BENCHER_API_URL}>
            API
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <Link class="button is-light" href="/auth/login">
                Log in
              </Link>
              <Link class="button is-primary" href="/auth/signup">
                <strong>Sign up</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
