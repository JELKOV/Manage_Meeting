import classes from "./SearchLayout.module.css";

function SearchLayout({ children, sidebar }) {
  return (
    <div className={classes.page}>
      <aside className={classes.sidebar}>{sidebar}</aside>
      <main className={classes.content}>{children}</main>
    </div>
  );
}

export default SearchLayout;