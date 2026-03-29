import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page">
      <section className="hero" style={{ padding: 24 }}>
        <div className="badge">404</div>
        <h1>프로젝트를 찾을 수 없음</h1>
        <p>요청한 프로젝트 페이지가 없거나 아직 준비되지 않았어.</p>
        <div className="pillRow" style={{ marginTop: 18 }}>
          <Link className="pill" href="/">프로젝트 목록으로 돌아가기</Link>
        </div>
      </section>
    </main>
  );
}
