"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="shell empty-page">
      <h1>صفحه بارگذاری نشد</h1>
      <p>دوباره تلاش کنید.</p>
      <button onClick={reset}>تلاش دوباره</button>
    </div>
  );
}
