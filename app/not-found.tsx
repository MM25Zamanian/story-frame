import Link from "next/link";
export default function NotFound() {
  return (
    <div className="shell empty-page">
      <h1>تابلو پیدا نشد</h1>
      <p>از فهرست، تابلوی موردنظر را انتخاب کنید.</p>
      <Link href="/">فهرست تابلوها</Link>
    </div>
  );
}
