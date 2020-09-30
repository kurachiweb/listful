import React, { Component } from 'react';

class ThemeToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: typeof window !== 'undefined' ? localStorage.getItem('site_theme') : 'default'
    };
  }

  themeSet() {
    let theme = this.state.theme;
    theme = theme === 'default' ? 'dark' : 'default';
    this.setState({ theme }, () => {
      localStorage.setItem('site_theme', theme);
      if (theme === 'default') {
        document.documentElement.classList.remove('t_dark');
      } else {
        document.documentElement.classList.add('t_dark');
      }
    });
  }

  render() {
    if (this.state.theme === 'dark') {
      document.documentElement.classList.add('t_dark');
    }
    return (
      <div className="theme_toggler__wrap">
        <input type="checkbox" id="theme_toggler__btn" defaultChecked={this.state.theme === 'dark'} onClick={() => this.themeSet()} />
        <label className="l_flex theme_toggler__label" htmlFor="theme_toggler__btn">
          <i className="icon icon__theme_default"></i>
          <i className="icon icon__theme_dark"></i>
          <div className="theme_toggler__handle"></div>
        </label>
      </div>
    );
  }
}

export default ThemeToggle;
